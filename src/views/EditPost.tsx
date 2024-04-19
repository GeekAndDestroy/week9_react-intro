import { useEffect, useState } from 'react';
import { useNavigate,  useParams } from 'react-router-dom';
import { editPostById, getPostById } from '../lib/apiWrapper';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { CategoryType, PostFormDataType, UserType } from '../types';

type EditPostProps = {
    flashMessage: (newMessage: string, category:CategoryType) => void
    currentUser: UserType|null
}

export default function EditPost({ flashMessage, currentUser }: EditPostProps) {
    const { postId } = useParams();
    const navigate = useNavigate();

    const [postToEditData, setPostToEditData] = useState<PostFormDataType>({ title: '', body: '' })


    useEffect( () => {
        async function getPost(){
            let response = await getPostById(postId!)
            if (response.data){
                const post = response.data
                const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')

                console.log(currentUser?.id, post.author.id)
                if (!currentUser){
                    console.log(currentUser)
                } else if (currentUser?.id !== post.author.id){
                    flashMessage('You do not have permission to edit this post', 'danger');
                    navigate('/')
                } else {
                    setPostToEditData({title: post.title, body: post.body})
                }
            } else if(response.error){
                flashMessage(response.error, 'danger');
                navigate('/')
            } else {
                flashMessage("Something went wrong", 'warning')
                navigate('/')
            }
        }

        getPost()
    }, [postId] )

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPostToEditData({ ...postToEditData, [e.target.name]: e.target.value })
    }

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('token') || '';
        const response = await editPostById(token, postId!, postToEditData);
        if (response.error){
            flashMessage(response.error, 'danger')
        } else {
            flashMessage(`Post ${postId} has been updated`, 'success');
            navigate('/')
        }   
    }

    return (
        <Card className='my-3'>
            <Card.Body>
                <h3 className="text-center">Create New Post</h3>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Label>Post Title</Form.Label>
                    <Form.Control name='title' placeholder='Edit Post Title' value={postToEditData.title} onChange={handleInputChange} />
                    <Form.Label>Post Body</Form.Label>
                    <Form.Control as='textarea'  name='body' placeholder='Edit Post Body'  value={postToEditData.body} onChange={handleInputChange} />
                    <Button className='mt-3 w-100' variant='info' type='submit'>Edit Post</Button>
                </Form>
            </Card.Body>
        </Card>
    )
}

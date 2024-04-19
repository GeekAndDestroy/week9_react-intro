import { Link } from 'react-router-dom';
import { PostType, UserType } from '../types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

type PostCardProps = {
    post: PostType,
    currentUser: UserType|null,
}

export default function PostCard({ post, currentUser }: PostCardProps) {
    
    return (
        <Card className='my-3' bg='primary' text='light'>
            <Card.Header>{ post.dateCreated }</Card.Header>
            <Card.Body>
                <Card.Title>{ post.title }</Card.Title>
                <Card.Subtitle>{ post.author.username }</Card.Subtitle>
                <Card.Text>{ post.body }</Card.Text>
                {post.author.id === currentUser?.id && <Link to={`/edit/${post.id}`}><Button variant='success'>Edit Post</Button></Link>}
            </Card.Body>
        </Card>
    )
}

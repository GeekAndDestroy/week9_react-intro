import axios from 'axios';
import { UserFormDataType, UserType, PostType } from '../types';


const baseURL:string = 'https://kekambas-flask-blog-api.onrender.com/'
const userEndpoint:string = '/users'
const postEndpoint:string = '/posts'



const apiClientNoAuth = () => axios.create({
    baseURL: baseURL
})

type APIResponse<T> = {
    data?: T,
    error?: string
}

async function register(newUserData:UserFormDataType): Promise<APIResponse<UserType>> {
    let data;
    let error;
    try{
        const response = await apiClientNoAuth().post(userEndpoint, newUserData);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }
}

async function getAllPosts(): Promise<APIResponse<PostType[]>> {
    let data;
    let error;
    try{
        const response = await apiClientNoAuth().get(postEndpoint);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.message
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }
}



export {
    register, getAllPosts
}

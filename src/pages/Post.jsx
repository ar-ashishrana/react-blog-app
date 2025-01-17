import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import service from '../appwrite/config';
import { Container, Button } from '../components';
import parse from "html-react-parser";
import { Link } from 'react-router';
import { fetchPosts } from '../store/postSlice';

const Post = () => {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    const posts = useSelector((state)=> state.post.postData);
    const singlePost = posts.find( (item) => item.$id === slug );
    useEffect(() => {
        singlePost ? setPost(singlePost) : navigate('/');
    }, []);

    const deletePost = ()=>{
        if(confirm('Are you sure you want to delete this post?')){
            service.deletePost(post.$id).then((data)=>{
                if(data){
                    service.deleteFile(post.featuredImage);
                    dispatch(fetchPosts());
                    navigate('/');
                }
            })
        }
    }
    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={service.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl w-full"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null
}

export default Post

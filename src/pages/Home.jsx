import React, {useState, useEffect} from 'react'
import service from '../appwrite/config'
import { Container, PostCard } from '../components'
import { useSelector } from 'react-redux'
import { Link } from 'react-router'

const Home = () => {
    const autStatus = useSelector((state)=> state.auth.status);
    const posts = useSelector((state)=>state.post.postData);

    if(!autStatus){
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read Posts
                            </h1>
                            <div className="mt-5">
                                <Link className='px-6 py-2 bg-blue-700 rounded-lg text-white text-lg font-bold' to={'/login'}>Login Now</Link>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    if(posts.length === 0){
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                No Posts available
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
  return (
    <div className='w-full py-8'>
        <Container>
            <div className="flex flex-wrap">
                {posts && posts.map((post)=>(
                    <div className="p-2 w-1/2" key={post.$id}>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
        </Container>
    </div>
  )
}

export default Home

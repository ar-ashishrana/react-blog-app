import React, { useState, useEffect } from 'react'
import service from '../appwrite/config'
import { Container, PostCard } from '../components'

const AllPosts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(()=>{
        service.getPosts([])
        .then((posts)=> {
            if(posts){
                setPosts(posts.documents)
            }
        })
    }, []);

    

  return (
    <div className='py-8'>
        <Container>
            <div className="flex flex-wrap">

            
            {posts?.map((post)=>(
                <div className='p-2 w-1/4' key={post.$id}>
                <PostCard  {...post} />
                </div>
            ))}
           
            </div>
        </Container>
    </div>
  )
}

export default AllPosts

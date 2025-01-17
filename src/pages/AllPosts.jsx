import React, { useState, useEffect } from 'react'
import service from '../appwrite/config'
import { Container, PostCard } from '../components'
import { useSelector } from 'react-redux';

const AllPosts = () => {
    const posts = useSelector((state)=> state.post.postData);
  return (
    <div className='py-8'>
        <Container>
            <div className="flex flex-wrap">
              {posts?.map((post)=>(
                  <div className='p-2 md:w-1/4 w-1/2' key={post.$id}>
                  <PostCard  {...post} />
                  </div>
              ))}
            </div>
        </Container>
    </div>
  )
}

export default AllPosts

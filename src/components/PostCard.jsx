import React from 'react'
import service from '../appwrite/config'
import {Link} from "react-router"
import { useSelector } from 'react-redux'

const PostCard = ({$id, title, featuredImage, }) => {
  const primaryBg = useSelector((state)=> state.theme.primaryBg)
  return (
    <Link to={`/post/${$id}`}>
        <div className={`w-full rounded-xl p-4 ${primaryBg}`}>
            <div className="w-full flex justify-center mb-4">
                <img src={service.getFilePreview(featuredImage)} alt={title} className='rounded-xl h-[250px]' />
            </div>
            <h2 className='text-2xl font-bold'>
              {title.length >= 40 ? title.slice(0, 40) +'....' : title}
              </h2>
        </div>
      
    </Link>
  )
}

export default PostCard

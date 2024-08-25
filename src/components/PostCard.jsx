import React, { useEffect } from 'react'
import appwriteService from '../appwrite/config'
import { Link } from 'react-router-dom'

function PostCard({$id, title, featuredImage, postowner}) {
  useEffect(() =>{
    console.log('title is:',title);

  },[]);
  return (
    <Link to={`/post/${postowner}/${$id}`}>
        <div className='w-full bg-gray-200 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img src={appwriteService.getFilePreview(featuredImage)} 
                title={title}
                className='rounded-xl'/>
            </div>
            <div className='text-xl font-bold'>
            {title}
            </div>
        </div>
    </Link>
  )
}

export default PostCard

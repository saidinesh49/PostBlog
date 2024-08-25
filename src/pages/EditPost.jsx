import React from 'react'
import { useState, useEffect } from 'react' 
import { Container, PostForm } from '../components/index'
import appwriteService from '../appwrite/config'
import { useNavigate, useParams } from 'react-router-dom'

function EditPost() {
    const [post,setPosts]=useState("")
    const {slug}=useParams()
    const navigate=useNavigate()

    useEffect(()=>{
        if(slug){
        appwriteService.getPost(slug).then((post)=>{
            if(post){
                setPosts(post)
            }
          })
       }
       else{
        navigate('/');
       }
    },[slug,navigate])

  return post? (
   <div className='py-8'>
     <Container>
        <PostForm post={post}/>
     </Container>
   </div>
  
  ) : (<div className='flex flex-col items-center py-4 font-bold text-lg text-black'>Loading...</div>)
}

export default EditPost
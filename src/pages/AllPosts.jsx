import React, { useEffect, useState } from 'react'
import { Container, PostCard } from '../components/index'
import appwriteService from '../appwrite/config'

export default function AllPosts() {
  const [posts,setPosts]=useState([]);
  useEffect(()=>{;

  appwriteService.getPosts([]).then((posts)=>{
    if(posts){
        setPosts(posts.documents);
    }
  })
  },[]);
  
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                { posts.length>0?(
                posts.map((post)=>(
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard postowner={post.postowner} {...post}/>
                    </div>
                )))
                : <div className='flex flex-col items-center font-bold text-lg py-4'>Loading...</div>
                }
            </div>
        </Container>
    </div>
  )
}

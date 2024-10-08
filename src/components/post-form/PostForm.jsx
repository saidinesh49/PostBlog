import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, Select, RTE } from '../index';
import appwriteService from '../../appwrite/config';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || '',
      slug: post?.slug || '',
      content: post?.content || '',
      status: post?.status || 'active',
      postowner: post?.postowner || '',
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  // Function to handle form submission
  const submit = async (data) => {
    try {
      console.log('Submitting form data:', data);

      let file = null;
      if (data.image && data.image.length > 0) {
        file = await appwriteService.uploadFile(data.image[0]);
        console.log('Uploaded image file:', file);
      }

      if (post) {
        // Update existing post
        console.log('Updating post:', post);
        if (post.featuredImage) {
          await appwriteService.deleteFile(post.featuredImage);
        }
        const dbPost = await appwriteService.updatePost(post.$id, {
          ...data,
          featuredImage: file ? file : undefined,
        });
        console.log('Updated post:', dbPost);
        if (dbPost) {
          navigate(`/post/${dbPost.postowner}/${dbPost.$id}`);
        }
      } else {
        // Create new post
        console.log('Creating new post',userData);
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.userData.$id,
          featuredImage: file ? file : undefined, // Assign the file ID
          postowner: userData.userData.name, // Assign the user's name as the post owner's name
        });
        console.log('Created post:', dbPost);

        if (dbPost) {
          navigate(`/post/${dbPost.postowner}/${dbPost.$id}`);
        }
      }
    } catch (error) {
      console.error('Error submitting post:', error);
      // Optionally display an error message to the user
    }
  };

  // Function to transform title into a URL-friendly slug
  const slugTransform = useCallback((value) => {
    if (value && typeof value === 'string') {
      const uniqueNumber='-'+String(Math.floor(Math.random()*999)+100)
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, '-')
        .replace(/\s/g, '-')
        .replace(/^-|-$/g, '')
        + uniqueNumber; // Remove leading and trailing '-'
    }
    return '';
  }, []);

  // Effect to automatically update slug when title changes
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'title') {
        setValue('slug', slugTransform(value.title), {
          shouldValidate: true,
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className='flex flex-wrap'>
      <div className='w-2/3 px-2'>
        <Input
          label='Title: '
          placeholder='Title'
          className='mb-4'
          {...register('title', { required: true })}
        />
        <Input
          label='Slug '
          placeholder='Slug'
          className='mb-4'
          disabled
          {...register('slug', { required: true })}
          onInput={(e) => {
            setValue('slug', slugTransform(e.target.value), {
              shouldValidate: true,
            });
          }}
        />

        <RTE
          label='Content'
          name='content'
          control={control}
          defaultValues={getValues('content')}
        />
      </div>

      <div className='w-1/3 px-2'>
        <Input
          label='Featured Image: '
          type='file'
          className='mb-4'
          accept='image/png, image/jpg, image/jpeg, image/gif'
          {...register('image', { required: !post })}
        />

        {post && post.featuredImage && (
          <div className='w-full mb-4'>
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className='rounded-lg'
            />
          </div>
        )}
        <Select
          options={['active', 'inactive']}
          label='status'
          className='mb-4'
          {...register('status', { required: true })}
        />

        <Button
          type='submit'
          bgColor={post ? 'bg-green-500' : undefined}
          className='w-full'
        >
          {post ? 'Update' : 'Submit'}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;

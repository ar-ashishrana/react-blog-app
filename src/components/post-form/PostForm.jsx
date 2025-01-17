import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {Button, Input, Select, RTE} from '../index'
import service from "../../appwrite/config"
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts } from '../../store/postSlice'

const PostForm = ({post }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const { register, handleSubmit, watch, setValue, control, getValues, reset, formState: { errors } } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });
    useEffect(() => {
        if (post) {
            reset({
                title: post.title || "",
                slug: post.$id || "",
                content: post.content || "",
                status: post.status || "active",
            });
        }
    }, [post, reset]);    
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const primaryBg  = useSelector((state) => state.theme.primaryBg);

    const submit = async (data)=>{
        setLoading(true);
        if(post){
            try {
                    const file = data.image && data.image[0] ? await service.fileUpload(data.image[0]) : null;
                    if(file){
                        service.deleteFile(post.featuredImage);
                    }
                    const dbPost = await service.updatePost(post.$id, {...data, featuredImage: file ? file.$id : undefined});
                    if(dbPost){
                        dispatch(fetchPosts());
                        setLoading(false); 
                        navigate(`/post/${dbPost.$id}`);
                    }
                } catch (error) {
                    setError(error)
                }
                
        } else{
            try {
                const file = await service.fileUpload(data.image[0]);
                if(file){
                    const fileId = file.$id;
                    data.featuredImage = fileId;
                    const dbPost = await service.createPost({...data, userId: userData.$id});
                    dispatch(fetchPosts());
                    setLoading(false)
                    if(dbPost) navigate(`/post/${dbPost.$id}`);
                }
            } catch (error) {
                setError(error.message)
            }
            
        }
    }
    const slugTransform = useCallback((value)=>{
        if(value && typeof value === "string") return value
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g, "-")
            .replace(/\s/g, "-");
        
        return '';

    }, []);

    useEffect(()=>{
        const subscription = watch((value, {name})=>{
            if(name === 'title'){
                setValue('slug', slugTransform(value.title), {shouldValidate: true});
            }
        });
        return()=> subscription.unsubscribe();

    },[watch, setValue, slugTransform])

  return (
    <div className={`${primaryBg} w-fit p-8 rounded-xl `}>
        <h2 className='text-3xl font-bold my-5 text-center'>{ post? 'Update Post' : 'Add Post'}</h2>
            <div className='w-full errors flex flex-col items-center '>
            {Object.entries(errors).map(([key, value]) => (
                    <p className='text-red-500 ' key={key}>
                        <strong>{key}:</strong> {value['message']}
                    </p>
                ))}
                {error && (
                    <p className='text-red-500 '>
                    <strong>{error}:</strong>
                </p>
                )}
            </div>
        <form onSubmit={handleSubmit(submit)} className='md:flex flex-wrap justify-center'>
            <div className="md:w-2/3 px-8">
                <Input 
                    label="Title : "
                    placeholder="Title"
                    className="mb-4"
                    {...register('title', { required: { value: true, message: "Title is required"},})}
                />
                <Input 
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register('slug', { required: { value: true, message: "Slug is required"}, maxLength: { value: 30, message: "Slug length can't be more than 30 characters" },})}
                        onInput={(e)=>{
                        setValue('slug', slugTransform(e.currentTarget.value), {shouldValidate:true});
                    }}
                />
                <RTE label='Content :' name='content' control={control} defaultValue={getValues('content')} />
            </div>
            <div className="md:w-1/3 px-8 py-8">
                {post && post.featuredImage ? (
                    <div>
                        <Input 
                        label='Featured Image'
                        type="file"
                        className="mb-4"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register('image')}
                        />
                        <div className="w-full mb-4">
                            Previous Featured Image:
                            <img src={service.getFilePreview(post.featuredImage)} alt={post.title} onError={(e)=> e.target.style.display = "none"} className='p-2 w-full rounded-xl' />
                        </div>
                    </div>
                ) : (
                    <Input 
                label='Featured Image'
                type="file"
                className="mb-4"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register('image', {required: { value: true, message: "Image is required"}})}
                />
                )}
                <Select options={['active', 'inactive']} label='Status' className='mb-4' {...register('status', {required:true})} />
                <Button type="submit" bgColor={post? "bg-green-500" : undefined } className={ errors.length === 0 ? 'bg-gray-500': ''} disabled={Object.keys(errors).length !==0} >{!loading ? (post? 'Update' : 'Submit') : 'submitting data'}</Button>
            </div>
        </form>
    </div>
  )
}

export default PostForm

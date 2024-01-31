import React ,{useState}  from 'react'
import Input from '../Input/Input'
import { useForm  } from 'react-hook-form'
import RTE from '../RTE/RTE'
import Select from '../Select/Select'
import Button from '../Button/Button'
import database from '../../appwrite/Database' 
import storage from '../../appwrite/Storage'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function PostForm({post}) {
    const user = useSelector(state => state.auth.userData) ;
    const {register , handleSubmit , control ,setValue , getValues ,watch} = useForm({
        defaultValues:{
            title: post?.title || '' ,
            content: post?.content || 'content' ,
            status: post?.status || 'status' ,
            slug: post?.slug || '' 

        }
    }) 
    
    const navigate = useNavigate() ; 
    const [image , setImage] = useState(null);

    const slugTransform = (value) => {
        if(value && typeof value === 'string')
        return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

        else return '' ; 

    }
    React.useEffect(() => {
        if(post){
            setImage(post.featuredImage)
        }
    },[image])

    React.useEffect(() => {
        //console.log(user , user.userData.$id);
        const subscription = watch((value ,{name}) => {
            if(name === 'title'){
                setValue('slug' ,slugTransform(value.title ,
                    {shouldValidate: true}))
            }
        }) 

        return () => {
            subscription.unsubscribe()
        }
    } ,[watch ,slugTransform ,setValue])
    
    
    

    const submit = async (data) => {
        //console.log("This is user",user);
        if(post){
            const file = data.image[0] ? await storage.uploadFile(data.image[0]) : null ;

            if(file) storage.deleteFile(post.featuredImage) ;
            //console.log(file);
            const dbPost = await database.updatePost(post.$id ,{
                ...data , 
                featuredImage: file ? file.$id : undefined 
            } )
             console.log('New Post');
            if(dbPost) navigate(`/post/${dbPost.$id}`)
            
        }
        else{
            const file = await storage.uploadFile(data.image[0]) ;
            console.log('This is file' , file);
            if(file){
            data.featuredImage = file.$id ; 
            console.log(data);

            const post = {...data , userId: user.$id }
            //console.log("This is post",post);
            const dbPost = await database.createPost(post)

            if(dbPost){
                navigate(`/post/${dbPost.$id}`) ; 
            }
        }
        }
    }

  return (
    <form className="flex flex-wrap p-5 " onSubmit={handleSubmit(submit)}>
     <div className="w-2/3 px-2">
        <Input 
        label='Title:' 
        placeholder={post? 'Enter New title' : 'Enter title'}
    
        {...register('title' , {required: true })}
        className='mb-4'
        />
        <Input
         label='slug:'
         className='mb-4'
         
         {...register('slug' , {required: true})}
         onInput={(e)=> setValue('slug', slugTransform(e.currentTarget.value) , {shouldValidate: true})}
        />

        <RTE name='content' label='Content :' control={control} defaultValue={getValues('content')}/>
     </div>
     <div className="w-1/3 px-2 flex flex-col gap-5">

        <Input
        label='Featured Image :'
        type="file"
        className=" mb-4"
        accept="image/png, image/jpg, image/jpeg, image/gif"
        onInput = {(e) => console.log(e.target.value)}
        {...register("image", { required: !post })}
        />
        <Select
        options={['active' , 'inactive']}
        label="Status"
        className="mb-4"
        {...register("status", { required: true })}
        />
        
        {post ? <div className="rounded-lg">
        <img src={storage.getFilePreview(post.featuredImage)} alt={post.Title} />
        </div> : null
        }

        <Button type='submit' className='w-full' bgColor={post? 'bg-green-500' : undefined}>
           {post ? "Update" : "Submit" }
        </Button>
     </div>


    </form>
  )
}

export default PostForm
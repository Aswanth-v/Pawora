 import React, { useState } from 'react'
 import { Link } from 'react-router-dom'
import { NoProfile } from '../assets'
import moment from 'moment'
import { BiSolidLike, BiLike, BiComment } from 'react-icons/bi';
import {MdOutlineDeleteOutline} from 'react-icons/md';
import { useForm } from 'react-hook-form';

const CommentForm= ({user,id,replyAt,getComments})=>{
  const [loading,SetLoading]=useState(false)
  const [errMsg,SetErrMsg]=useState('')
  const {
    register,
    handleSubmit,
    reset,
    formState:{errors},

  } =useForm({
    mode:"onchange",
  });


  const onSubmit =async(data)=>{}
  return(
    <form onSubmit={handleSubmit(onSubmit)} className='w-full border-b border-[#66666645]'>
      <div className='w-full flex items-center gap-2 py-4'>
      <img src={user?.profileUrl ?? NoProfile}
       alt="user image"
        className='w-10 h-10 rounder-full object-cover'
        />
      </div>
    </form>
  )
}
const PostCard=({post,user,deletePost,likePost}) =>{
  const [showAll,SetShowAll]=useState(0)
  const [showReplay,SetShowReplay]=useState(0)
  const [comments,SetCommants]=useState([])
  const [loading,SetLoading]=useState(false)
  const [replyCommants,SetReplyCommants]=useState(0)
  const [showComments,SetShowComments]=useState(0)

  const getComments =async ()=>{}
   return (
     <div className='mb-2 bg-primary p-6 rounded-xl'>
      <div className='flex gap-3 items-center mb-2'>
      <Link to={'/profile/'+post?.userId?._id}>
      <img 
          src={post?.userId?.profileUrl ?? NoProfile}
       alt={post?.userId?.firstName}
       className='w-14 h-14 object-cover rounded-full'
        />
      </Link>
      
      <div className='w-full flex justify-between'>
      <div className=''>
        <Link to={'/profile/'+post?.userId?._id}>
        <p className='font-medium text-lg text-ascent-1'>
          {post?.userId?.firstName} {post?.userId?.lastName}
        </p>
        </Link>
        <span className='text-ascent-2 text-sm'>{post?.userId?.location}</span>
      </div>
      <span className='text-ascent-2'>
      {moment(post?.createdAt ?? '2025-04-30').fromNow()}
      </span>
      </div>
      </div>

      <div>
  <p className='text-ascent-2'>
    {showAll === post?._id ? post?.description : post?.description?.slice(0, 300)}
    {post?.description?.length > 301 && (
      showAll === post?._id ? (
        <span
          className='text-blue ml-2 font-medium cursor-pointer'
          onClick={() => SetShowAll(0)}
        >
          Show Less
        </span>
      ) : (
        <span
          className='text-blue ml-2 font-medium cursor-pointer'
          onClick={() => SetShowAll(post?._id)}
        >
          Show More
        </span>
      )
    )}
  </p>
  {
    post?.image && (
      <img
      src={post?.image}
      alt="post image"
      className='w-full mt-2 rounded-lg'
      />
    )
  }
</div>
    <div className='mt-4 flex justify-between items-center px-3 py-2 text-ascent text-base border-t border-[#66666645]'>
      <p className='flex gap-2 items-center text-base cursor-pointer text-ascent-2'>

        {
          post?.likes?.includes(user?._id) ? (<BiSolidLike size={20}  color='#8B4FB3'/>)
          : (
            <BiLike size={20} />
          )
        }
        {post?.likes?.length} Likes
      </p>

      <p className='flex gap-2 items-center text-base cursor-pointer text-ascent-2'
      onClick={()=>{
        SetShowComments(showComments ===post._id ? null :post._id);
        getComments(post?._id);
      }}
      >
      
        <BiComment size={20} />
        {post?.comments.length} Comments
      </p>
      {
        user?._id ===post?.userId?._id && (<div className='flex gap-1 items-center text-base text-ascent-1 cursor-pointer'
        onClick={()=>deletePost(post?._id)}
        >
            <MdOutlineDeleteOutline size={20} />
            <span>Delete</span>
          </div>
      )}
    </div>
    {/*Comments*/}
    {
      showComments === post?._id && (<div className='w-full mt-4 border-t border-[#66666645] pt-4'>   
      <CommentForm
      user={user}
      id={post?._id}
      getComments={()=>getComments(post?._id)}
      />
      </div>
    )} 
     </div>
   )
 }
 
 export default PostCard;

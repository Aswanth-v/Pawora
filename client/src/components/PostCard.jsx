 import React, { useState } from 'react'
 import { Link } from 'react-router-dom'
import { NoProfile } from '../assets'
const PostCard=({post,user,deletePost,likePost}) =>{
  const [showAll,SetShowAll]=useState(0)
  const [showReplay,SetShowReplay]=useState(0)
  const [comments,SetCommants]=useState([])
  const [loading,SetLoading]=useState(false)
  const [replyCommants,SetReplyCommants]=useState(0)
  const [showComments,SetShowComments]=useState(0)
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
      </div>

      </div>
     </div>
   )
 }
 
 export default PostCard;

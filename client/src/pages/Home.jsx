import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {CardProfile,CustomButton,FriendsCard, Loading, TextInput, TopBar,PostCard, EditProfile } from '../components';
import {suggest,requests,posts } from '../assets/data';
import { NoProfile } from '../assets';
import { Link } from 'react-router-dom';
import { BsPersonFillAdd,BsFiletypeGif } from 'react-icons/bs';
import { BiImage, BiSolidVideo } from 'react-icons/bi';
import { useForm } from 'react-hook-form';

const Home = () => {
    const { user,edit } = useSelector((state) => state.user);
    const [friendRequest,setFriendRequest] =useState(requests)
    const[errMsg, setErrMsg] =useState("")
    const [file,setFile]  =useState(null)
    const [posting,setPosting] =useState(false)
    const [loading,setLoading] =useState(false)


    const [suggestedFriends,setSuggestedFriends] =useState(suggest)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const handlePostsubmit =  async(data)=>{}

    return (
      <>
        <div className='home w-full px-0 lg:px:10  2xl:px-40 bg-bgColor lg:rounded-lg h-screen overflow-hidden'>
            <TopBar />
            <div className='w-full flex gap-2 lg:gap-4 pt-5 pb-10 h-full'>
                {/* Left */}
                <div className='hidden w-1/3 lg:w-1/4 h-full md:flex flex-col gap-6 overflow-y-auto'>
                    <CardProfile user={user} />
                    <FriendsCard friends={user?.friends}/>
                </div>
                {/* Center */}
                <div className='flex-1 h-full px-4 flex-4 flex-col gap-6 overflow-y-auto rounded-lg'>
                        <form className='bg-primary px-4 rounded-lg'
                            onSubmit={handleSubmit(handlePostsubmit)}>
                            <div className='w-full flex items-center gap-2 py-4 border-b border-[#66666645]'>
                            <img 
                                    src={user?.profileUrl ?? NoProfile} 
                                    alt='user Image' 
                                    className='w-14 h-14 object-cover rounded-full'
                                    />
                                    <TextInput
                                    styles='w-full rounded-full py-5'
                                    placeholder="whats up...."
                                    name="description"
                                    register={register("description",{
                                        required:"write about the post",
                                    })}
                                    error={errors.description ? errors.description.message :""}
                                    />
                            </div>
                            {errMsg?.message && (
                                <span 
                                role='alert'
                                className={`text-sm ${
                                errMsg?.status === "failed"
                                ? "text-[#f64949fe]"
                                : "text-[#2ba150fe]"
                                }mt-0.5`}
                                >
                                        {errors.description.message}
                                </span>
                            )}
                            <div className='flex items-center justify-between py-4'>
                                <label
                                htmlFor='imageUploader'
                                className='flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer'
                                >
                                <input 
                                type='file'
                                onChange={(e) =>setFile(e.target.files[0])}
                                className='hidden'
                                id='imageUploader'
                                data-max-size='5120'
                                accept='.jpg, .png, .jpge'
                                />
                                <BiImage/>
                                <span>Image</span>
                                </label>


                                <label
                                htmlFor='videoUploader'
                                className='flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer'
                                >
                                <input 
                                type='file'
                                onChange={(e) =>setFile(e.target.files[0])}
                                className='hidden'
                                id='videoUploader'
                                data-max-size='5120'
                                accept='.mp4, .wav'
                                />
                                <BiSolidVideo/>
                                <span>Video</span>
                                </label>



                                <label
                                htmlFor='GifUploader'
                                className='flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer'
                                >
                                <input 
                                type='file'
                                onChange={(e) =>setFile(e.target.files[0])}
                                className='hidden'
                                id='GifUploader'
                                data-max-size='5120'
                                accept='.gif'
                                />
                                <BsFiletypeGif/>
                                <span>Gif</span>
                                </label>

                              <div>
                              {
                                    posting? (
                                        <Loading/>
                                    ):(
                                        <CustomButton
                                        type='submit'
                                        title='post'
                                        containerStyle='bg-[#8B4FB3] ext-white py-1 px-4 rounded-full font-semibold text-sm text-ascent-1'
                                        />
                                    )
                                }
                              </div>

                            </div>
                        </form>

                        {
                          loading ? (<Loading/>) : posts?.length > 0 ? (
                            posts?.map((post)=>(
                                <PostCard key={post?._id} post={post}
                                
                                user={user}
                                delete={()=>{}}
                                likePost={()=>{}}
                                />
                            ))
                          ) : (
                             <div className="flex w-full h-full items-center justify-center">
                           <p className="text-lg text-acent-2">No Post yet </p>
                            </div>
                          )  
                        }
                </div>
                {/* Right */}
                <div className='hidde w-1/4 h-full lg:flex flex-col gap-8 overflow-y-auto'>
                    {/* Friend request */}
                    <div className='w-full bg-primary shadow-sm rounded-lg px-6 py-5'>
                        <div className='flex items-center justify-between text-xl text-ascent-1 pb-2 border-b border-[#66666645]'>
                            <span>Friend Request</span>
                            <span>{friendRequest?.length}</span>
                        </div>
                        <div className='w-full flex flex-col gap-4 pt-4'> 
                            {
                                friendRequest?.map(({_id, requestFrom: from})=>(
                                <div key={_id} className='flex items-center justify-between'><Link to={'/profile/' +from._id} className='w-full flex gap-4 item-center cursor-pointer'>
                                    <img 
                                    src={from?.profileUrl ?? NoProfile} 
                                    alt={from?.firstName} 
                                    className='w-10 h-10 object-cover rounded-full'
                                    />
                                    <div className='flex-1'>
                                        <p className='text-base font-medium text-ascent-1'>{from?.firstName} {from?.lastName}</p>
                                    </div>
                                    </Link>
                                    <div className='flex gap-1'>
                                        <CustomButton title='Accept'
                                        containerStyle='bg-[#8B4FB3] // This is a reference comment
                                                                        const mainColor = "#B57EDC"; //

                                         text-xs text-white px-1.5 py-1 rounded-full'/>
                                        <CustomButton title='Deny'
                                        containerStyle='border border-[#666] text-xs text-white px-1.5 py-1 rounded-full'/>
                                    </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    {/*Suggested friends */}
                    <div className='w-full bg-primary shadow-sm rounded-lg px-5 py-5'>
                        <div className='flex items-center justify-between text-lg text-ascent-1 border-b border-[#66666645]'>
                            <span>Friend Suggestion</span>
                        </div>
                        <div className='w-full flex flex-col gap-4 pt-4 '>
                        {
  suggestedFriends?.map((friend) => (
    <div
      className="flex items-center justify-between"
      key={friend._id}
    >
      <Link
        to={`/profile/${friend._id}`}
        className="w-full flex gap-4 items-center cursor-pointer"
      >
        <img
          src={friend?.profileUrl ?? NoProfile}
          alt={friend?.firstName}
          className="w-10 h-10 object-cover rounded-full"
        />
        <div className="flex-1">
            <p className='text-base front-medium text-ascent-1'>
            {friend?.firstName} {friend?.lastName}
            </p>
            <span className='text-sm text-ascent-2'>
                {friend.profession ?? "No Profession"}
            </span>
        </div>
      </Link>
      <div className='flex gap-1'>
        <button className='bg-[#0444a430] text-sm text-white p-1 rounded'
        onClick={() =>{}}
        >
            <BsPersonFillAdd size={20} className='text-[#8B4FB3]' />
        </button>
      </div>
    </div>
  ))
}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    {edit && <EditProfile/>} 
      </>
      );
};

export default Home;

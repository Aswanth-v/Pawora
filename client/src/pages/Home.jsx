import React, { useState,useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {CardProfile,CustomButton,FriendsCard, Loading, TextInput, TopBar,PostCard, EditProfile } from '../components';
import {suggest,requests } from '../assets/data';
import { NoProfile } from '../assets';
import { Link } from 'react-router-dom';
import { BsPersonFillAdd,BsFiletypeGif } from 'react-icons/bs';
import { BiImage, BiSolidVideo } from 'react-icons/bi';
import { apiRequest, deletePost, fetchPosts, getUserInfo, handleFileUpload, likePost, sendFriendRequest } from '../utils';
import { useForm } from 'react-hook-form';


const Home = () => {
    const { user,edit } = useSelector((state) => state.user);
      const { posts } = useSelector(state => state.posts);
    const [friendRequest,setFriendRequest] =useState(requests)
    const[errMsg, setErrMsg] =useState("")
    const [file,setFile]  =useState(null)
    const [posting,setPosting] =useState(false)
    const [loading,setLoading] =useState(false)

    const dispatch = useDispatch()

    const [suggestedFriends,setSuggestedFriends] =useState(suggest)
    const { register,reset, handleSubmit, formState: { errors } } = useForm();


   const handlePostSubmit =async(data)=> {
      console.log("Post submit data:", data); // ✅ check if this prints
    setPosting(true);
    setErrMsg("");
    try {
      const uri = file && (await handleFileUpload(file));
       const newData = uri ? {...data, image: uri } : data;

       const res = await apiRequest({
        url: "/posts/create-post",
        data: newData,
        token: user?.token,
        method: "POST",
       });
       if(res?.status === "failed"){
        setErrMsg(res);
       }else {
        reset({
          description: "",
        });
        setFile(null);
        setErrMsg("");
        await fetchPost();
       }
       setPosting(false);
       
    } catch (error) {
      console.log(error);
      setPosting(false);
    }
  };

  const fetchPost = async()=>{
        await fetchPosts(user?.token, dispatch);

    setLoading(false);
  }
  const handleLikePost = async(uri)=>{
    await likePost({uri:uri,token:user?.token})
    await fetchPost()
  }
  const handleDelete = async(id)=>{
    await deletePost(id,user.token)
    await fetchPost()
  }
  const fetchFriendRequests = async()=>{}
  const fetchSuggestedFriends = async()=>{}
  const handleFriendRequest = async()=>{}
  const acceptFriendRequest = async()=>{}
  const getUser = async()=>{}

 useEffect(() => {
    setLoading(true);
    getUser();
    fetchPost();
    fetchFriendRequests();
    fetchSuggestedFriends();
  }, []);


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
                            onSubmit={handleSubmit(handlePostSubmit)}>
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
                                        containerStyle='bg-[#8B4FB3] text-white py-1 px-4 rounded-full font-semibold text-sm text-ascent-1'
                                        />
                                    )
                                }
                              </div>

                            </div>
                        </form>

                          {loading ? (
              <Loading />
            ) : posts?.length > 0 ? (
              posts?.map((post) => (
                <PostCard
                  key={post?._id}
                  post={post}
                  user={user}
                  deletePost={handleDelete}
                  likePost={handleLikePost}
                />
              ))
                          ) : (
                             <div className="flex w-full h-full items-center justify-center">
                           <p className="text-lg text-ascent-2">No Post yet </p>
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

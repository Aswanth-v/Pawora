import React, { useState } from 'react'
import {useForm} from 'react-hook-form'
import {Link} from 'react-router-dom'
import {useDispatch } from 'react-redux'
import {TbDog } from 'react-icons/tb'
import {BsShare} from "react-icons/bs"
import {AiOutlineInteraction} from 'react-icons/ai'
import {ImConnection} from 'react-icons/im'
import { TextInput,Loading,CustomButton } from '../components'
import { BgImage,NoProfile } from '../assets'
import { UserLogin } from '../redux/userSlice'
import { apiRequest } from "../utils";
function Login() {
    const [errMsg ,setErrMsg]=useState('');
  const [isSubmitting, setIsSubmitting]=useState(false)
  const dispatch= useDispatch() 
  const {
    register,handleSubmit,formState:{errors},
  }=useForm({
    mode:"onChange"
  })

    const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const res = await apiRequest({
          url:"/auth/login",
          data:data,
          method:"POST"
      })
      if(res?.status === "failed"){
        setErrMsg(res);
      }else{
        setErrMsg("");
        const newData = {token:res?.token,...res?.user};
        dispatch(UserLogin(newData));
        window.location.replace("/")
      }
      setIsSubmitting(false);
    
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };



  return (
    <div className='bg-bgColor w-full h-[100vh] flex items-center justify-center p-6'>
      <div className='w-full md:w-2/3 h-fit lg-full 2xl:h-5/6 py-8 lg:py-0 
      flex bg-primary rounded-xl overflow-hidden shadow-xl'>
        {/*Left*/}
        <div className='w-full lg:w-2/3 h-full p-10 2xl:px-20 flex flex-col justify-center'>
        
        <div className='w-full flex gap-2 item-center mb-6'>
        <div className='p-2 bg-[#967BB6] rounded text-white'>
        <TbDog size={30 } />
        </div>
        <span className='text-2xl text-[#B57EDC] font-semibold'>

          Sharefun
        </span>
        </div>
        <p className='text-ascent-1 text-base front-semibold'>Log in to your account</p>
        <span className='text-sm mt-2 text-ascent-2'>Welcome Back</span>
        <form className='py-8 flex flex-col gap-5'
        onSubmit={handleSubmit(onSubmit)}
        >
          <TextInput
          name='email' 
          placeholder='email@example.com'
          label='email address'
          type='email'
          register={
            register('email',{
              required:'Email Adress is required'
            })
          }
          styles='w-full rounded-full'
          labelStyle='ml-2'
          error={errors.email ?errors.email.message:""}
          />
          <TextInput
          name='password' 
          placeholder='password'

          label='password'
          type='password'
          register={
            register('password',{
              required:'password is required'
            })
          }
          styles='w-full rounded-full'
          labelStyle='ml-2'
          error={errors.password ?errors.password.message:""}
          />

          <Link
          to='/reset-password'
          className="text-sm text-right text-blue font-semibold"
          >
          Forgot password?</Link>
          {
            errMsg?.message && (
              <span className={`text-sm ${
                errMsg?.status =="failed"? "text-[#f64949fe]" :"text-[#2ba150fe]"
              } mt-0.5`}>

                {errMsg?.message}
              </span>
            )
          }

          {
            isSubmitting ?  <Loading/> : <CustomButton
            

            type='submit'
            containerStyle={"inline-flex justify-center rounded-md bg-blue px-8 py-3 text-sm font-medium text-white outline-none"}
            title="Login"
            />
          }
        </form>
        <p className="text-ascent-2 text-sm text-center"
        >Don't have an account?{''}
        <Link
        to='/register'
        className='text-[#B57EDC] font-semibold ml-2 cursor-pointer'>
        Create Account</Link>
        </p>
        </div>
        {/*Right*/}
        <div className='hidden w-1/2 h-100% lg:flex flex-col items-center justify-center bg-blue'>

        <div className='relative w-full flex flex-col items-center justify-center'>

          <img
          src={BgImage}
          alt='Bg Image'
          className='w-48 2xl:w-64 h-48 2xl:h-64 rounded-full object-cover'
          />
          <div className="absolute flex items-center gap-1 bg-white right-3 top-10 py-1.5 px-3 rounded-full">

            <BsShare size={10}/>
            <span className='text-xs font-medium'>Share</span>
          </div>

          <div className="absolute flex items-center gap-1 bg-white left-4 top-6 py-1.5 px-2 rounded-full ">
            <ImConnection/>
            <span className='text-xs font-medium'>Connect</span>
          </div>

          <div className="absolute flex items-center gap-1 bg-white left-3 bottom-6 py-1.5 px-2 rounded-full ">
            <AiOutlineInteraction/>
            <span className='text-xs font-medium'>Interact</span>
          </div>
          </div>
          
          <div className="mt-16 text-center" >

            <p className="text-white text-base" >Connect & help be kind </p>
            <span className="text-sm text-white/80">Share and find Helping hands</span>
          </div>


        </div>
      </div>
    </div>
  )
}

export default Login
import React, { useState } from 'react'
import {useForm} from 'react-hook-form'
import {Link} from 'react-router-dom'
import {useDispatch } from 'react-redux'
import {TbDog } from 'react-icons/tb'
import { TextInput,Loading,CustomButton } from '../components'
import { BgImage,NoProfile } from '../assets'


function Login() {
  const {
    register,handleSubmit,formState:{errors},
  }=useForm({
    mode:"onChange"
  })

  const [errMsg ,setErrMsg]=useState('');
  const [isSubmitting, setIsSubmitting]=useState(false)
  const dispatch= useDispatch() 

  return (
    <div className='bg-bgColor w-full h-[100vh] flex items-center justify-center p-6'>
      <div className='w-full md:w-2/3 h-fit lg-full 2xl:h-5/6 py-8 lg:py-0 
      flex bg-primary rounded-xl overflow-hidden shadow-xl'>
        {/*Left*/}
        <div className='w-full lg:w-2/3 h-full p-10 2xl:px-20 flex flex-col justify-center'>
        
        <div className='w-full flex gap-2 item-center mb-6'>
        <div className='p-2 bg-[#065ad8] rounded text-white'>
        <TbDog size={30 } />
        </div>
        <span className='text-2xl text-[#065ad8]' font-semibold>
          Sharefun
        </span>
        </div>
        <p className='text-ascent-1 text-base front-semibold'>Log in to your account</p>
        <span className='text-sm mt-2 text-ascent-2'>Welcome Back</span>
        <form className='py-8 flex flex-col gap-5'>
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
        className='text-[#065ad8] font-semibold ml-2 cursor-pointer'>
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
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Login
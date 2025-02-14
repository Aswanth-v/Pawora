import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { TbDog } from "react-icons/tb";
import { BsShare } from "react-icons/bs";
import { AiOutlineInteraction } from "react-icons/ai";
import { ImConnection } from "react-icons/im";
import { TextInput, Loading, CustomButton } from "../components";
import { BgImage, NoProfile } from "../assets";

function Register() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {};

  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className="bg-bgColor w-full h-[100vh] flex items-center justify-center p-6">
      <div
        className="w-full md:w-2/3 h-fit lg-full 2xl:h-5/6 py-8 lg:py-0 
      flex flex-row-reverse bg-primary rounded-xl overflow-hidden shadow-xl"
      >
        {/*Left*/}
        <div className="w-full lg:w-2/3 h-full p-10 2xl:px-20 flex flex-col justify-center">
          <div className="w-full flex gap-2 item-center mb-6">
            <div className="p-2 bg-[#967BB6] rounded text-white">
              <TbDog size={30} />
            </div>
            <span className="text-2xl text-[#B57EDC]" font-semibold>
              Sharefun
            </span>
          </div>
          <p className="text-ascent-1 text-base front-semibold">
            Create Account
          </p>

          <form
            className="py-8 flex flex-col gap-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="w-full  flex flex-col lg:flex-row gap-1 md:gap-2">
              <TextInput
                name="FirstName"
                label="First Name"
                placeholder="First Name"
                type="text"
                styles="w-full"
                register={register("firstName", {
                  required: "First Name is required!",
                })}
                error={errors.firstName ? errors.firstName?.message : ""}
              />
           

            <div className="w-full  flex flex-col lg:flex-row gap-1 md:gap-2">
              <TextInput
                label="Last Name"
                placeholder="Last Name"
                type="lastName"
                styles="w-full"
                register={register("lastName", {
                  required: "Last Name is required!",
                })}
                error={errors.lastName ? errors.lastName?.message : ""}
              />
            </div>
            </div>

            <TextInput
              name="email"
              placeholder="email@example.com"
              label="email address"
              type="email"
              register={register("email", {
                required: "Email Adress is required",
              })}
              styles="w-full "
              error={errors.email ? errors.email.message : ""}
            />

<div className="w-full  flex flex-col lg:flex-row gap-1 md:gap-2">
            <TextInput
              name="password"
              placeholder="password"
              label="password"
              type="password"
              register={register("password", {
                required: "password is required",
              })}
              styles="w-full"
              labelStyle="ml-2"
              error={errors.password ? errors.password.message : ""}
            />
 <div className="w-full  flex flex-col lg:flex-row gap-1 md:gap-2">
            <TextInput
              label="Conform password"
              placeholder="password"
              type="password"
                styles="w-full"
              register={register("cPassword", {
                validate: (value) => {
                  const { password } = getValues();

                  if (password != value) {
                    return "password do no match";
                  }
                },
              })}
            
            
              error={
                errors.cpassword && errors.cpassword.type === "validate"
                  ? errors.cpassword?.message
                  : ""
              }
            />
</div>
</div>
            
            {errMsg?.message && (
              <span
                className={`text-sm ${
                  errMsg?.status == "failed"
                    ? "text-[#f64949fe]"
                    : "text-[#2ba150fe]"
                } mt-0.5`}
              >
                {errMsg?.message}
              </span>
            )}

            {isSubmitting ? (
              <Loading />
            ) : (
              <CustomButton
                type="submit"
                containerStyle={
                  "inline-flex justify-center rounded-md bg-blue px-8 py-3 text-sm font-medium text-white outline-none"
                }
                title="Create Account"
              />
            )}
          </form>
          <p className="text-ascent-2 text-sm text-center">
           Already has an account?{""}
            <Link
              to="/login"
              className="text-[#B57EDC] font-semibold ml-2 cursor-pointer"
            >
              Login
            </Link>
          </p>
        </div>
        {/*Right*/}
        <div className="hidden w-1/2 h-100% lg:flex flex-col items-center justify-center bg-blue">
          <div className="relative w-full flex flex-col items-center justify-center">
            <img
              src={BgImage}
              alt="Bg Image"
              className="w-48 2xl:w-64 h-48 2xl:h-64 rounded-full object-cover"
            />
            <div className="absolute flex items-center gap-1 bg-white right-3 top-10 py-1.5 px-3 rounded-full">
              <BsShare size={10} />
              <span className="text-xs font-medium">Share</span>
            </div>

            <div className="absolute flex items-center gap-1 bg-white left-4 top-6 py-1.5 px-2 rounded-full ">
              <ImConnection />
              <span className="text-xs font-medium">Connect</span>
            </div>

            <div className="absolute flex items-center gap-1 bg-white left-3 bottom-6 py-1.5 px-2 rounded-full ">
              <AiOutlineInteraction />
              <span className="text-xs font-medium">Interact</span>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-white text-base">Connect & help be kind </p>
            <span className="text-sm text-white/80">
              Share and find Helping hands
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetTheme } from "../redux/theme";
import { TbDog } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import TextInput from "./TextInput";
import CustomButton from "./CustomButton";
import { useForm } from "react-hook-form";
import { BsMoon, BsSunFill } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Logout } from "../redux/userSlice";
import Donation from "./Donation";

const TopBar = () => {
  const { theme } = useSelector((state) => state.theme);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // ✅ Correct useNavigate hook

  // useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Toggle theme
  const handleTheme = () => {
    const themeValue = theme === "light" ? "dark" : "light";
    dispatch(SetTheme(themeValue));
  };

  const handleSearch = async (data) => {
    // Your search logic (if any)
  };

  // ✅ Handle logout & redirect
  const handleLogout = () => {
    dispatch(Logout());
    navigate("/login"); // 👈 redirect to login after logout
  };

  return (
    <div className="topbar w-full flex items-center justify-between py-3 md:py-6 px-4 bg-primary">
      {/* Logo */}
      <Link to="/" className="flex gap-2 items-center">
        <div className="p-1 md:p-2 bg-[#967BB6] rounded text-white">
          <TbDog />
        </div>
        <span className="text-xl md:text-2xl text-[#B57EDC] font-semibold">
          ShareFun
        </span>
      </Link>

      {/* Search bar */}
      <form
        className="hidden md:flex items-center justify-center"
        onSubmit={handleSubmit(handleSearch)}
      >
        <TextInput
          placeholder="Search..."
          styles="w-[18rem] lg:w-[38rem] rounded-l-full py-3"
          register={register("search")}
        />
        <CustomButton
          title="Search"
          type="submit"
          containerStyles="bg-[#B57EDC] text-white px-6 py-2.5 mt-2 rounded-r-full"
        />
      </form>

      {/* Donation */}
      <Donation />

      {/* Icons & Log Out */}
      <div className="flex gap-4 items-center text-ascent-1 text-md md:text-xl">
        <button onClick={handleTheme}>
          {theme === "dark" ? <BsMoon /> : <BsSunFill />}
        </button>
        <div className="hidden lg:flex">
          <IoMdNotificationsOutline />
        </div>
        <div>
          <CustomButton
            onClick={handleLogout} // 👈 using handleLogout to log out & redirect
            title="Log Out"
            containerStyles="text-sm text-ascent-1 px-4 md:px-6 py-1 md:py-2 border border-[#666] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default TopBar;

import mongoose from "mongoose";
import Verification from "../models/emailVerification.js";
import Users from "../models/userModel.js";
import { compareString } from "../utils/index.js";
import passwordReset from "../models/passwordReset.js";
import { resetPasswordLink } from "../utils/sendEmail.js";

export const verifyEmail = async (req, res) => {
  const { userId, token } = req.params;

  try {
    console.log("Verifying user:", userId);
    const result = await Verification.findOne({ userId });

    if (!result) {
      const message = "Invalid verification link. Try again later.";
      return res.redirect(`/users/verified?status=error&message=${encodeURIComponent(message)}`);
    }

    const { expiresAt, token: hashedToken } = result;

    if (expiresAt < Date.now()) {
      await Verification.findOneAndDelete({ userId });
      await Users.findOneAndDelete({ _id: userId });
      const message = "Verification token has expired.";
      return res.redirect(`/users/verified?status=error&message=${encodeURIComponent(message)}`);
    }

    const isMatch = await compareString(token, hashedToken);

    if (!isMatch) {
      const message = "Verification failed or link is invalid.";
      return res.redirect(`/users/verified?status=error&message=${encodeURIComponent(message)}`);
    }

    await Users.findOneAndUpdate({ _id: userId }, { verified: true });
    await Verification.findOneAndDelete({ userId });

    const message = "Email verified successfully.";
    return res.redirect(`/users/verified?status=success&message=${encodeURIComponent(message)}`);

  } catch (error) {
    console.log("Verification Error:", error);
    const message = "Something went wrong. Please try again.";
    return res.redirect(`/users/verified?status=error&message=${encodeURIComponent(message)}`);
  }
};

export const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(404).json({
        status: "FAILED",
        message: "Email address not found.",
      });
    }

    const existingRequest = await passwordReset.findOne({ email });
    if (existingRequest) {
      if (existingRequest.expiresAt > Date.now()) {
        return res.status(201).json({
          status: "PENDING",
          message: "Reset password link has already been sent tp your email.",
        });
      }
      await passwordReset.findOneAndDelete({ email });
    }
    await resetPasswordLink(user, res);

} catch (error) {
    console.log( error);
   res.redirect(404).json({message :error.message})
  }
}

export const resetPassword =async (req,res)=>{
  const {userId,token} =req.params
    try {
    // find record
    const user = await Users.findById(userId);

    if (!user) {
      const message = "Invalid password reset link. Try again";
      res.redirect(`/users/resetpassword?status=error&message=${message}`);
    }

    const resetPassword = await passwordReset.findOne({ userId });

    if (!resetPassword) {
      const message = "Invalid password reset link. Try again";
      return res.redirect(
        `/users/resetpassword?status=error&message=${message}`
      );
    }

    const { expiresAt, token: resetToken } = resetPassword;

    if (expiresAt < Date.now()) {
      const message = "Reset Password link has expired. Please try again";
      res.redirect(`/users/resetpassword?status=error&message=${message}`);
    } else {
      const isMatch = await compareString(token, resetToken);

      if (!isMatch) {
        const message = "Invalid reset password link. Please try again";
        res.redirect(`/users/resetpassword?status=error&message=${message}`);
      } else {
        res.redirect(`/users/resetpassword?type=reset&id=${userId}`);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
  
export const changePassword =async(req,res)=>{
  try{
     const { userId, password } = req.body;

    const hashedpassword = await hashString(password);

    const user = await Users.findByIdAndUpdate(
      { _id: userId },
      { password: hashedpassword }
    ); 
      if (user) {
      await passwordReset.findOneAndDelete({ userId });

      res.status(200).json({
        ok: true,
      });
    }
  }catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
}

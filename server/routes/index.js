import express, { Router } from "express";
import authRoute from "./authRoutes.js";
import userRoute from './userRoutes.js'
import donationRoutes from './donationRoutes.js'

const router = express.Router();

router.use(`/auth`, authRoute); //auth/register
router.use(`/users`,userRoute);
router.use(`/`,donationRoutes)
export default router;
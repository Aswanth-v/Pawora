import express from "express";
import path from "path";
import { verifyEmail} from "../controllers/userController.js";
import { resetPasswordLink } from "../utils/sendEmail.js";
const router = express.Router();
const __dirname = path.resolve(path.dirname(""));

router.get("/verify/:userId/:token", verifyEmail);
router.get("/reset-password/:userId/:token", resetPasswordLink);

router.get("/verified", (req, res) => {
  res.sendFile(path.join(__dirname, "./views", "index.html"));
});


router.get("/resetpassword", (req, res) => {
  res.sendFile(path.join(__dirname, "./views", "index.html"));
});
  export default router; 
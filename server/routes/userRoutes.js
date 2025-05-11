import express from "express";
import path from "path";
import { requestPasswordReset, verifyEmail,resetPassword,changePassword} from "../controllers/userController.js";

const router = express.Router();
const __dirname = path.resolve(path.dirname(""));

router.get("/verify/:userId/:token", verifyEmail);
//password reaser
router.post('/request-passwordreset',requestPasswordReset)
router.get("/reset-password/:userId/:token", resetPassword);
router.post('/reset-password',changePassword)



router.get("/verified", (req, res) => {
  const status = req.query.status;
 
  
  if (status === 'success') {
    res.sendFile(path.join(__dirname, "./views", "success.html"));
  } else if (status === 'error') {
    res.status(404).sendFile(path.join(__dirname, "./views", "error.html"));
  } else {
    res.status(400).send("Invalid status parameter.");
  }
});


router.get("/resetpassword", (req, res) => {
  res.sendFile(path.join(__dirname, "./views", "index.html"));
});
  export default router; 
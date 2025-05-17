import express from 'express';
import { donation } from '../controllers/userController.js'; // Adjust path as needed

const router = express.Router();

// Define POST /donation route that calls the donation controller
router.post('/donation', donation);

export default router;

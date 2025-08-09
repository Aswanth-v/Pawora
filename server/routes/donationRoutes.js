import express from 'express';
import { donation,donationAmount } from '../controllers/userController.js'; // Adjust path as needed

const router = express.Router();

// Define POST /donation route that calls the donation controller
router.post('/donation', donation);
router.get('/donationAm', donationAmount);

// Endpoint to get the total donated amount
export default router;

import dotenv from 'dotenv';
import express from 'express';
import Razorpay from 'razorpay';
import twilio from "twilio"; 

// Load environment variables from .env file
dotenv.config();

const router = express.Router();

// Initialize Twilio client
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

router.post("/orders", async (req, res) => {
    try {
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET,
        });

        const options = {
            amount: 50000, // amount in smallest currency unit
            currency: "INR",
            receipt: "receipt_order_74394",
        };

        const order = await instance.orders.create(options);

        if (!order) return res.status(500).send("Some error occurred");

        res.json(order);
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        res.status(500).send("Failed to create Razorpay order.");
    }
});

router.post("/success", async (req, res) => {
    try {
        const {
            orderCreationId,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
            // userPhoneNumber, // Commenting out this line as we're hardcoding the number
        } = req.body;

        // Hardcode the user phone number
        const userPhoneNumber = '+917000876346'; // Hardcoded phone number

        // Existing verification code...

        // If the payment is valid, send an SMS
        const message = await client.messages.create({
            body: `Your payment was successful! Order ID: ${razorpayOrderId}, Payment ID: ${razorpayPaymentId}`,
            from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio phone number
            to: userPhoneNumber // Using the hardcoded phone number
        });

        console.log(`SMS sent: ${message.sid}`); // Log the message SID
        res.json({
            msg: "success",
            orderId: razorpayOrderId,
            paymentId: razorpayPaymentId,
        });
    } catch (error) {
        console.error('Error sending SMS:', error); // Log any error
        res.status(500).send("Failed to send SMS.");
    }
});

export default router;

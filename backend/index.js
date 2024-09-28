import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import axios from "axios";
import {JSDOM} from "jsdom"
import mongoose from "mongoose"; // For Mongoose
import { MongoClient } from "mongodb"; // For MongoClient from the native MongoDB driver
import dotenv from "dotenv";
import cors from 'cors'
import payment from "./routes/payment.js";
const __dirname = dirname(fileURLToPath(import.meta.url));


const app = express();
const port = 3000;

app.use(cors(

))

dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
app.set("view engine", "ejs");

const uri = process.env.MONGO_DB;
const client = new MongoClient(uri);

// Connect to the database
async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to the MongoDB database.');
  } catch (err) {
    console.error('Error connecting to the database:', err);
  }
}
  
connectDB();

app.use("/payment", payment);
//console.log(process.env.RAZORPAY_KEY_ID, process.env.RAZORPAY_SECRET);

app.get("/", async (req, res) => {
  
});

app.get("/data", async (req, res) =>{
    try{
    const database = client.db('test'); // Replace with your database name
    const collection = database.collection('parkingData'); // Replace with your collection name

    // Fetch data from the collection
    const data = await collection.find({}).toArray();
    
    // Send the data as JSON
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: "Error fetching data" });
  }
})




app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });




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
app.use(express.json());

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

app.post('/location', async (req, res) => {
    const { location } = req.body; // Destructure location from the request body
  
    if (!location) {
      return res.status(400).json({ message: 'Location is required' });
    }
  
    try {
      const database = client.db('test'); // Replace with your actual database name
      const collection = database.collection('analyticsData'); // Replace with your actual collection name
  
      const localityData = await collection.aggregate([
        {
          $match: { Locality: location } // Match the specific locality based on user input
        },
        {
          $group: {
            _id: "$Locality", // Group by locality
            totalMon: { $sum: "$Mon" }, // Sum of "Mon"
            totalTue: { $sum: "$Tue" }, // Sum of "Tue"
            totalWed: { $sum: "$Wed" }, // Sum of "Wed"
            totalThu: { $sum: "$Thurs" }, // Sum of "Thu"
            totalFri: { $sum: "$Fri" }, // Sum of "Fri"
            totalSat: { $sum: "$Sat" }, // Sum of "Sat"
            totalSun: { $sum: "$Sun" }, // Sum of "Sun"
            totalEntries: { $sum: 1 } // Count of total entries
          }
        },
        {
          $project: {
            _id: 1,
            monPerEntry: { $divide: ["$totalMon", { $ifNull: ["$totalEntries", 1] }] }, // Avoid division by zero
            tuePerEntry: { $divide: ["$totalTue", { $ifNull: ["$totalEntries", 1] }] },
            wedPerEntry: { $divide: ["$totalWed", { $ifNull: ["$totalEntries", 1] }] },
            thuPerEntry: { $divide: ["$totalThu", { $ifNull: ["$totalEntries", 1] }] },
            friPerEntry: { $divide: ["$totalFri", { $ifNull: ["$totalEntries", 1] }] },
            satPerEntry: { $divide: ["$totalSat", { $ifNull: ["$totalEntries", 1] }] },
            sunPerEntry: { $divide: ["$totalSun", { $ifNull: ["$totalEntries", 1] }] },

          }
        },
        {
          $sort: { monPerEntry: -1 } // You can adjust this to sort by any day
        }
      ]).toArray();
  
      console.log(localityData);
      
  
      if (localityData.length === 0) {
        return res.status(404).json({ message: 'No data found for the provided location' });
      }
  
      // Send the data as a response
      res.status(200).json(localityData);
    } catch (error) {
      console.error('Error querying data:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.post('/predictAv', async (req, res) => {
    const { location, day } = req.body; // Destructure location and day from the request body
  
    if (!location || !day) {
      return res.status(400).json({ message: 'Location and day are required' });
    }
  
    // Define a mapping for the days to their corresponding database fields
    const dayMapping = {
      "Monday": "Mon",
      "Tuesday": "Tue",
      "Wednesday": "Wed",
      "Thursday": "Thurs",
      "Friday": "Fri",
      "Saturday": "Sat",
      "Sunday": "Sun"
    };
  
    // Check if the provided day is valid
    if (!dayMapping[day]) {
      return res.status(400).json({ message: 'Invalid day provided' });
    }
  console.log(location, day)
    try {
      const database = client.db('test'); // Replace with your actual database name
      const collection = database.collection('analyticsData'); // Replace with your actual collection name
  
      const averageData = await collection.aggregate([
        {
          $match: { Locality: location } // Match the specific locality based on user input
        },
        {
          $group: {
            _id: "$Locality", // Group by locality
            averageValue: { $avg: `$${dayMapping[day]}` } // Calculate average for the specified day
          }
        }
      ]).toArray();
  
      console.log(averageData);
  
      if (averageData.length === 0) {
        return res.status(404).json({ message: 'No data found for the provided location' });
      }
  
      // Send the average value as a response
      const prob = (1 - averageData[0].averageValue) * 100
      res.status(200).json({
        location: averageData[0]._id,
        average: prob + "%"
      });
    } catch (error) {
      console.error('Error querying data:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  



app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });




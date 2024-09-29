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

app.post('/location', async (req, res) => { //In a particular location, the percentage of parking filled up based on assumption that 4 hr slots are given
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

  app.post('/predictAv', async (req, res) => { //get prob of getting a parking space on a location on a particular day
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

    app.post('/polDeploy', async (req, res) => { // how to deploy police on a particular day percentage wise
        const { day } = req.body; // Destructure day from the request body
      
        if (!day) {
          return res.status(400).json({ message: 'Day is required' });
        }
      
        // Define a mapping for the days to their corresponding database fields
        const dayMapping = {
          "Monday": "Mon",
          "Tuesday": "Tue",
          "Wednesday": "Wed",
          "Thursday": "Thu",
          "Friday": "Fri",
          "Saturday": "Sat",
          "Sunday": "Sun"
        };
      
        // Check if the provided day is valid
        if (!dayMapping[day]) {
          return res.status(400).json({ message: 'Invalid day provided' });
        }
      
        try {
          const database = client.db('test'); // Replace with your actual database name
          const collection = database.collection('analyticsData'); // Replace with your actual collection name
      
          // Query the database for all locations
          const ticketData = await collection.aggregate([
            {
              $group: {
                _id: "$Locality", // Group by locality
                totalTicketsRequired: {
                  $sum: {
                    $cond: [
                      { $gt: ["$Percentage use", 0] }, // Check if PercentageUse > 0
                      {
                        $divide: [
                          { $multiply: [`$${dayMapping[day]}`, "$Total tickets sold in a day"] }, // (Day * Total tickets sold)
                          "$Percentage use" // Divide by PercentageUse if it's greater than 0
                        ]
                      },
                      { $multiply: [`$${dayMapping[day]}`, "$Total tickets sold in a day"] } // Default value when PercentageUse is 0 or missing
                    ]
                  }
                }
              }
            }
          ]).toArray();
      
          console.log(ticketData);
      
          if (ticketData.length === 0) {
            return res.status(404).json({ message: 'No data found' });
          }
          var sum = 0;
          for(var i = 0; i < ticketData.length; i++)
          {
            ticketData[i].totalTicketsRequired = Math.round(ticketData[i].totalTicketsRequired/120);
            sum += ticketData[i].totalTicketsRequired;
          }
          for(var i = 0; i < ticketData.length; i++)
            {
              ticketData[i].totalTicketsRequired = ticketData[i].totalTicketsRequired * 100 / sum;
            }
      
          // Send the calculated total tickets for each locality as a response
          res.status(200).json(ticketData); // Returning all locations' total tickets
        } catch (error) {
          console.error('Error querying data:', error);
          res.status(500).json({ message: 'Internal server error' });
        }
      });

      app.post('/update', async (req, res) => {
        const { locationId, timeStamp, entered } = req.body;
      
        if (!locationId || !timeStamp || entered === undefined) {
          return res.status(400).json({ message: 'Location ID, TimeStamp, and Entered status are required.' });
        }
      
        // Parse the timestamp to extract the day of the week
        const date = new Date(timeStamp);
        const dayOfWeek = date.toLocaleString('en-us', { weekday: 'long' }); // Extracts day name
        const currentYear = date.getFullYear();
        const currentWeekNumber = Math.ceil((date.getDate() - 1) / 7); // Simple week calculation for demo purposes
      
        // Mapping days of the week to the appropriate database fields
        const dayMapping = {
          "Monday": "Mon",
          "Tuesday": "Tue",
          "Wednesday": "Wed",
          "Thursday": "Thu",
          "Friday": "Fri",
          "Saturday": "Sat",
          "Sunday": "Sun"
        };
      
        // Handle errors for unsupported days
        if (!dayMapping[dayOfWeek]) {
          return res.status(400).json({ message: 'Invalid day provided.' });
        }
      
        try {
          const database = client.db('test'); // Replace with your actual DB name
          const parkingCollection = database.collection('parkingData');
          const legacyCollection = database.collection('legacyTable');
      
          // 1. Update "Available Spaces" in `parkingData`
          const spaceUpdate = entered ? -1 : 1; // -1 for entry, +1 for exit
      
          const parkingUpdateResult = await parkingCollection.updateOne(
            { Address: locationId },
            { $inc: { "Available Spaces": spaceUpdate } } // Increment or decrement based on 'entered'
          );
      
          if (parkingUpdateResult.matchedCount === 0) {
            return res.status(404).json({ message: 'Location not found in parkingData.' });
          }

          const parkingData = await parkingCollection.findOne({ Address: locationId });
          const loc_id = parkingData.Locality;
      
          // 2. Update the respective day in `legacyTable`
          const legacyUpdateResult = await legacyCollection.updateOne(
            { loc_id: locationId, week: currentWeekNumber, year: currentYear }, // Update based on current week and year
            { $inc: { [dayMapping[dayOfWeek]]: 1 } }, // Increment the day's count
            { upsert: true } // Create a new row for a new week if not existing
          );

          
      
          if (!legacyUpdateResult) {
            return res.status(500).json({ message: 'Error updating legacyTable.' });
          }
      
          res.status(200).json({ message: 'Data successfully updated.' });
      
        } catch (error) {
          console.error('Error updating data:', error);
          res.status(500).json({ message: 'Internal server error.' });
        }
      });

      app.get('/suggest', async (req, res) => {
        try {
          const database = client.db('test'); // Replace with your actual database name
          const collection = database.collection('analyticsData'); // Replace with your actual collection name
      
          const localityData = await collection.aggregate([
            {
              $group: {
                _id: "$Locality", // Group by locality
                totalRatio: { $sum: { $multiply: ["$Percentage Use", 100] } }, // Sum of Percentage Use * 100 (pst)
                totalCapacity: { $sum: { $multiply: ["$Cars", 6] } }, // Sum of Cars * 6
              }
            },
            {
              $project: {
                _id: 1, // Include the locality
                totalRatio: 1, // Include the total ratio
                totalCapacity: 1, // Include the total capacity
                fitnessFunction: {
                  $add: [
                    { $multiply: [0.75, "$totalRatio"] }, // 0.75 * pst
                    { $multiply: [0.25, "$totalCapacity"] } // 0.25 * Capacity of Locality
                  ]
                }
              }
            },
            {
              $sort: { fitnessFunction: -1 } // Sort in descending order based on fitnessFunction
            },
            {
              $limit: 5 // Limit the results to the top 5
            }
          ]).toArray();
      
          return res.status(200).json(localityData);
        } catch (error) {
          console.error('Error fetching locality data:', error);
          return res.status(500).json({ message: 'Error fetching locality data' });
        }
      });
      
      
  
  



app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });




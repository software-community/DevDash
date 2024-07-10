const express = require('express');
const cors = require('cors');
const app = express();


app.use(cors({
    origin: '*', // Allow all origins
    credentials: true
  }));
  
// Parse JSON bodies
app.use(express.json());

// Import and configure MongoDB connection
require('./db/connection');
const Users = require('./Models/User');

// Handle POST request to create a new user
app.post("/", async (req, res) => {
    try {
        let user = new Users(req.body);
        let result = await user.save();
        res.send(result);
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send("Error creating user");
    }
});


app.post("/updateTime", async (req, res) => {
    console.log("Received update-time request:", req.body);
    try {
        const { entryNumber, timeTaken } = req.body;

        // Find the user by entryNumber
        const user = await Users.findOne({ entryNumber });

        if (!user) {
            return res.status(404).send("User not found");
        }

        // Update the timeTaken field
        user.time += parseInt(timeTaken);

        // Save the updated user document
        await user.save();

        res.send(user); // Optionally, you can send the updated user object as a response
    } catch (error) {
        console.error("Error updating time taken:", error);
        res.status(500).send("Error updating time taken");
    }
});


app.post("/percentageComplete", async (req, res) => {
    try {
        const { date } = req.body;

        // Find all users with the same date
        const totalUsers = await Users.countDocuments({ date });
        const completedUsers = await Users.countDocuments({ date, isEnd: true });

        if (totalUsers === 0) {
            return res.status(404).send("No users found for the given date");
        }

        // Calculate the percentage
        const percentageComplete = (completedUsers / totalUsers) * 100;

        res.send({ percentageComplete });
    } catch (error) {
        console.error("Error calculating percentage complete:", error);
        res.status(500).send("Error calculating percentage complete");
    }
});

app.post("/setIsEnd", async (req, res) => {
    try {
        const { entryNumber } = req.body;

        // Find the user by entryNumber
        const user = await Users.findOne({ entryNumber });

        if (!user) {
            return res.status(404).send("User not found");
        }

        // Update the isEnd field to true
        user.isEnd = true;

        // Save the updated user document
        await user.save();

        res.send(user); // Optionally, you can send the updated user object as a response
    } catch (error) {
        console.error("Error setting isEnd:", error);
        res.status(500).send("Error setting isEnd");
    }
});

app.post("/result", async (req, res) => {
    const { date } = req.body;

    try {
        // Fetch users with the given date and isEnd = true, then sort by time in ascending order
        const totalUsers = await Users.find({ date: date, isEnd: true }).sort({ time: 1 }).select('name entryNumber time');
        
        res.send({ totalUsers });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send({ message: "Error fetching users" });
    }
});

// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

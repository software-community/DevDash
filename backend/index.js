const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // or use an environment variable
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


// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

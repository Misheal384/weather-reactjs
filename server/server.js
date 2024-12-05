const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors()); // Enable CORS
app.use(express.json());

const PORT = process.env.PORT || 5000;
 const WEATHER_API_KEY = process.env.WEATHER_API_KEY; // Set in .env file

app.get("/api/weather", async (req, res) => {
  const city = req.query.city;
  // const apiKey = "7873742fb767ffda10da6472e0c631a8"; 


  if (!city) {
    return res.status(400).json({ error: "City parameter is required" });
  }

  try {
    const response = await axios.get(
       `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${WEATHER_API_KEY}`
      
    );
    res.json(response.data); // Send weather data as JSON
  } catch (error) {
    console.error("Error fetching weather data:", error.message); // Log error details
    res.status(500).json({ error: error.response?.data?.message || "Server error" });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

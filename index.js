const express = require("express");
const path = require("path");
const axios = require("axios");

const app = express();

// Constants
const NEARBY_SATELLITE = "rest/v1/satellite/above";

const SAT_API_KEY = "ZFHAS6-W9U27M-GWPTT8-4PR9";

const SATELLITE_POSITION_URL = "rest/v1/satellite/positions";

const N2YO_BASE_URL = "https://api.n2yo.com";

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// Put all API endpoints under '/api'

// nearby
app.get(
  "/api/nearby/:latitude/:longitude/:elevation/:altitude/:STARLINK_CATEGORY",
  async (req, res) => {
    const { latitude, longitude, elevation, altitude, STARLINK_CATEGORY } =
      req.params;
    const url = `${N2YO_BASE_URL}/${NEARBY_SATELLITE}/${latitude}/${longitude}/${elevation}/${altitude}/${STARLINK_CATEGORY}/&apiKey=${SAT_API_KEY}`;
    const axios_response = await axios.get(url);
    console.log(axios_response);
    res.json(axios_response.data);
  }
);

// position
app.get(
  "/api/position/:satid/:latitude/:longitude/:elevation/:endTime",
  async (req, res) => {
    const { satid, latitude, longitude, elevation, endTime } = req.params;
    const url = `${N2YO_BASE_URL}/${SATELLITE_POSITION_URL}/${satid}/${latitude}/${longitude}/${elevation}/${endTime}/&apiKey=${SAT_API_KEY}`;
    const axios_response = await axios.get(url);
    console.log(axios_response);
    res.json(axios_response.data);
  }
);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`API listening on ${port}`);

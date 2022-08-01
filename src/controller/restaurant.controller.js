import axios from "axios";
import Record from "../model/Record.js";

export const getRestaurants = async (req, res) => {
// getting coordinates from the client
const { latitude, longitude } = req.body;

// making a request to the geoapi to get near restaurants within coordinates
const response = await axios(`https://api.geoapify.com/v2/places?categories=catering.restaurant&filter=circle:${latitude},${longitude},5000&limit=5&apiKey=10deb557e71c447f831d388f4ab77768`);

const restaurants = response.data.features.map(e => e.properties.name);

// creating a record of restaurants
await createRecord(restaurants, latitude, longitude);

// sending a response with the restaurantes found
res.status(200).json({restaurants});
}

export const getRecords = async (req, res) => {
  // finding restaurants records in DB
  const records = await Record.find().select("-_id -__v");
  // sending response to the client
  res.status(200).json({records});
}

const createRecord = async (restaurants, latitude, longitude) => {
  // creating a new record of restaurants and their coordinates
  const record = new Record({
    restaurants,
    location: {
      latitude,
      longitude 
    }
  })
  // saving to DB
  await record.save();
}
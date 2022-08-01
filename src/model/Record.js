import mongoose from "mongoose";


const recordSchema = new mongoose.Schema(
  {
    restaurants: {
      type: Array,
    },
    location: {
      latitude: {
        type: String
      },
      longitude: {
        type: String
      }
    }

  }
);



export default mongoose.model("Record", recordSchema);

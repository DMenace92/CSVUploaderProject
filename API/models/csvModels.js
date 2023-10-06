const mongoose = require('mongoose')



// Define a MongoDB model for your data
// // Define your data schema here
const dataSchema = new mongoose.Schema({
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
  });

  const Data = mongoose.model("Data", dataSchema)
  module.exports = Data;
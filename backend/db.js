const mongoose = require("mongoose");
const mongoURI = "mongodb+srv://sikandar:sikandar@cluster0.y7err7s.mongodb.net/iNoteBook?retryWrites=true&w=majority"
const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

module.exports = connectToMongo;

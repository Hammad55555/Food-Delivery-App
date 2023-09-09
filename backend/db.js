const mongoose = require("mongoose");
const mongoURI = 'mongodb+srv://princekk5555:Ham01mad3524@cluster0.tw9sf5p.mongodb.net/gofood?retryWrites=true&w=majority';

let cachedData = {
  food_items: [],
  food_category: []
};

async function fetchData() {
  try {
    const fetched_data = mongoose.connection.db.collection("foods_items"); 
    cachedData.food_items = await fetched_data.find({}).toArray();
   
    const fetched_category_data = mongoose.connection.db.collection("food_category"); 
    cachedData.food_category = await fetched_category_data.find({}).toArray();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    
    console.log('Connected to MongoDB');

    await fetchData(); // Wait for fetchData to complete
  } catch (error) {
    console.error('Error connecting to MongoDB: ', error);
  }
};

const getCachedData = () => cachedData;

module.exports = { connectDB, getCachedData };



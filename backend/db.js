const mongoose = require("mongoose");


const mongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true, // Add this option for the latest MongoDB driver
    });
    console.log("Connected to MongoDB");
    const fetched_food = mongoose.connection.db.collection("food_data");

    const data = await fetched_food.find({}).toArray();
    if (data) {
      global.food_items = data;

    }
    const fetched_categories =
      mongoose.connection.db.collection("food_categories");
    const categoryData = await fetched_categories.find({}).toArray();
    if (categoryData) {
      global.food_categories = categoryData;
    }

    
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};

module.exports = mongoDB;

require("dotenv").config();
const mongoose = require("mongoose");
const Products = require("../src/models/Products");
const { mockProductData } = require("./products");

const populateDbWithMockData = async (connectionString) => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(connectionString);
    console.log(`MongoDB connected: ${conn.connection.host}`);

    await Products.deleteMany();

    const productRes = await Products.create(mockProductData);
    console.log(mockProductData, productRes);
    console.log("Database successfully populated with test data");
  } catch (error) {
    console.error(error);
  } finally {
    process.exit(0);
  }
};

populateDbWithMockData(process.env.MONGO_URI);

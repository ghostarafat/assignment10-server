const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB URI & Client
const uri =
  process.env.MONGODB_URI ||
  "mongodb+srv://assignment10dbUser:lcFmjS5ESODyHTnx@cluster0.fo0mn81.mongodb.net/?appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    const db = client.db("smart_db");

    // Collections
    const listingsCollection = db.collection("listings");
    const ordersCollection = db.collection("orders");

    

run().catch(console.dir);

// Root route
app.get("/", (req, res) => {
  res.send("Assignment10 server is running");
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

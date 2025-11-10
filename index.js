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

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fo0mn81.mongodb.net/?appName=Cluster0`;

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

    // ----------------- LISTINGS CRUD -----------------

    app.get("/listings", async (req, res) => {
      const listings = await listingsCollection.find().toArray();
      res.send(listings);
    });

    app.get("/listings/:id", async (req, res) => {
      const id = req.params.id;
      const listing = await listingsCollection.findOne({
        _id: new ObjectId(id),
      });
      res.send(listing);
    });

    // POST new listing
    app.post("/listings", async (req, res) => {
      const newListing = req.body;
      const result = await listingsCollection.insertOne(newListing);
      res.send(result);
    });

    // PUT update listing
    app.put("/listings/:id", async (req, res) => {
      const id = req.params.id;
      const updatedData = { $set: req.body };
      const result = await listingsCollection.updateOne(
        { _id: new ObjectId(id) },
        updatedData
      );
      res.send(result);
    });

    // DELETE listing
    app.delete("/listings/:id", async (req, res) => {
      const id = req.params.id;
      const result = await listingsCollection.deleteOne({
        _id: new ObjectId(id),
      });
      res.send(result);
    });

    // -----------------  CRUD -----------------

    app.get("/orders", async (req, res) => {
      const orders = await ordersCollection.find().toArray();
      res.send(orders);
    });

    app.get("/orders/user/:email", async (req, res) => {
      const email = req.params.email;
      const orders = await ordersCollection.find({ email }).toArray();
      res.send(orders);
    });

    // POST new order
    app.post("/orders", async (req, res) => {
      const newOrder = req.body;
      const result = await ordersCollection.insertOne(newOrder);
      res.send(result);
    });

    // PUT update order
    app.put("/orders/:id", async (req, res) => {
      const id = req.params.id;
      const updatedData = { $set: req.body };
      const result = await ordersCollection.updateOne(
        { _id: new ObjectId(id) },
        updatedData
      );
      res.send(result);
    });

    // DELETE order
    app.delete("/orders/:id", async (req, res) => {
      const id = req.params.id;
      const result = await ordersCollection.deleteOne({
        _id: new ObjectId(id),
      });
      res.send(result);
    });

    // Ping MongoDB
    await client.db("admin").command({ ping: 1 });
    console.log("MongoDB connected successfully!");
  } finally {
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Assignment10 server is running");
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

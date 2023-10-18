const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection URI
const uri =
  "mongodb+srv://brandShop:hlztDDmDc5TH7EhI@cluster0.fcmyfrv.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    const brandCollection = client.db("brandDB").collection("brands");
    const productCollection = client.db("brandDB").collection("products");

    // POST request to add a brand
    app.post("/brand", async (req, res) => {
      const user = req.body;
      const result = await brandCollection.insertOne(user);
      res.send(result);
    });

    // GET request to retrieve a list of brands
    app.get("/brand", async (req, res) => {
      const cursor = brandCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // GET request to retrieve products for a specific brand by brand ID
    app.get("/brand/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const brandNameFromData = await brandCollection.findOne(filter);
      const result = await productCollection
        .find({ brandName: brandNameFromData.brandName })
        .toArray();
      res.send(result);
    });

    // POST request to add a product
    app.post("/product", async (req, res) => {
      const user = req.body;
      const result = await productCollection.insertOne(user);
      res.send(result);
    });

    // GET request to retrieve a list of products
    app.get("/product", async (req, res) => {
      const cursor = productCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/product/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const products = await productCollection.findOne(query);
      console.log(products);
      res.send(products);
    });

    app.put("/product/:id", async (req, res) => {
      const id = req.params.id;
      const data = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedProduct = {
        $set: {
          name: data.name,
          brandName: data.brandName,
          type: data.type,
          price: data.price,
          rating: data.rating,
          details: data.details,
          photo: data.photo,
        },
      };
      const result = await productCollection.updateOne(
        filter,
        updatedProduct,
        options
      );
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensure that the client will close when you finish/error
    // await client.close();
  }
}

run().catch(console.error);

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

// const express = require("express");
// const cors = require("cors");
// const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
// require("dotenv").config();
// const app = express();
// const port = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // MongoDB connection URI
// const uri = "mongodb+srv://brandShop:hlztDDmDc5TH7EhI@cluster0.fcmyfrv.mongodb.net/?retryWrites=true&w=majority";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//     serverApi: {
//       version: ServerApiVersion.v1,
//       strict: true,
//       deprecationErrors: true,
//     },
//   });

// async function run() {
//   try {
//     // Connect the client to the server (optional starting in v4.7)
//     await client.connect();

//     const brandCollection = client.db("brandDB").collection("brands");
//     const productCollection = client.db("brandDB").collection("products");

//     // POST request to add a brand
//     app.post("/brand", async (req, res) => {
//       const user = req.body;
//       const result = await brandCollection.insertOne(user);
//       res.send(result);
//     });

//     // GET request to retrieve a list of brands
//     app.get("/brand", async (req, res) => {
//       const cursor = brandCollection.find();
//       const result = await cursor.toArray();
//       res.send(result);
//     });

//     app.get("/brand/:id", async (req, res) => {
//       const id = req.params.id;
//       const filter = { _id: new ObjectId(id) };
//       const brandNameFromData = await brandCollection.findOne(filter);
//       const result = await productCollection
//         .find({ brandName: brandNameFromData.brandName })
//         .toArray();
//       res.send(result);
//     });

//     // POST request to add a product
//     app.post("/product", async (req, res) => {
//       const user = req.body;
//       const result = await productCollection.insertOne(user);
//       res.send(result);
//     });

//     // GET request to retrieve a list of products
//     app.get("/product", async (req, res) => {
//       const cursor = productCollection.find();
//       const result = await cursor.toArray();
//       res.send(result);
//     });

//     app.get("/product/:id", async (req, res) => {
//       const id = req.params.id;
//       const query = { _id: new ObjectId(id) };
//       const products = await productCollection.findOne(query);
//       res.send(products);
//     });

//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensure that the client will close when you finish/error
//     // await client.close();
//   }
// }

// run().catch(console.error);

// app.listen(port, () => {
//   console.log(`App is running on port ${port}`);
// });

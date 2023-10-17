const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json());

//brandShop
//hlztDDmDc5TH7EhI



const uri = "mongodb+srv://brandShop:hlztDDmDc5TH7EhI@cluster0.fcmyfrv.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const brandCollection = client.db("brandDB").collection("brands");
    const productCollection = client.db("brandDB").collection("products");
     //for the brands data post
    app.post('/brand', async(req,res)=>{
        const user = req.body;
        console.log(user);
        const result = await brandCollection.insertOne(user);
        res.send(result);
    })
      //for the brands data get
    app.get('/brand', async(req,res)=>{
      const cursor = brandCollection.find();
      const result = await cursor.toArray();
      res.send(result);
  })

  // this for the product post get put sections
   //for the product data post
  app.post('/product', async(req,res)=>{
    const user = req.body;
    console.log(user);
    const result = await productCollection.insertOne(user);
    res.send(result);
})

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get("/", (req, res) => {
  res.send("Crud is running ....");
});

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
// const jwt = require('jsonwebtoken')
// const cookieParser = require('cookie-parser')
// require("dotenv").config();


// =======middlewares======
// app.use(cookieParser())
app.use(express.json());
app.use(cors({
  origin:[
    'http://localhost:5173',
],
  credentials: true
}))


// ass11
// Mha1381mHa


const uri = "mongodb+srv://ass11:Mha1381mHa@cluster0.virnuu4.mongodb.net/?retryWrites=true&w=majority";

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
    // await client.connect();
    // Send a ping to confirm a successful connection

    const servicesCollection = client.db("services11DB").collection("services");
    const cartCollection = client.db("services11DB").collection("cart");

    // ---- services collcetion crud operation-----
    app.get("/services", async (req, res) => {
        const result = await servicesCollection.find().toArray()
        res.send(result);
      });
    
  app.get("/services/:id",  async (req, res)=> {
    const id = req.params.id
    // console.log(id)
    const query = {_id: new ObjectId(id)}
    const result = await servicesCollection.findOne(query)
    res.send(result)
  })
  app.post("/services", async (req, res) => {
    const newProduct = req.body;
    console.log(newProduct)
    const result = await servicesCollection.insertOne(newProduct);
    res.send(result);
  });

   // ---- cart collcetion crud operation-----
   app.post('/cart', async(req, res)=>{
    const card = req.body;
    console.log(card)
    const result = await cartCollection.insertOne(card);
    res.send(result)
  })






    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




// -----------------------------------------------------------------------------------
app.get("/", (req, res) => {
    res.send("hello server asflkjf");
  });
  
  app.listen(port, () => {
    console.log(`running port on: ${port} `);
  });

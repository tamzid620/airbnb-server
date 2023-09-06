const express = require('express')
const app = express()
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const cors = require('cors')
const port = process.env.PORT || 5000;

// middleware ---
app.use(cors());
app.use(express.json());

// ))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
// mongofb connect section ------------------

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qtemx5j.mongodb.net/?retryWrites=true&w=majority`;

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

// collection section ----------------------------------------------------------------> 
const roomsCollection = client.db('AirBnb').collection('rooms');

// room.get -----------------------
app.get('/rooms', async (req, res) =>{
    const result = await roomsCollection.find().toArray();
    res.send(result);
    });



    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// ))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))

// app listen-----------------------
app.get('/', (req, res) => {
    res.send('hello world')
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
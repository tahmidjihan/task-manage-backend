const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');

require('dotenv').config();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

// const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tfnar.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    app.put('/users', async (req, res) => {
      const usersCollection = client.db('TaskManage').collection('User');
      const user = req.body;
      const query = { email: user.email };
      const options = { upsert: true };
      const result = await usersCollection.updateOne(
        query,
        { $set: user },
        options
      );
      res.send(result);
    });
    app.put('/PUT/tasks', async (req, res) => {
      const tasksCollection = client.db('TaskManage').collection('tasks');
      const task = req.body;
      const query = { email: user.email };
      const options = { upsert: true };
      const result = await tasksCollection.updateOne(
        query,
        { $set: task },
        options
      );
      res.send(result);
    });
    app.post('/POST/tasks', async (req, res) => {
      const tasksCollection = client.db('TaskManage').collection('tasks');
      const task = req.body;
      const result = await tasksCollection.insertOne(task);
      console.log(task);
      res.send(result);
    });

    await client.db('admin').command({ ping: 1 });
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

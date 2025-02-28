import express from 'express';
import { MongoClient, ServerApiVersion  } from "mongodb";
import cors from 'cors';
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//Middleware
app.use(cros());
app.use(express.json());


//MondoDB Connection
const uri = process.env.MONGODB_URI
const client = new MongoClient(uri , {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    }
)

//Database and collection variables
let database;
let articlesCollection;

async function connectToMongoDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB!");

        database = client.db("scholarBase");
        articlesCollection = database.collection("articles");


        //Send a ping to confirm successful connection
        await database.command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connect to MongoDB!");
    } catch (error) {
        console.error("Error connection to MongoDB:", error)
        process.exit(1);
    }
}

//Search API endpoint
app.get('/api/search', async (req, res) => {
    try {
        const searchTerm = req.query.term;

        if(!searchTerm) {
            return res.status(400).json({ message: "Search term is required" })
        }

        //Create a text search query
        const query = {
            $text: { $search: searchTerm }
        };

        const results = await articlesCollection.find(query).limit(20).toArray();
        res.json(results);
    } catch(error) {
        console.log("Error searching articles:", error);
        res.status(500).json({ message: "Error searching articles" })
    }
});

//Start server
async function startServer() {
    await connectToMongoDB();

    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}

//Handle graceful shutdown
process.on('SIGINT', async () => {
    await client.close();
    console.log('MongoDB connection closed');
    process.exit(0);
});

startServer().catch(console.error);
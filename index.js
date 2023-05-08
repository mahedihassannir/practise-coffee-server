const express = require("express")

const app = express()

const Port = process.env.PORT || 5000

const cors = require('cors')

// middlewire

app.use(cors())

app.use(express.json())

// env config 

require('dotenv').config()

// env config ends 



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_EMAIL}:${process.env.DB_PASS}@cluster0.s7onimz.mongodb.net/?retryWrites=true&w=majority`;

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


        const database = client.db("DBcoffee");

        const Data = database.collection("Db");


        app.delete("/coffee/:id", async (req, res) => {

            let id = req.params.id

            let query = { _id: new ObjectId(id) }

            let result = await Data.deleteOne(query)

            res.send(result)


        })


        app.get('/coffee', async (req, res) => {

            const coursor = Data.find()

            const result = await coursor.toArray()

            res.send(result)

            console.log(result);


        })

        app.post('/coffee', async (req, res) => {

            let addCoffee = req.body

            console.log(addCoffee);

            const result = await Data.insertOne(addCoffee);

            res.send(result)




        })


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error

    }
}
run().catch(console.dir);




app.get("/", (req, res) => {

    res.send("app server is running")

})

app.listen(Port, () => {
    console.log(`server is running on port, ${Port}`);
})





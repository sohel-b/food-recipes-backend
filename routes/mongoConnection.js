import { MongoClient } from 'mongodb';
const uri = ""

const client = new MongoClient(uri)

const getDataFromMongo = async () => {
  try {
    await client.connect();
    const db = client.db("recipeDB");
    const collection = db.collection("recipes");
    const data = await collection.find({}).toArray(); // gets all documents in the collection
    console.log(data)
    return data
} catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}


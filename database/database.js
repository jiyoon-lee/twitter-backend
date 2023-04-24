import { MongoClient, ServerApiVersion } from "mongodb";
const uri =
  "mongodb+srv://dwitter:.5B29Czh5UvtEsw@cluster0.4zc9e5w.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
export async function connectDB() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    return client.db("sample_analytics");
  } catch (e) {
    console.dir(e);
  }
}

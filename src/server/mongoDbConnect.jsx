

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGODB_URI;

let db_connection;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

try {
  await client.connect();
  db_connection = client.db("object-creation-data");
  console.log("connection made")
}
catch(e) {
  await client.close();
  throw new Error("Connection cannot be made!");
}
export default db_connection
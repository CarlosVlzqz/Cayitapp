const { MongoClient, ObjectId } = require('mongodb');

// Database URL (replace 'your_database_url' with your actual MongoDB connection URL)
const dbUrl = 'my_env_variable';

// Database name
const dbName = 'my_env_variable';

// MongoDB client instance
let client;

// Connect to the database
async function connectDb() {
  try {
    client = await MongoClient.connect(dbUrl, { useUnifiedTopology: true });
    console.log('Database connected successfully');
  } catch (err) {
    console.error('Database connection error:', err);
    throw err;
  }
}

// Get the database instance
function getDb() {
  return client.db(dbName);
}

// Close the database connection
async function closeDb() {
  try {
    await client.close();
    console.log('Database connection closed');
  } catch (err) {
    console.error('Error closing database connection:', err);
    throw err;
  }
}

// Common MongoDB operations

// Insert a document into a collection
const insertOne = async (collectionName, document) => {
  const db = getDb();
  const result = await db.collection(collectionName).insertOne(document);
  return result;
};

// Find documents that match a query in a collection
const findMany = async (collectionName, query) => {
  const db = getDb();
  const cursor = await db.collection(collectionName).find(query);
  const documents = await cursor.toArray();
  return documents;
};

// Find a single document by its ID in a collection
const findById = async (collectionName, id) => {
  const db = getDb();
  const document = await db.collection(collectionName).findOne({ _id: ObjectId(id) });
  return document;
};

// Update a document in a collection
const updateOne = async (collectionName, id, update) => {
  const db = getDb();
  const result = await db.collection(collectionName).updateOne({ _id: ObjectId(id) }, { $set: update });
  return result;
};

// Delete a document from a collection
const deleteOne = async (collectionName, id) => {
  const db = getDb();
  const result = await db.collection(collectionName).deleteOne({ _id: ObjectId(id) });
  return result;
};

module.exports = {
  connectDb,
  getDb,
  closeDb,
  insertOne,
  findMany,
  findById,
  updateOne,
  deleteOne,
};

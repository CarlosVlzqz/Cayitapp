import { MongoClient, ObjectId } from 'mongodb';

// Database URL (replace 'your_database_url' with your actual MongoDB connection URL)
const dbUrl = 'my_env_variable';

// Database name
const dbName = 'my_env_variable';

let client;
let dbInstance;

// Connect to the database
export const connectDb = async () => {
  try {
    client = await MongoClient.connect(dbUrl, { useUnifiedTopology: true });
    dbInstance = client.db(dbName);
    console.log('Database connected successfully');
  } catch (err) {
    console.error('Database connection error:', err);
    throw err;
  }
};

// Get the database instance
export const getDb = () => dbInstance;

// Close the database connection
export const closeDb = async () => {
  try {
    await client.close();
    console.log('Database connection closed');
  } catch (err) {
    console.error('Error closing database connection:', err);
    throw err;
  }
};

// Common MongoDB operations
const getCollection = (collectionName) => dbInstance.collection(collectionName);

export const insertOne = async (collectionName, document) => {
  const collection = getCollection(collectionName);
  const result = await collection.insertOne(document);
  return result;
};

export const findMany = async (collectionName, query) => {
  const collection = getCollection(collectionName);
  const cursor = await collection.find(query);
  const documents = await cursor.toArray();
  return documents;
};

export const findById = async (collectionName, id) => {
  const collection = getCollection(collectionName);
  const document = await collection.findOne({ _id: ObjectId(id) });
  return document;
};

export const updateOne = async (collectionName, id, update) => {
  const collection = getCollection(collectionName);
  const result = await collection.updateOne({ _id: ObjectId(id) }, { $set: update });
  return result;
};

export const deleteOne = async (collectionName, id) => {
  const collection = getCollection(collectionName);
  const result = await collection.deleteOne({ _id: ObjectId(id) });
  return result;
};

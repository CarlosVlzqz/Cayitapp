import express from 'express';
import { connectDb, closeDb } from './config/db.js';
import itemRoutes from './routes/itemRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import storeRoutes from './routes/storeRoutes.js';
import purchaseRoutes from './routes/purchaseRoutes.js';

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse incoming JSON data
app.use(express.json());

// Connect to the database
connectDb()
  .then(() => {
    // API routes
    app.use('/api/items', itemRoutes);
    // app.use('/api/categories', categoryRoutes);
    // app.use('/api/stores', storeRoutes);
    // app.use('/api/purchases', purchaseRoutes);

    // Error handling middleware
    app.use((err, req, res, next) => {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    });

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });

// Gracefully close the database connection on application exit
process.on('SIGINT', async () => {
  try {
    await closeDb();
    console.log('Database connection closed before exiting.');
    process.exit(0);
  } catch (err) {
    console.error('Error closing database connection:', err);
    process.exit(1);
  }
});

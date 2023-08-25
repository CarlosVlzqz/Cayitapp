import express from 'express';
import itemRoutes from '../v1/routes/itemRoutes.js';
import categoryRoutes from '../v1/routes/categoryRoutes.js';
import storeRoutes from '../v1/routes/storeRoutes.js';
import purchaseRoutes from '../v1/routes/purchaseRoutes.js';

const router = express.Router();

router.use('/items', itemRoutes);
// router.use('/categories', categoryRoutes);
// router.use('/stores', storeRoutes);
// router.use('/purchases', purchaseRoutes);

export default router;

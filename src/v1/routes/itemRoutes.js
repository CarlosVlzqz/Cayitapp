import express from 'express';
import validateSchema from '../../middleware/schemaValidation.js';
import { itemsSchema } from '../schemas/requests/items/create';

import {
  createNewItem,
  getAllItemsHandler,
  getItemByIdHandler,
  updateItemHandler,
  deleteItemHandler,
} from '../controllers/itemController.js';

const router = express.Router();

router.post('/', validateSchema(itemsSchema), createNewItem);
router.get('/', getAllItemsHandler);
router.get('/:itemId', getItemByIdHandler);
router.put('/:itemId', updateItemHandler);
router.delete('/:itemId', deleteItemHandler);

export default router;

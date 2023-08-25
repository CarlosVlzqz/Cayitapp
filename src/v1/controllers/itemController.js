import {
  insertOne as createItem,
  findMany as getAllItems,
  findById as getItemById,
  updateOne as updateItem,
  deleteOne as deleteItem,
} from '../../config/db.js';

import { itemSchema } from '../../v1/schemas/items';
import { validateSchema } from '../../utils/schemaValidation';

export const createNewItem = async (req, res) => {
  try {
    await validateSchema(itemSchema, req.body);
    const newItem = await createItem('items', req.body);
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ err });
  }
};

export const getAllItemsHandler = async (req, res) => {
  try {
    const items = await getAllItems('items', {});
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getItemByIdHandler = async (req, res) => {
  try {
    const item = await getItemById('items', req.params.itemId);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateItemHandler = async (req, res) => {
  try {
    const updatedItem = await updateItem('items', req.params.itemId, req.body);
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteItemHandler = async (req, res) => {
  try {
    const deletedItem = await deleteItem('items', req.params.itemId);
    if (!deletedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

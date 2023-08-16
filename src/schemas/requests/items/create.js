export const itemsSchema = {
  type: 'object',
  properties: {
    item_name: { type: 'string' },
    category: { type: 'string' },
    description: { type: 'string' },
    quantity: { type: 'integer', minimum: 0 },
    purchase: {
      type: 'object',
      properties: {
        price: { type: 'number' },
        currency: { type: 'string' },
        exchange_rate: { type: 'number' },
      },
      required: ['price', 'currency'],
    },
    resale_price: { type: 'number', minimum: 0 },
    supplier: { type: 'string' },
  },
  required: ['item_name', 'category', 'purchase'],
  additionalProperties: false,
};

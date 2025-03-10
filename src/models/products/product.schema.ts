import { z } from 'zod';

// A Product off 100 kg of rice costs 1000 INR
// Rice will have 3 kg wastage per 100 kg
// Corn will have 2 kg wastage per 76 kg
// Create a schema for the product

const WastageSchema = z
  .object({
    amount: z.number().min(0).optional(), // wastage amount in kg
    referenceWeight: z.number().positive(), // reference weight in kg
  })
  .describe('wastage configuration');

const PriceSchema = z
  .object({
    amount: z.number().positive().optional(), // price amount
    referenceWeight: z.number().positive(), // reference weight in kg
  })
  .describe('price configuration');

const ProductSchema = z
  .object({
    productName: z.string(),
    standardBagWeight: z.number().positive(),
    price: PriceSchema,
    wastage: WastageSchema,
  })
  .describe('Product configuration');

export type Product = z.infer<typeof ProductSchema>;

export { ProductSchema };

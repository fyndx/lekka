import { z } from 'zod';

// A Product off 100 kg of rice costs 1000 INR
// Rice will have 3 kg wastage per 100 kg
// Corn will have 2 kg wastage per 76 kg
// Create a schema for the product

const ProductSchema = z.object({
  name: z.string(),
  bagWeight: z.coerce.number().int().positive(),
  price: z.object({
    amount: z.coerce.number().int().nonnegative().optional(),
    weight: z.coerce.number().int().positive(),
  }),
  wastage: z.object({
    // Examples:
    // 3 kgs wastage for 100 kgs
    // 1 kg wastage for 76 kgs
    amount: z.coerce.number().positive(),
    referenceWeight: z.coerce.number().positive(),
  }),
  fullBags: z.coerce.number().int().positive(),
  looseWeight: z.coerce.number().int().positive(),
});

export type Product = z.infer<typeof ProductSchema>;

export { ProductSchema };

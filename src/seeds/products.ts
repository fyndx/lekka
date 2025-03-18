import type { Product } from '@/models/products/product.schema';

export const PRODUCTS = [
  {
    name: 'Rice',
    bagWeight: 100,
    price: {
      amount: 0, // Set a positive integer value
      weight: 100, // Changed from referenceWeight to weight
    },
    wastage: {
      amount: 3,
      referenceWeight: 100,
    },
  },
  {
    name: 'White Sesame Seeds',
    bagWeight: 75,
    price: {
      amount: 0, // Set a positive integer value
      weight: 100, // Changed from referenceWeight to weight
    },
    wastage: {
      amount: 3,
      referenceWeight: 100,
    },
  },
] as Product[];

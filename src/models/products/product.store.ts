import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { MMKVStorage } from '@/lib/storage';

import type { Product } from './product.schema';

interface ProductsStore {
  products: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (product: Product) => void;
  getProducts: () => Product[];
}

export const useProducts = create<ProductsStore>()(
  persist(
    (set, get) => ({
      products: [],
      addProduct: (product) =>
        set((state) => ({ products: [...state.products, product] })),
      removeProduct: (product) =>
        set((state) => ({
          products: state.products.filter((p) => p !== product),
        })),
      getProducts: () => get().products,
    }),
    {
      name: 'products',
      storage: MMKVStorage,
    }
  )
);

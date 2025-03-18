import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { MMKVStorage } from '@/lib/storage';

import type { Product } from './product.schema';

interface ProductsStore {
  products: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (productName: string) => void;
  getProducts: () => (Product & { label: string; value: string })[];
  setProducts: (products: Product[]) => void;
  getProductByName: (productName: string) => Product | undefined;
  updateProduct: (
    productName: string,
    updatedProduct: Partial<Product>
  ) => void;
}

export const useProducts = create<ProductsStore>()(
  persist(
    (set, get) => ({
      products: [],
      addProduct: (product) =>
        set((state) => ({ products: [...state.products, product] })),
      setProducts: (products) => set({ products }),
      removeProduct: (productName) =>
        set((state) => ({
          products: state.products.filter((p) => p.name !== productName),
        })),
      getProducts: () =>
        get().products.map((p) => ({
          ...p,
          label: p.name,
          value: p.name,
        })),
      getProductByName: (productName) =>
        get().products.find((p) => p.name === productName),
      updateProduct: (productName, updatedProduct) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.name === productName ? { ...p, ...updatedProduct } : p
          ),
        })),
    }),
    {
      name: 'products',
      storage: MMKVStorage,
    }
  )
);

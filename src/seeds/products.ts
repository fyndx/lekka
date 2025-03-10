export const PRODUCTS = [
  {
    productName: 'Rice',
    standardBagWeight: 100,
    price: {
      amount: undefined, // Default to undefined as it's now optional
      referenceWeight: 100,
    },
    wastage: {
      amount: 3,
      referenceWeight: 100,
    },
  },
  {
    productName: 'White Sesame Seeds',
    standardBagWeight: 75,
    price: {
      amount: undefined,
      referenceWeight: 100,
    },
    wastage: {
      amount: 3,
      referenceWeight: 100,
    },
  },
];

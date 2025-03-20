/* eslint-disable max-lines-per-function */
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack, useLocalSearchParams, useNavigation } from 'expo-router';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { showMessage } from 'react-native-flash-message';

import {
  Button,
  ControlledInput,
  FocusAwareStatusBar,
  Text,
  View,
} from '@/components/ui';
import { type Product, ProductSchema } from '@/models/products/product.schema';
import { useProducts } from '@/models/products/product.store';

export default function AddProduct() {
  const { addProduct, getProductByName, updateProduct } = useProducts();
  const { goBack } = useNavigation();
  const { name } = useLocalSearchParams();

  const isEditingProduct = React.useRef(false);

  console.log('Local params:', name);

  const { control, handleSubmit, reset } = useForm<Product>({
    resolver: zodResolver(
      ProductSchema.partial({ fullBags: true, looseWeight: true, price: true })
    ),
  });

  if (name && typeof name === 'string') {
    const existingProduct = getProductByName(name);
    console.log('Existing product:', existingProduct);
    if (existingProduct) {
      // Create a new object without the price property instead of using delete
      reset(existingProduct);
      isEditingProduct.current = true;
    }
  }

  const onSubmit = (data: Product) => {
    console.log('Form data:', data);
    if (isEditingProduct.current) {
      console.log('Updating product:', data);
      updateProduct(name as string, data);
      reset();
      showMessage({
        message: 'Product updated successfully!',
        type: 'success',
      });
      goBack();
      return;
    }

    const existingProduct = getProductByName(data.name);
    if (existingProduct) {
      console.log('Product already exists');
      showMessage({
        message: 'Product already exists!',
        type: 'danger',
      });
      return;
    }
    addProduct(data);
    reset();

    showMessage({
      message: 'Product added successfully!',
      type: 'success',
    });
    goBack();
  };

  const onError = (errors: any) => {
    console.log('Form errors:', errors);
    showMessage({
      message: 'Please fill all required fields correctly.',
      type: 'danger',
    });
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: isEditingProduct.current ? 'Edit Product' : 'Add Product',
          headerBackTitle: 'Products',
        }}
      />
      <View className="flex-1 p-4">
        <FocusAwareStatusBar />
        <ControlledInput
          control={control}
          name="name"
          label="Product Name"
          placeholder="Enter product name"
        />

        <ControlledInput
          control={control}
          name="bagWeight"
          label="Bag Weight (kg)"
          placeholder="Enter bag weight"
          keyboardType="numeric"
        />

        <View className="mt-2">
          <Text className="mb-1 font-medium">Price Configuration</Text>
          <View className="flex-row gap-2">
            <View className="flex-1">
              <ControlledInput
                control={control}
                name="price.amount"
                label="Price Amount"
                placeholder="Enter price"
                keyboardType="numeric"
              />
            </View>
            <View className="flex-1">
              <ControlledInput
                control={control}
                name="price.weight"
                label="For Weight (kg)"
                placeholder="Enter weight"
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>

        <View className="mt-2">
          <Text className="mb-1 font-medium">Wastage Configuration</Text>
          <View className="flex-row gap-2">
            <View className="flex-1">
              <ControlledInput
                control={control}
                name="wastage.amount"
                label="Wastage (kg)"
                placeholder="Enter wastage"
                keyboardType="numeric"
              />
            </View>
            <View className="flex-1">
              <ControlledInput
                control={control}
                name="wastage.referenceWeight"
                label="For Weight (kg)"
                placeholder="Enter weight"
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>

        <View className="mt-4 flex-row gap-2">
          <Button
            onPress={handleSubmit(onSubmit, onError)}
            label={isEditingProduct.current ? 'Update Product' : 'Add Product'}
            variant="default"
            className="flex-1"
          />
        </View>
      </View>
    </>
  );
}

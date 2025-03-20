/* eslint-disable max-lines-per-function */
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import {
  Button,
  ControlledInput,
  ControlledSelect,
  FocusAwareStatusBar,
  Text,
  View,
} from '@/components/ui';
import { type Product, ProductSchema } from '@/models/products/product.schema';
import { useProducts } from '@/models/products/product.store';

export default function Home() {
  const { getProducts, getProductByName } = useProducts();
  const products = getProducts();

  const { handleSubmit, control, watch, reset, setValue } = useForm<Product>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: '',
      bagWeight: undefined,
      price: { amount: undefined, weight: undefined },
      fullBags: undefined,
      looseWeight: undefined,
      wastage: { amount: undefined, referenceWeight: undefined },
    },
  });

  const formValues = useWatch({
    control,
  });

  useEffect(() => {
    // Reset result when any field changes
    setResult('');
  }, [formValues]);

  const selectedProduct = watch('name');

  // Load product configuration when product selection changes
  useEffect(() => {
    if (selectedProduct) {
      const productConfig = getProductByName(selectedProduct);
      if (productConfig) {
        reset(
          {
            price: { amount: undefined },
            wastage: { referenceWeight: undefined },
            fullBags: undefined,
            looseWeight: undefined,
          },
          {
            keepDefaultValues: true,
          }
        );
        setValue('name', productConfig.name);
        setValue('bagWeight', productConfig.bagWeight);
        setValue('price.weight', productConfig.price.weight);
        setValue('wastage.amount', productConfig.wastage.amount);
        setValue(
          'wastage.referenceWeight',
          productConfig.wastage.referenceWeight
        );
      }
    }
  }, [selectedProduct, getProductByName, setValue, reset]);

  const [result, setResult] = useState<{
    totalAmount?: number;
    wastage?: number;
    totalWeight?: number;
    netWeight?: number;
  }>({});

  const onSubmit = (data: Product) => {
    const { bagWeight, price, fullBags, looseWeight } = data;
    const totalWeight = bagWeight * fullBags + looseWeight;
    const wastage = Math.round(
      (data.wastage.amount / data.wastage.referenceWeight) * totalWeight
    );

    const netWeight = totalWeight - wastage;
    const pricePerKg = price.amount / price.weight;
    const totalAmount = netWeight * pricePerKg;
    setResult({ totalAmount, wastage, totalWeight, netWeight });
  };

  return (
    <View className="flex-1 p-4">
      <FocusAwareStatusBar />
      {/* TODO: Load Products from MMKV */}
      <ControlledSelect
        control={control}
        name={'name'}
        label={'Product'}
        options={products}
      />
      <ControlledInput
        control={control}
        name={'bagWeight'}
        label={'Bag Weight'}
        placeholder={'Enter the weight of the bag in KG'}
      />
      <View className="flex-row justify-between gap-2">
        <View className="flex-1">
          <ControlledInput
            control={control}
            name={'price.amount'}
            label={'Price'}
            placeholder={'Enter the price'}
          />
        </View>
        <View className="flex-1">
          <ControlledInput
            control={control}
            name={'price.weight'}
            label={'Weight'}
            placeholder={'Enter the Weight'}
          />
        </View>
      </View>
      <View className="flex-row justify-between gap-2">
        <View className="flex-1">
          <ControlledInput
            control={control}
            name={'fullBags'}
            label={'Full Bags'}
            placeholder={'Enter the number of full bags'}
          />
        </View>
        <View className="flex-1">
          <ControlledInput
            control={control}
            name={'looseWeight'}
            label={'Loose Weight'}
            placeholder={'Enter the loose weight'}
          />
        </View>
      </View>
      <View className="flex-row justify-between gap-2">
        <View className="flex-1">
          <ControlledInput
            control={control}
            name={'wastage.amount'}
            label={'Wastage Amount'}
            placeholder={'Enter the amount of wastage'}
          />
        </View>
        <View className="flex-1">
          <ControlledInput
            control={control}
            name={'wastage.referenceWeight'}
            label={'Reference Weight'}
            placeholder={'Enter the Reference Weight'}
          />
        </View>
      </View>
      <Button
        onPress={handleSubmit(onSubmit)}
        label="Submit"
        variant="default"
      />
      {/* Show when result is available */}
      {Object.keys(result).length > 0 && (
        <View className="mt-4 rounded-md bg-gray-100 p-3">
          <Text className="mb-2 text-lg font-bold">Result</Text>
          <View>
            <Text>{`Total Weight: ${result.totalWeight} kg`}</Text>
            <Text>{`Wastage: ${result.wastage} kg`}</Text>
            <Text>{`Net Weight: ${result.netWeight} kg`}</Text>
            <Text>{`Total Amount: ₹${result.totalAmount?.toFixed(2)}`}</Text>
          </View>
        </View>
      )}
    </View>
  );
}

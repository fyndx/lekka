/* eslint-disable max-lines-per-function */
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Button,
  ControlledInput,
  FocusAwareStatusBar,
  Text,
  View,
} from '@/components/ui';
import { useProducts } from '@/models/products/product.store';

// Schema for taking input for calculation
const schema = z.object({
  product: z.string(),
  bagWeight: z.coerce.number().int().positive(),
  price: z.object({
    amount: z.coerce.number().int().positive(),
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
  looseWeight: z.coerce.number().int().nonnegative(),
});

type FormType = z.infer<typeof schema>;

export default function Home() {
  const { getProducts: products } = useProducts();
  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  const [result, setResult] = useState<{
    totalAmount?: number;
    wastage?: number;
    totalWeight?: number;
    netWeight?: number;
  }>({});

  const onSubmit = (data: FormType) => {
    console.log(data);
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
      {/* <ControlledSelect
        control={control}
        name={'product'}
        label={'Product'}
        options={products()}
      /> */}
      <ControlledInput
        control={control}
        name={'product'}
        label={'Product'}
        placeholder={'Enter name of the product'}
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

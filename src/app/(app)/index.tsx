import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Button,
  ControlledInput,
  ControlledSelect,
  FocusAwareStatusBar,
  View,
} from '@/components/ui';
import { useProducts } from '@/models/products/product.store';

// Schema for taking input for calculation
const schema = z.object({
  product: z.string(),
  fullBags: z.number().int().positive(),
  looseWeight: z.number().int().positive(),
  price: z.number().int().positive(),
});

type FormType = z.infer<typeof schema>;

export default function Home() {
  const { getProducts: products } = useProducts();
  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormType) => {
    console.log(data);
  };

  return (
    <View className="flex-1 p-4">
      <FocusAwareStatusBar />
      {/* TODO: Load Products from MMKV */}
      <ControlledSelect
        control={control}
        name={'product'}
        label={'Product'}
        options={products()}
      />
      <ControlledInput
        control={control}
        name={'price'}
        label={'Price'}
        placeholder={'Enter the price'}
      />
      <ControlledInput
        control={control}
        name={'fullBags'}
        label={'Full Bags'}
        placeholder={'Enter the number of full bags'}
      />
      <ControlledInput
        control={control}
        name={'looseWeight'}
        label={'Loose Weight'}
        placeholder={'Enter the loose weight'}
      />
      <Button
        onPress={handleSubmit(onSubmit)}
        label="Submit"
        variant="default"
      />
    </View>
  );
}

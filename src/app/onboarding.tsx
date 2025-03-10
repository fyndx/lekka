import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';

import { Cover } from '@/components/cover';
import {
  Button,
  FocusAwareStatusBar,
  SafeAreaView,
  Text,
  View,
} from '@/components/ui';
import { useIsFirstTime } from '@/lib/hooks';
import { useProducts } from '@/models/products/product.store';
import { PRODUCTS } from '@/seeds/products';

export default function Onboarding() {
  const [_, setIsFirstTime] = useIsFirstTime();
  const { setProducts } = useProducts();
  const router = useRouter();

  useEffect(() => {
    setProducts(PRODUCTS);
  }, [setProducts]);

  return (
    <View className="flex h-full items-center  justify-center">
      <FocusAwareStatusBar />
      <View className="w-full flex-1">
        <Cover />
      </View>
      <View className="justify-end ">
        <Text className="my-3 text-center text-5xl font-bold">Lekka App</Text>
        <Text className="mb-2 text-center text-lg text-gray-600">
          Calculate the price of your products
        </Text>

        <Text className="my-1 pt-6 text-left text-lg">🚀 Simple </Text>
        <Text className="my-1 text-left text-lg">🥷 Powerful</Text>
      </View>
      <SafeAreaView className="mt-6">
        <Button
          label="Let's Get Started "
          onPress={() => {
            setIsFirstTime(false);
            router.replace('/login');
          }}
        />
      </SafeAreaView>
    </View>
  );
}

import { FlashList } from '@shopify/flash-list';
import React from 'react';

import { FocusAwareStatusBar, Text, View } from '@/components/ui';
import { PRODUCTS } from '@/seeds/products';

export default function Products() {
  return (
    <View className="flex-1 ">
      <FocusAwareStatusBar />
      <FlashList
        data={PRODUCTS}
        keyExtractor={(item) => item.productName}
        renderItem={({ item }) => (
          <View className="border-b border-gray-200 p-4">
            <Text className="text-lg font-semibold">{item.productName}</Text>
          </View>
        )}
      />
    </View>
  );
}

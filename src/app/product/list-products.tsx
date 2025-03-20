import { FlashList } from '@shopify/flash-list';
import { Link } from 'expo-router';
import { Pencil, Trash2 } from 'lucide-react-native';
import React from 'react';

import {
  Button,
  FocusAwareStatusBar,
  SafeAreaView,
  Text,
  View,
} from '@/components/ui';
import { useProducts } from '@/models/products/product.store';

export default function Products() {
  const { products, removeProduct } = useProducts();

  return (
    <>
      <FocusAwareStatusBar />
      <View className="flex-1">
        <FlashList
          data={products}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <View className="flex-1 flex-row items-center justify-between p-2">
              <Text className="flex-1 text-lg font-semibold">{item.name}</Text>
              <View className="flex-row gap-2">
                <Link
                  href={{
                    pathname: '/product/add-product',
                    params: { name: item.name },
                  }}
                  asChild
                >
                  <Button size={'sm'} variant={'outline'} className="mt-2">
                    <Pencil size={16} color={'black'} strokeWidth={2} />
                  </Button>
                </Link>

                <Button
                  size={'sm'}
                  variant={'outline'}
                  className="mt-2"
                  onPress={() => {
                    console.log('Remove Product:', item.name);
                    removeProduct(item.name);
                  }}
                >
                  <Trash2 size={16} color={'black'} strokeWidth={2} />
                </Button>
              </View>
            </View>
          )}
          ItemSeparatorComponent={() => (
            <View className="border-b border-gray-200" />
          )}
          estimatedItemSize={61}
        />
      </View>
      {/* Add FAB Produce Button */}
      <SafeAreaView className="px-4">
        <Link
          href={{
            pathname: '/product/add-product',
            params: { id: '' },
          }}
          asChild
        >
          <Button label={'Create New Product'} size={'lg'} />
        </Link>
      </SafeAreaView>
    </>
  );
}

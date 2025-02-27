import React from 'react';

import { FocusAwareStatusBar, Text, View } from '@/components/ui';

export default function Home() {
  return (
    <View className="flex-1 ">
      <FocusAwareStatusBar />
      <Text className="text-2xl font-bold">Home</Text>
    </View>
  );
}

import * as React from 'react';
import { Text } from 'react-native';

import { FocusAwareStatusBar, SafeAreaView, ScrollView } from '@/components/ui';

export default function History() {
  return (
    <>
      <FocusAwareStatusBar />
      <ScrollView className="px-4">
        <SafeAreaView className="flex-1">
          <Text className="text-2xl font-bold">History</Text>
        </SafeAreaView>
      </ScrollView>
    </>
  );
}

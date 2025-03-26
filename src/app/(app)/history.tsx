import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';

import {
  FocusAwareStatusBar,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from '@/components/ui';
import type { History as HistoryRecord } from '@/models/history/schema';
import { useHistory } from '@/models/history/store';
import { convertUTCToLocalTime } from '@/utils/date-time';

export default function History() {
  const { getHistoryRecords } = useHistory();
  const [records, setRecords] = useState<HistoryRecord[]>([]);

  useEffect(() => {
    const loadRecords = async () => {
      const historyRecords = await getHistoryRecords();
      setRecords(historyRecords);
    };

    loadRecords();
  }, [getHistoryRecords]);

  return (
    <>
      <FocusAwareStatusBar />
      <ScrollView className="flex-1 px-4">
        <SafeAreaView>
          <Text className="mb-4 text-2xl font-bold">History</Text>
          {records.map((record) => (
            <View
              key={record.id}
              className="mb-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
            >
              <Text className="mb-2 text-lg font-semibold">
                {record.productName}
              </Text>

              {/* Input Details */}
              <View className="mb-3 space-y-1">
                <Text className="font-medium text-gray-900">Input Details</Text>
                <Text>{`Bag Weight: ${record.bagWeight} kg`}</Text>
                <Text>{`Price: ₹${record.priceAmount} for ${record.priceWeight} kg`}</Text>
                <Text>{`Full Bags: ${record.fullBags}`}</Text>
                <Text>{`Loose Weight: ${record.looseWeight} kg`}</Text>
                <Text>{`Wastage: ${record.wastageAmount} kg per ${record.wastageReferenceWeight} kg`}</Text>
              </View>

              {/* Calculation Results */}
              <View className="space-y-1">
                <Text className="font-medium text-gray-900">Results</Text>
                <Text>{`Total Weight: ${record.totalWeight} kg`}</Text>
                <Text>{`Wastage: ${record.wastage} kg`}</Text>
                <Text>{`Net Weight: ${record.netWeight} kg`}</Text>
                <Text>{`Total Amount: ₹${record.totalAmount.toFixed(2)}`}</Text>
                <Text className="mt-2 text-sm text-gray-500">
                  {format(convertUTCToLocalTime(record.createdAt), 'PPpp')}
                </Text>
              </View>
            </View>
          ))}
        </SafeAreaView>
      </ScrollView>
    </>
  );
}

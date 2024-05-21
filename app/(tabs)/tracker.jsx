import { View, Text, FlatList, RefreshControl } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';

const Tracker = () => {
  return (
    <GestureHandlerRootView>
    <SafeAreaView className="bg-primary h-full">
    <FlatList
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6">
            <View className="flex justify-between items-start flex-row mb-6">
              <View>
                <Text className="text-2xl font-pbold text-white">
                  Workout Tracker
                </Text>
              </View>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  </GestureHandlerRootView>
  )
}

export default Tracker
import { View, Text, FlatList, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Workout = () => {
  return (
    <GestureHandlerRootView>
      <SafeAreaView className="bg-primary h-full">
        <FlatList
          ListHeaderComponent={() => (
            <View>
              <View className="flex px-4 space-y-4 mt-6 mb-2">
                <View className="flex justify-between items-start flex-row mb-0">
                  <Text className="text-2xl font-pbold text-white">
                    Your Workout
                  </Text>
                </View>
              </View>
              {/* Pink Rectangle */}
              <View className="w-full h-[208px] mt-4 mb-4" style={{ backgroundColor: '#F178B6' }}>
                <View className="flex items-center justify-center h-full">
                  <Image
                    source={require('./../../assets/images/cardio.png')}
                    style={{ width: 323, height: 157, borderRadius: 20 }}
                  />
                </View>
              </View>
              <View className="flex my-6 px-4 space-y-4">
                <View className="flex justify-between items-start flex-row mb-4">
                  <Text className="text-2xl font-pmedium text-white" style={{ color: '#F178B6' }}>
                    Cardiovascular System
                  </Text>
                </View>

              </View>
            </View>
          )}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

export default Workout;

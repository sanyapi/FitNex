import React from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';

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
              <View className="w-full h-[208px] mt-4 mb-10" style={{ backgroundColor: '#F178B6' }}>
                <View className="flex items-center justify-center h-full">
                  <Image
                    source={require('./../../assets/images/cardio.png')}
                    style={{ width: 323, height: 157, borderRadius: 20 }}
                  />
                </View>
              </View>
              {/* Heading Below the Pink Rectangle */}
              <View className="flex px-4 space-y-4 mb-4">
                <View className="flex justify-between items-start flex-row mb-1">
                  <Text className="text-2xl font-pmedium text-white" style={{ color: '#F178B6' }}>
                    Cardiovascular System
                  </Text>
                </View>
              </View>
              {/* White Rounded Rectangle */}
              <View className="flex items-center px-4">
                <View className="w-full h-[80px] bg-white rounded-[100px] flex flex-row items-center justify-start px-4">
                  {/* Pink Circle */}
                  <View className="w-12 h-12 bg-[#F178B6] rounded-full flex items-center justify-center">
                    {/* White Play Button */}
                    <Icon name="play" size={20} color="white" />
                  </View>
                  {/* Exercise Title and Description */}
                  <View className="ml-4">
                    <Text className="text-xl font-pmedium text-black mb-1">
                      Your Exercise Title
                    </Text>
                    <View className="flex flex-row items-center">
                      <Icon className="bg-primary" name="running" size={14} />
                      <Text className="text-sm font-plight text-black ml-2">
                        Quadriceps, Hamstrings, Calves
                      </Text>
                    </View>
                  </View>
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

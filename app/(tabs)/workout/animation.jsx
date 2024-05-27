import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useRouter } from 'expo-router';

const Animation = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isGifPlaying, setGifPlaying] = useState(false);
  const router = useRouter();

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.log('A date has been picked: ', date);
    hideDatePicker();
  };

  const toggleGif = () => {
    setGifPlaying(!isGifPlaying);
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="bg-primary h-full">
        <FlatList
          ListHeaderComponent={() => (
            <View>
              <View className="flex px-4 space-y-4 mt-6 mb-2">
                <TouchableOpacity className="flex flex-row items-center" onPress={() => router.back()}>
                  <Icon name="angle-left" size={24} color="white" />
                  <Text className="text-2xl font-pbold text-white ml-2">
                    Animation
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Pink Rectangle */}
              <View className="w-full h-96 mt-4 bg-[#F178B6] relative">
                <View className="flex items-center justify-center h-full">
                  <Image
                    source={
                      isGifPlaying
                        ? require('./../../../assets/images/cardio.gif') // Ensure this path points to your .gif file
                        : require('./../../../assets/images/cardio.png')
                    }
                    className="w-[70%] h-[95%] rounded-[16px]"
                  />
                  {!isGifPlaying && (
                    <TouchableOpacity
                      className="absolute bg-[#F178B6] rounded-full p-5 justify-center items-center"
                      style={{ transform: [{ scale: 1.5 }] }}
                      onPress={toggleGif}
                    >
                      <Icon name="play" size={48} color="white" />
                    </TouchableOpacity>
                  )}
                </View>
              </View>

              {/* White Rectangle with Rounded Top Corners */}
              <View className="flex items-center mt-4">
                <View
                  className="w-full bg-white flex flex-col px-4 py-4"
                  style={{
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                  }}
                >
                  <View className="w-full flex-row items-center justify-between px py">
                    <View className="bg-secondary rounded-[20px] flex-1 mr-2 px-4 py-2">
                      <Text className="text-xl font-pbold text-white">
                        Exercise Name Here
                      </Text>
                    </View>
                    <View className="bg-secondary rounded-[20px] px-2 py-2">
                      <TouchableOpacity onPress={showDatePicker}>
                        <Icon name="plus-circle" size={24} color="white" />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View className="w-full bg-secondary rounded-[20px] mt-4 flex justify-center px-4 py-2">
                    <Text className="text-xl font-pbold text-white mb-4">
                      Instructions
                    </Text>
                    <Text className="text-xl font-pmedium text-primary">
                      {`Stand with your feet shoulder-width apart.\n\n
Bend your knees and lower your body into a squat position.\n\n
Jump explosively upwards, extending your legs and arms.\n\n
While in the air, spread your legs apart and bring your arms out to the sides.\n\n
Land softly with your feet shoulder-width apart, bending your knees to absorb the impact.\n\n
Repeat for the desired number of repetitions.`}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}
        />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Animation;
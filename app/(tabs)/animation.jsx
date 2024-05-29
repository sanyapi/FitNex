import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import axios from 'axios';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const Animation = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { exerciseName: defaultExerciseName, instructions: defaultInstructions, gifUrl: defaultGifUrl } = route.params || {}; // Destructure params with default values

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isGifPlaying, setGifPlaying] = useState(false);

  const [exerciseName, setExerciseName] = useState(defaultExerciseName || 'Astride Jump'); // Set default exerciseName
  const [instructions, setInstructions] = useState(defaultInstructions || '"Stand with your feet shoulder-width apart."'); // Set default instructions
  const [gifUrl, setGifUrl] = useState(defaultGifUrl || 'https://v2.exercisedb.io/image/kP7PzqOXAIsfeH'); // Set default gifUrl

  useEffect(() => {
    const fetchExerciseDetails = async () => {
      try {
        // Fetch exercise details based on exerciseName
        const response = await axios.get(`https://exercisedb.p.rapidapi.com/exercises/${encodeURIComponent(exerciseName)}`);
        // Update exercise details
        const { instructions, gifUrl } = response.data;
        setInstructions(instructions);
        setGifUrl(gifUrl);
      } catch (error) {
        console.error('Error fetching exercise details:', error);
      }
    };

    fetchExerciseDetails();
  }, [exerciseName]);

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
                <TouchableOpacity className="flex flex-row items-center" onPress={() => navigation.goBack()}>
                  <Icon name="angle-left" size={24} color="white" />
                  <Text className="text-2xl font-pbold text-white ml-2">
                    Animation
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Animated GIF */}
              <View className="w-full h-96 mt-4 bg-[#F178B6] relative">
                <View className="flex items-center justify-center h-full">
                  <Image
                    source={
                      isGifPlaying
                        ? { uri: gifUrl }
                        : require('./../../assets/images/cardio.png')
                    }
                    className="w-[70%] h-[95%] rounded-[16px]"
                  />
                  {!isGifPlaying && (
                    <TouchableOpacity
                      className="absolute bg-[#F178B6] rounded-full p-6 justify-center items-center"
                      style={{ transform: [{ scale: 1.5 }] }}
                      onPress={toggleGif}
                    >
                      <Icon name="play" size={50} color="white" />
                    </TouchableOpacity>
                  )}
                </View>
              </View>

              {/* Exercise Details */}
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
                      <Text className="text-xl font-pbold text-white capitalize">
                        {exerciseName}
                      </Text>
                    </View>
                    <View className="bg-secondary rounded-[20px] px-2 py-2">
                      <TouchableOpacity onPress={showDatePicker}>
                        <Icon name="plus-circle" size={24} color="white" />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View className="w-full bg-secondary rounded-[20px] mt-4 flex justify-center px-4 py-2s">
                    <Text className="text-xl font-pbold text-white mb-4 whitespace-pre-line">
                      Instructions
                    </Text>
                    <Text className="text-xl font-pmedium text-primary">
                      {instructions}
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
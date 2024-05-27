import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation, useRoute } from '@react-navigation/native'; // Import useNavigation
import axios from 'axios';

const Workout = () => {
  const [exercises, setExercises] = useState([]);
  const navigation = useNavigation(); // Use useNavigation hook
  const route = useRoute();
  const defaultBodyPart = 'cardio'; // Default body part
  const { bodyPart } = route.params || { bodyPart: defaultBodyPart }; // Use selected bodyPart if available, otherwise use default
  const apiKey = 'cfac37b048mshac939b6a4643755p15b081jsn514f524789d6';

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${encodeURIComponent(bodyPart)}`, {
          headers: {
            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
            'X-RapidAPI-Key': apiKey,
          },
        });
        setExercises(response.data);
      } catch (error) {
        console.error('Error fetching exercises:', error);
      }
    };

    fetchExercises();
  }, [bodyPart]);

  const handleExercisePress = (exercise) => {
    navigation.navigate('animation', { // Navigate to animation page
      exerciseName: exercise.name,
      instructions: exercise.instructions,
      gifUrl: exercise.gifUrl
    });
  };

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
                  <Text className="text-2xl font-pmedium text-white capitalize" style={{ color: '#F178B6' }}>
                    {bodyPart}
                  </Text>
                </View>
              </View>
            </View>
          )}
          data={exercises}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleExercisePress(item)}>
              <View style={{ marginBottom: 20 }}>
                {/* White Rounded Rectangle */}
                <View className="flex items-center px-4">
                  <View className="w-full bg-white rounded-[100px] flex flex-row items-center justify-start px-4 py-3">
                    {/* Pink Circle */}
                    <View className="w-12 h-12 bg-[#F178B6] rounded-full flex items-center justify-center">
                      {/* White Play Button */}
                      <Icon name="play" size={20} color="white" />
                    </View>
                    {/* Exercise Title and Description */}
                    <View className="ml-4 flex-shrink">
                      <Text numberOfLines={2} ellipsizeMode="tail" className="text-xl font-pmedium text-black capitalize">
                        {item.name}
                      </Text>
                      <View className="flex flex-row items-center">
                        <Icon className="bg-primary" name="running" size={14} />
                        <Text numberOfLines={2} ellipsizeMode="tail" className="text-sm font-plight text-black ml-2 capitalize">
                          {item.secondaryMuscles.map((muscle) => muscle).join(', ')}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Workout;

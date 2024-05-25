import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';

const Workout = () => {
  const [exercises, setExercises] = useState([]);
  const route = useRoute();
  const { bodyPart } = route.params;

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`, {
          headers: {
            'X-RapidAPI-Key': 'ae9a37384bmsh944c7afa7311accp1841ebjsn63a6306e0b29', // Replace with your actual RapidAPI key
            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
          },
        });
        setExercises(response.data);
      } catch (error) {
        console.error('Error fetching exercises:', error);
      }
    };

    fetchExercises();
  }, [bodyPart]);

  const renderExerciseItem = ({ item }) => (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <Text>{item.name}</Text>
      <Text>{item.target}</Text>
    </View>
  );

  return (
    <GestureHandlerRootView>
    <SafeAreaView className="bg-primary h-full">
    <FlatList
        data={exercises}
        renderItem={renderExerciseItem}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6">
            <View className="flex justify-between items-start flex-row mb-6">
              <View>
                <Text className="text-2xl font-pbold text-white">
                  Your Workout
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

export default Workout;

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';

const Workout = () => {
  // const [exercises, setExercises] = useState([]);
  // const route = useRoute();
  // const { bodyPart } = route.params;

  // useEffect(() => {
  //   const fetchExercises = async () => {
  //     try {
  //       const response = await axios.get(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`, {
  //         headers: {
  //           'X-RapidAPI-Key': 'ae9a37384bmsh944c7afa7311accp1841ebjsn63a6306e0b29', // Replace with your actual RapidAPI key
  //           'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
  //         },
  //       });
  //       setExercises(response.data);
  //     } catch (error) {
  //       console.error('Error fetching exercises:', error);
  //     }
  //   };

  //   fetchExercises();
  // }, [bodyPart]);

  // const renderExerciseItem = ({ item }) => (
  //   <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 }}>
  //     <Text>{item.name}</Text>
  //     <Text>{item.target}</Text>
  //   </View>
  // );

  return (
    <GestureHandlerRootView>
    <SafeAreaView className="bg-primary h-full">
    <FlatList
        // data={exercises}
        // renderItem={renderExerciseItem}
        // keyExtractor={(item) => item.id.toString()}
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
  )
}

export default Workout;

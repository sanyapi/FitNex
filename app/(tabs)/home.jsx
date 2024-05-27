import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const [workouts, setWorkouts] = useState([]);
  const [filteredWorkouts, setFilteredWorkouts] = useState([]);
  const [trainingOfTheDay, setTrainingOfTheDay] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchVisible, setSearchVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const bodyParts = [
        'back', 'cardio', 'chest', 'lower arms', 'lower legs', 
        'neck', 'shoulders', 'upper arms', 'upper legs', 'waist'
      ];

      try {
        const workoutPromises = bodyParts.map(async (bodyPart) => {
          const response = await axios.get(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${encodeURIComponent(bodyPart)}`, {
            params: { limit: '10' },
            headers: {
              'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
              'X-RapidAPI-Key': '41a6616d66mshb32f591453b3eccp113f6ajsnc42be8d94958',
            },
          });

          const workouts = response.data.map(workout => ({
            id: `${bodyPart}-${workout.id}`,
            title: workout.bodyPart,
            exercises: `${Math.floor(Math.random() * 10) + 5} Exercises`,
            image: workout.gifUrl,
          }));

          return workouts[0]; // Assuming we only want the first workout as a representative
        });

        const workoutData = await Promise.all(workoutPromises);

        setWorkouts(workoutData);
        setFilteredWorkouts(workoutData);
        setTrainingOfTheDay(workoutData[1]);
      } catch (error) {
        console.error('Error fetching workouts:', error);
      }
    };

    fetchWorkouts();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = workouts.filter(workout =>
        workout.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredWorkouts(filtered);
    } else {
      setFilteredWorkouts(workouts);
    }
  }, [searchQuery, workouts]);

  const renderWorkoutItem = ({ item }) => {
    const handlePress = () => {
      navigation.navigate('workout', { bodyPart: item.title });
    };

    return (
      <TouchableOpacity className="flex-row-reverse items-center mb-4 bg-white rounded-2xl h-24 overflow-hidden" onPress={handlePress}>
        <Image source={{ uri: item.image }} className="w-2/5 h-full rounded-l-none rounded-2xl" />
        <View className="flex-1 p-6 justify-center">
          <Text className="text-lg font-bold text-black capitalize">{item.title}</Text>
          <View className="flex-row items-center">
            <FontAwesome5 name="running" size={12} color="#212020" className="mr-2" />
            <Text className="text-xs text-[#212020] ml-2">{item.exercises}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const handleTrainingOfTheDayPress = () => {
    navigation.navigate('workout', { bodyPart: trainingOfTheDay.title });
  };

  return (
    <SafeAreaView className="flex-1 bg-[#1E1E1E]">
      <View className="absolute top-0 w-full bg-[#1E1E1E] z-10 flex-row justify-between items-center p-5">
        <Text className="text-2xl font-pbold text-white ml-2">FitNex</Text>
        {searchVisible ? (
          <Feather name="x" size={24} color="white" onPress={() => {
            setSearchQuery('');
            setSearchVisible(false);
          }} />
        ) : (
          <Feather name="search" size={24} color="white" onPress={() => setSearchVisible(true)} />
        )}
      </View>
      {searchVisible && (
        <View className="absolute top-16 w-full z-10 bg-white p-5 rounded-b-2xl flex-row items-center">
          <TextInput
            placeholder="Search..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="bg-gray-200 p-3 rounded-xl flex-1"
          />
        </View>
      )}
      <ScrollView contentContainerStyle={{ paddingTop: 50 }}>
        {trainingOfTheDay && (
          <View className="bg-[#F178B6] p-8 relative">
            <TouchableOpacity onPress={handleTrainingOfTheDayPress}>
              <View className="overflow-hidden rounded-2xl bg-white">
                <Image source={{ uri: trainingOfTheDay.image }} className="w-full h-52" />
              </View>
              <View className="absolute right-0 bg-[#EF5DA8] rounded-3xl rounded-br-none w-32">
                <Text className="text-center text-black text-xs font-pmedium">Training Of The Day</Text>
              </View>
              <View className="px-4 bg-[#3C3C3C] flex-col rounded-bl-2xl rounded-br-2xl mt-[-50]">
                <Text className="text-[#EF5DA8] font-pmedium text-base capitalize mt-1">{trainingOfTheDay.title}</Text>
                <View className="flex-row items-center">
                  <FontAwesome5 name="running" size={12} color="white" className="mr-2" />
                  <Text className="text-xs text-white ml-2 mb-2 mt-[-2]">{trainingOfTheDay.exercises}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}
        <View className="px-8 py-5">
          <Text className="text-xl text-[#EF5DA8] font-pmedium">Let's Go Beginner</Text>
          <Text className="text-white font-pmedium">Target Different Body Parts</Text>
        </View>
        <View className="px-8">
          <FlatList
            data={filteredWorkouts}
            renderItem={renderWorkoutItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
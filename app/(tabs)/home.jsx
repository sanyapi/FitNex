import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const apiKey = '03247b73bdmshcb2bdb3c1c41492p1bf5c0jsn3d1110c05e4a';

const Home = () => {
  const [workouts, setWorkouts] = useState([]);
  const [filteredWorkouts, setFilteredWorkouts] = useState([]);
  const [trainingOfTheDay, setTrainingOfTheDay] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchVisible, setSearchVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        // Check if workouts exist in AsyncStorage
        const cachedWorkouts = await AsyncStorage.getItem('workouts');
        if (cachedWorkouts) {
          setWorkouts(JSON.parse(cachedWorkouts));
        } else {
          const bodyParts = [
            'back', 'cardio', 'chest', 'lower arms', 'lower legs',
            'neck', 'shoulders', 'upper arms', 'upper legs', 'waist'
          ];

          const workoutPromises = bodyParts.map(async (bodyPart) => {
            const response = await axios.get(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${encodeURIComponent(bodyPart)}`, {
              params: { limit: '10' },
              headers: {
                'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
                'X-RapidAPI-Key': apiKey,
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

          // Store workouts in AsyncStorage
          await AsyncStorage.setItem('workouts', JSON.stringify(workoutData));
        }
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
        <Image source={{ uri: item.image }} className="w-2/5 h-full rounded-l-none rounded-full" />
        <View className="flex-1 p-4 justify-center">
          <Text className="text-lg font-bold text-black capitalize">{item.title}</Text>
          <View className="flex-row items-center">
            <Icon name="running" size={14} color="#212020" className="mr-2" />
            <Text className="text-sm text-[#212020] ml-2">{item.exercises}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const handleTrainingOfTheDayPress = () => {
    navigation.navigate('workout', { bodyPart: trainingOfTheDay.title });
  };

  useEffect(() => {
    const fetchTrainingOfTheDay = async () => {
      try {
        const response = await axios.get('https://exercisedb.p.rapidapi.com/exercises/bodyPart/cardio', {
          params: { limit: '1' }, // Limit to 1 exercise for training of the day
          headers: {
            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
            'X-RapidAPI-Key': apiKey,
          },
        });

        const workout = response.data[0];
        setTrainingOfTheDay({
          title: workout.bodyPart,
          exercises: `${Math.floor(Math.random() * 10) + 5} Exercises`,
          image: workout.gifUrl,
        });
      } catch (error) {
        console.error('Error fetching training of the day:', error);
      }
    };

    fetchTrainingOfTheDay();
  }, []);


  return (
    <SafeAreaView className="flex-1 bg-primary">
      {/* Heading */}
      <View className="flex px-4 space-y-4 mt-6 mb-2">
          <View className="flex justify-between items-start flex-row mb-0">
            <Text className="text-2xl font-pbold text-white"> FitNex </Text>
            {searchVisible ? (
              <Feather name="x" size={24} color="white" onPress={() => {
                setSearchQuery('');
                setSearchVisible(false);
              }} />
            ) : (
              <Feather name="search" size={24} color="white" onPress={() => setSearchVisible(true)} />
            )}
          </View>
      </View>
      {searchVisible && (
        <View className="absolute top-16 w-full z-10 bg-white p-3 rounded-b-2xl flex-row items-center mt-5">
          <TextInput
            placeholder="Search..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="bg-gray-200 p-3 rounded-xl flex-1 text-sm"
          />
        </View>
      )}
      <ScrollView className="mt-4 mb-10">
        {trainingOfTheDay && (
          <View className="bg-secondary p-8 relative">
            <TouchableOpacity onPress={handleTrainingOfTheDayPress}>
              <View className="overflow-hidden rounded-2xl bg-white">
                <Image source={{ uri: trainingOfTheDay.image }} className="w-full h-52" />
              </View>
              <View className="absolute right-0 bg-[#EF5DA8] rounded-full rounded-br-none w-40 ">
                <Text className="text-center text-black text-sm font-pmedium">Training Of The Day</Text>
              </View>
              <View className="px-4 py-2 bg-[#3C3C3C] flex-col rounded-bl-2xl rounded-br-2xl mt-[-40]">
                <Text className="text-[#EF5DA8] font-pmedium text-lg capitalize">{trainingOfTheDay.title}</Text>
                <View className="flex-row items-center">
                  <Icon name="running" size={14} color="white" className="mr-2" />
                  <Text className="text-sm text-white ml-2">{trainingOfTheDay.exercises}</Text>
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
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const [workouts, setWorkouts] = useState([]);
  const [trainingOfTheDay, setTrainingOfTheDay] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await axios.get('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', {
          headers: {
            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
            'X-RapidAPI-Key': 'ae9a37384bmsh944c7afa7311accp1841ebjsn63a6306e0b29',
          },
        });
        const workoutData = response.data.map((workout, index) => ({
          id: index.toString(),
          title: workout,
          exercises: `${Math.floor(Math.random() * 10) + 5} Exercises`, // Random number for exercises
          image: 'https://via.placeholder.com/150', // Placeholder for the actual image URL
        }));
        setWorkouts(workoutData);
        setTrainingOfTheDay(workoutData[1]);
      } catch (error) {
        console.error('Error fetching workouts:', error);
      }
    };

    fetchWorkouts();
  }, []);

  const renderWorkoutItem = ({ item }) => {
    const handlePress = () => {
      navigation.navigate('workout', { bodyPart: item.title });
    };

    return (
      <TouchableOpacity style={styles.workoutItem} onPress={handlePress}>
        <Image source={{ uri: item.image }} style={styles.workoutImage} />
        <View style={styles.workoutTextContainer}>
          <Text style={styles.workoutTitle}>{item.title}</Text>
          <View style={styles.workoutExercisesContainer}>
            <FontAwesome5 name="running" size={12} color="#212020" style={styles.runningIcon} />
            <Text style={styles.workoutExercises}>{item.exercises}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>FitNex</Text>
        <Feather name="search" size={24} color="white" />
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {trainingOfTheDay && (
          <View style={styles.trainingContainer}>
            <Image source={{ uri: trainingOfTheDay.image }} style={styles.trainingImage} />
            <View style={styles.trainingOverlay}>
              <Text style={styles.trainingText}>Training Of The Day</Text>
            </View>
            <View style={styles.trainingInfo}>
              <Text style={styles.trainingTitle}>{trainingOfTheDay.title}</Text>
              <Text style={styles.trainingExercises}>{trainingOfTheDay.exercises}</Text>
            </View>
          </View>
        )}
        <View style={styles.introContainer}>
          <Text style={styles.introTitle}>Let's Go Beginner</Text>
          <Text style={styles.introSubtitle}>Target Different Body Parts</Text>
        </View>
        <View style={styles.workoutListContainer}>
          <FlatList
            data={workouts}
            renderItem={renderWorkoutItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    position: 'absolute',
    top: 0,
    width: '100%',
    backgroundColor: '#000',
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Poppins-Medium',
  },
  scrollView: {
    paddingTop: 50,
  },
  trainingContainer: {
    backgroundColor: '#F178B6',
    padding: 30,
  },
  trainingImage: {
    width: '100%',
    height: 200,
    borderRadius: 20,
  },
  trainingOverlay: {
    backgroundColor: '#EF5DA8',
    borderRadius: 30,
    borderBottomEndRadius: 0,
    marginLeft: 'auto',
    marginTop: -200,
    marginBottom: 136,
    width: '40%',
    alignItems: 'center',
  },
  trainingText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
  trainingInfo: {
    paddingHorizontal: 10,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    flexDirection: 'column',
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
  },
  trainingTitle: {
    color: '#EF5DA8',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  trainingExercises: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
  introContainer: {
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  introTitle: {
    fontSize: 20,
    color: '#EF5DA8',
    fontFamily: 'Poppins-Medium',
  },
  introSubtitle: {
    color: 'white',
    fontFamily: 'Poppins-Medium',
  },
  workoutListContainer: {
    paddingHorizontal: 30,
  },
  workoutItem: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
    height: 100,
  },
  workoutImage: {
    width: '40%',
    height: '100%',
    borderRadius: 20,
  },
  workoutTextContainer: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  workoutTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'Poppins-Medium',
  },
  workoutExercisesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  workoutExercises: {
    fontSize: 12,
    color: '#212020',
    marginLeft: 5,
    fontFamily: 'Poppins-Medium',
  },
  runningIcon: {
    marginRight: 5,
  },
});

export default Home;
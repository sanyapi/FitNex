import React from 'react';
import { View, Image, Dimensions, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');

export default function App() {
  const router = useRouter();

  const handlePress = () => {
    router.push('/home');
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="bg-primary h-full">
        <ScrollView contentContainerStyle={{ height: '100%' }}>
          <View className="w-full flex justify-center items-center h-full px-4">
              <Image
                source={require('./../assets/icons/launch.png')}
                style={{ width: width * 0.3, height: width * 0.1 }} // Responsive width and height
                resizeMode="contain" // Scale the image down while preserving aspect ratio
              />
            <TouchableOpacity onPress={handlePress}>
              <Image
                source={require('./../assets/icons/fitNex.png')}
                style={{ width: width * 0.4, height: width * 0.2 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <StatusBar style="auto" />
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

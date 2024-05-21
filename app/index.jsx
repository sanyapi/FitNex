import React from 'react';
import { Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView>
      <SafeAreaView className="bg-primary h-full">
        <ScrollView contentContainerStyle={{ height: '100%' }}>
          <View className="w-full flex justify-center items-center h-full px-4">
            <Text className="text-3xl font-pblack" style={{ color: '#F178B6' }}>FitNex</Text>
            <View>
            <Link href="/home" style={{ color: 'white' }}>Go to Home</Link>
              {/* Add content here */}
            </View>
            <StatusBar style="auto" />
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
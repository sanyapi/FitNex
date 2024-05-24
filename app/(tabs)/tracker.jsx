import { View, Text, FlatList, RefreshControl, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { icons } from '../../constants'

{/*const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="items-center justidy-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs `} style={{ color: color }}>
        {name}
      </Text>
    </View>
  )
} */}

const Tracker = ({ icon, color, name, focused }) => {
  return (
    <GestureHandlerRootView>
      <SafeAreaView className="bg-primary h-full">
        <FlatList
          ListHeaderComponent={() => (
            <View className="flex my-6 px-4 space-y-6">
              <View className="flex justify-between items-start flex-row mb-6">
                <View>
                  <Text className="text-2xl font-pbold text-white">Personal Log</Text>
                </View>
                {/* Added Search Icon (from previous response) */}
                <TouchableOpacity onPress={() => { /* Handle Search Button Press */ }}>
                  <Image
                    source={icons.search} // Assuming 'search' icon exists in 'icons'
                    resizeMode="contain"
                    style={{ width: 24, height: 24, marginRight: 10 }} // Adjust styling as needed
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />

        {/* Added Profile Information Container below ListHeaderComponent */}
        <View style={{ flex: 300, justifyContent: 'flex-start', alignItems: 'center', marginTop: 0 }}>
        <View style={{ backgroundColor: '#EF5DA8', width: 393, height: 125, borderRadius: 10 }}>
          <View style={{ padding: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Angel Baby</Text>
              <Text>Age: 21</Text>
              <View style={{ flexDirection: 'row' }}>
                <Text>50 kg</Text>
                <Text style={{ marginLeft: 10 }}>Weight</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text>1.65 CM</Text>
                <Text style={{ marginLeft: 10 }}>Height</Text>
              </View>
            </View>
            {/* Profile Picture Circle */}
            <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: '#fff', overflow: 'hidden' }}>
              {/* Add your profile image component here */}
            </View>
          </View>
        </View>

        {/* Added Workout Log Container below Profile Information Container */}
        <View style={{ backgroundColor: '#EF5DA8', width: 316, height: 34, borderRadius: 38, alignItems: 'center', marginTop: 20 }}>
          <Text style={{ color: 'black', textAlign: 'center', paddingTop: 6, fontSize: 16 }}>Workout Log</Text>
        </View>
        </View>


        <View style={{paddingLeft: 65, marginBottom: 170}}>
          <View style={{ width: 299, height: 1, borderTopColor: 'white', borderTopWidth: 1 }}></View>

          <View style={{ flexDirection: 'row' }}>
            <Text style={{ color: 'white', paddingLeft: 20, paddingTop: 10, fontSize: 16 }}>Choose Date</Text>
            <Text style={{ color: 'white', paddingLeft: 90, paddingTop: 10, fontSize: 16 }}>Month</Text>
          </View>

          <View style={{ width: 299, height: 1, borderBottomColor: 'white', borderBottomWidth: 1, marginTop: 15}}>
          </View>
        </View>

        {/* Activities Section */}
        <View>
          <Text style={{ color: '#EF5DA8', fontSize: 27, paddingTop: 20, paddingLeft: 40 }}>Activities</Text>

          {/* Rectangle Boxes with circle and text in first one */}
          <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 10, flexDirection: 'column' }}>
            
            {/*first rectangle */}
            <View style={{ backgroundColor: 'white', width: 323, height: 64, borderRadius: 18, marginTop: 15 }}>
              {/* Pink Circle */}
              <View style={{ backgroundColor: 'pink', width: 40, height: 40, borderRadius: 20, position: 'absolute', left: 15, top: 12 }} />
              {/* Cardio Text */}
              <Text style={{ color: 'black', fontSize: 16, paddingLeft: 60, paddingTop: 18 }}>Cardio</Text>
            </View>

            {/*second rectangle */}
            <View style={{ backgroundColor: 'white', width: 323, height: 64, borderRadius: 18, marginTop: 15 }}>
              {/* Pink Circle */}
              <View style={{ backgroundColor: 'pink', width: 40, height: 40, borderRadius: 20, position: 'absolute', left: 15, top: 12 }} />
              {/* Cardio Text */}
              <Text style={{ color: 'black', fontSize: 16, paddingLeft: 60, paddingTop: 18 }}>Cardio</Text>
            </View>


          </View>
        </View>






      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

export default Tracker

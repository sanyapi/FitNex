import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Modal, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Calendar } from 'react-native-calendars';
import { icons } from '../../constants';

const Tracker = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('2023-05');
  const [currentYear, setCurrentYear] = useState(2023);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const years = Array.from({ length: 10 }, (_, index) => 2023 + index); 

  const handleMonthYearChange = (month, year) => {
    setSelectedMonth(`${year}-${month < 10 ? `0${month}` : month}`);
    setCurrentYear(year);
    setModalVisible(false);
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
        <ScrollView>
          <View style={{ padding: 16, marginTop: 16 }}>
            {/* Header */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>Personal Log</Text>
              <TouchableOpacity onPress={() => { /* Handle Search Button Press */ }}>
                <Image
                  source={icons.search} 
                  resizeMode="contain"
                  style={{ width: 24, height: 24, tintColor: 'white' }} 
                />
              </TouchableOpacity>
            </View>

            {/* Profile Information */}
            <View style={{ backgroundColor: '#EF5DA8', padding: 16, borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
              <View>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Angel Baby</Text>
                <Text style={{ color: 'white' }}>Age: 21</Text>
                <View style={{ flexDirection: 'row', marginTop: 4 }}>
                  <Text style={{ color: 'white' }}>50 kg</Text>
                  <Text style={{ color: 'white', marginLeft: 10 }}>Weight</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 4 }}>
                  <Text style={{ color: 'white' }}>1.65 CM</Text>
                  <Text style={{ color: 'white', marginLeft: 10 }}>Height</Text>
                </View>
              </View>
              <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: '#fff', overflow: 'hidden' }}>
                {/* Add your profile image component here */}
                <Image source={{ uri: 'https://via.placeholder.com/80' }} style={{ width: '100%', height: '100%' }} />
              </View>
            </View>

            {/* Workout Log Button */}
            <View style={{ alignItems: 'center', marginTop: 20 }}>
              <View style={{ backgroundColor: '#EF5DA8', paddingVertical: 8, paddingHorizontal: 32, borderRadius: 20 }}>
                <Text style={{ color: 'black', textAlign: 'center', fontSize: 16 }}>Workout Log</Text>
              </View>
            </View>

            {/* Date Selection */}
            <View style={{ alignItems: 'center', marginVertical: 20 }}>
              <View style={{ width: '100%', height: 1, backgroundColor: 'white', marginBottom: 10 }}></View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingHorizontal: 16 }}>
                <Text style={{ color: 'white', fontSize: 16 }}>Choose Date</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ color: 'white', fontSize: 16 }}>{months[parseInt(selectedMonth.split('-')[1], 10) - 1]} {currentYear}</Text>
                  <TouchableOpacity onPress={() => setModalVisible(true)} style={{ marginLeft: 10 }}>
                    <Image source={icons.dropdown} style={{ width: 20, height: 20, tintColor: 'white' }} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ width: '100%', height: 1, backgroundColor: 'white', marginTop: 10 }}></View>
            </View>

            {/* Calendar Component */}
            <View style={{ marginBottom: 20 }}>
              <Calendar
                current={selectedMonth}
                onDayPress={(day) => {
                  console.log('selected day', day);
                }}
                hideArrows
                hideExtraDays
                disableMonthChange
                theme={{
                  calendarBackground: '#000000',
                  textSectionTitleColor: '#FFFFFF',
                  textSectionTitleDisabledColor: '#d9e1e8',
                  selectedDayBackgroundColor: '#FF69B4',
                  selectedDayTextColor: '#ffffff',
                  todayTextColor: '#FF69B4',
                  dayTextColor: '#FF69B4',
                  textDisabledColor: '#d9e1e8',
                  dotColor: '#FF69B4',
                  selectedDotColor: '#ffffff',
                  arrowColor: '#FF69B4',
                  disabledArrowColor: '#d9e1e8',
                  monthTextColor: '#FF69B4',
                  indicatorColor: '#FF69B4',
                  textDayFontFamily: 'monospace',
                  textMonthFontFamily: 'monospace',
                  textDayHeaderFontFamily: 'monospace',
                  textDayFontWeight: '300',
                  textMonthFontWeight: 'bold',
                  textDayHeaderFontWeight: '300',
                  textDayFontSize: 16,
                  textMonthFontSize: 16,
                  textDayHeaderFontSize: 16,
                  'stylesheet.calendar.header': {
                    week: {
                      marginTop: 5,
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      backgroundColor: 'transparent',
                      borderRadius: 10,
                    },
                    dayHeader: {
                      marginTop: 2,
                      marginBottom: 2,
                      width: 32,
                      height: 32,
                      borderRadius: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                      color: '#FF69B4',
                      fontSize: 16,
                      fontWeight: 'bold',
                      backgroundColor: '#000000',
                      borderWidth: 1,
                      borderColor: '#FF69B4',
                    },
                    'stylesheet.calendar.main': {
                      monthView: {
                        display: 'none', 
                      },
                    },
                  },
                }}
              />
            </View>

            {/* Activities Section */}
            <Text style={{ color: '#EF5DA8', fontSize: 27, paddingLeft: 16 }}>Activities</Text>
            <View style={{ alignItems: 'center', marginTop: 10 }}>
              {/* First log */}
              <View style={{ backgroundColor: 'white', width: 323, height: 64, borderRadius: 18, marginTop: 15, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ backgroundColor: '#EF5DA8', width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                  {/* Icon or image can go here */}
                  <Image source={icons.activity} style={{ width: 24, height: 24 }} />
                </View>
                <View style={{ marginLeft: 16 }}>
                  <Text style={{ color: 'black', fontSize: 16 }}>Cardio</Text>
                  <Text style={{ color: '#EF5DA8', fontSize: 14 }}>June 09</Text>
                </View>
              </View>

              {/* Second log */}
              <View style={{ backgroundColor: 'white', width: 323, height: 64, borderRadius: 18, marginTop: 15, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ backgroundColor: '#EF5DA8', width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                  {/* Icon or image can go here */}
                  <Image source={icons.activity} style={{ width: 24, height: 24 }} />
                </View>
                <View style={{ marginLeft: 16 }}>
                  <Text style={{ color: 'black', fontSize: 16 }}>Cardio</Text>
                  <Text style={{ color: '#EF5DA8', fontSize: 14 }}>June 09</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Month/Year Selection Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <View style={{ width: 300, backgroundColor: 'white', borderRadius: 10, padding: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 20 }}>Select Month and Year</Text>
                <ScrollView style={{ maxHeight: 300 }}>
                  {years.map(year =>
                    months.map((month, index) => (
                      <TouchableOpacity
                        key={`${year}-${index + 1}`}
                        onPress={() => handleMonthYearChange(index + 1, year)}
                        style={{ paddingVertical: 10 }}
                      >
                        <Text style={{ fontSize: 16 }}>{`${month} ${year}`}</Text>
                      </TouchableOpacity>
                    ))
                  )}
                </ScrollView>
                <Button title="Close" onPress={() => setModalVisible(false)} />
              </View>
            </View>
          </Modal>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

export default Tracker;

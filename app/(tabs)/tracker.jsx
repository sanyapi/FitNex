import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Modal, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Calendar } from 'react-native-calendars';
import { icons, images } from '../../constants';

const Tracker = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('2024-05');
  const [currentYear, setCurrentYear] = useState(2024);
  const [selectedDate, setSelectedDate] = useState(null);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const years = Array.from({ length: 10 }, (_, index) => 2024 + index);

  const handleMonthYearChange = (month, year) => {
    setSelectedMonth(`${year}-${month < 10 ? `0${month}` : month}`);
    setCurrentYear(year);
    setModalVisible(false);
  };

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#212020' }}>
        {/* Header */}
        <View className="flex px-4 space-y-4 mt-6 mb-2">
          <View className="flex justify-between items-start flex-row mb-0">
            <Text className="text-2xl font-pbold text-white">
              Personal Log
            </Text>
          </View>
        </View>

        <ScrollView>
          <View style={{ padding: 20}}>

            {/* Profile Information */}
            <View style={{ backgroundColor: '#F178B6', padding: 16, borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
              <View>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black' }}>Angel Baby</Text>
                <Text style={{ color: 'black', fontSize: 16 }}>Age: 21</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>

                <View style={{ backgroundColor: '#EF5DA8', width: 10, height: 30, borderRadius: 20 }} />
                  <View style={{ alignItems: 'center', marginRight: 16, marginLeft: 12 }}>
                    <Text style={{ color: 'black', fontSize: 16, fontWeight:'bold' }}>50 kg</Text>
                    <Text style={{ color: 'black', fontSize: 12 }}>Weight</Text>
                  </View>
                  
                  <View style={{ backgroundColor: '#EF5DA8', width: 10, height: 30, borderRadius: 20 }} />
                  <View style={{ alignItems: 'center', marginLeft: 12 }}>
                    <Text style={{ color: 'black', fontSize: 16, fontWeight:'bold' }}>1.65 cm</Text>
                    <Text style={{ color: 'black', fontSize: 12 }}>Height</Text>
                  </View>
                </View>
              </View>
              <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: '#fff', overflow: 'hidden' }}>
                <Image source={ images.angelbaby } style={{ width: '100%', height: '100%' }} />
              </View>
            </View>

            {/* Workout Log Button */}
            <View style={{ alignItems: 'center', marginTop: 20 }}>
              <View style={{ backgroundColor: '#EF5DA8', paddingVertical: 8, paddingHorizontal: 32, borderRadius: 20, width:'100%', marginTop:10 }}>
                <Text style={{ color: 'black', textAlign: 'center', fontSize: 16 }}>Workout Log</Text>
              </View>
            </View>

            {/* Date Selection */}
            <View style={{ alignItems: 'center', marginVertical: 20 }}>
              <View style={{ width: '100%', height: 1, backgroundColor: 'white', marginBottom: 10 }}></View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingHorizontal: 16 }}>
                <Text style={{ color: '#EF5DA8', fontSize: 14, fontWeight:'700' }}>Choose Date</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ color: 'white', fontSize: 14 }}>{months[parseInt(selectedMonth.split('-')[1], 10) - 1]} {currentYear}</Text>
                  <TouchableOpacity onPress={() => setModalVisible(true)} style={{ marginLeft: 10 }}>
                    <Image source={icons.dropdown} style={{ width: 18, height: 18, tintColor: 'white' }} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ width: '100%', height: 1, backgroundColor: 'white', marginTop: 10 }}></View>
            </View>

            {/* Calendar Component */}
            <View style={{justifyContent: 'space-between', marginBottom: 20 }}>
              <Calendar
              style={{ backgroundColor: '#ffffff', borderRadius: 30, paddingBottom: 14}}
                current={selectedMonth}
                markedDates={{
                  [selectedDate]: {
                    selected: true,
                    selectedColor: '#FF69B4',
                    selectedTextColor: '#ffffff'
                  }
                }}
                onDayPress={handleDayPress}
                hideArrows
                hideExtraDays
                disableMonthChange
                theme={{
                  calendarBackground: '#ffffff',
                  textSectionTitleColor: '#000000',
                  textSectionTitleDisabledColor: '#d9e1e8',
                  selectedDayBackgroundColor: '#FF69B4',
                  selectedDayTextColor: '#000000',
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
                  textDayHeaderFontSize: 14,
                }}
              />
            </View>

            {/* Activities Section */}
            <Text style={{ color: '#EF5DA8', fontSize: 27, paddingLeft: 16 }}>Activities</Text>
            <View style={{ alignItems: 'center', marginTop: 10 }}>
              {selectedDate === '2024-05-09' ? (
                <>
                  {/* Cardio log for May 09 */}
                  <View className="w-full h-[80px] bg-white rounded-[100px] flex flex-row items-center justify-start px-4">
                    <View style={{ backgroundColor: '#EF5DA8', width: 50, height: 50, borderRadius: 30, justifyContent: 'center', alignItems: 'center' }}>
                      <Image source={icons.activity} style={{ width: 24, height: 24 }} />
                    </View>
                    <View style={{ marginLeft: 16 }}>
                      <Text style={{ color: 'black', fontSize: 16 }}>Cardio</Text>
                      <Text style={{ color: '#EF5DA8', fontSize: 14 }}>May 09</Text>
                    </View>
                  </View>

                  <View className="w-full h-[80px] bg-white rounded-[100px] flex flex-row items-center justify-start px-4 mt-4">
                    <View style={{ backgroundColor: '#EF5DA8', width: 50, height: 50, borderRadius: 30, justifyContent: 'center', alignItems: 'center' }}>
                      <Image source={icons.activity} style={{ width: 24, height: 24 }} />
                    </View>
                    <View style={{ marginLeft: 16 }}>
                      <Text style={{ color: 'black', fontSize: 16 }}>Leg</Text>
                      <Text style={{ color: '#EF5DA8', fontSize: 14 }}>May 09</Text>
                    </View>
                  </View>
                </>
              ) : (
                <Text style={{ color: 'white', fontSize: 16, marginTop: 20 }}>No activities for this day</Text>
              )}
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
};

export default Tracker;

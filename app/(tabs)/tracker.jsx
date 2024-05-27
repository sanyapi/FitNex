import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Modal, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Calendar } from 'react-native-calendars';
import { icons, images } from '../../constants';

const Tracker = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('2023-06');
  const [currentYear, setCurrentYear] = useState(2023);
  const [selectedDate, setSelectedDate] = useState(null);

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

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
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
        <ScrollView>
          <View style={{ padding: 16, marginTop: 16 }}>

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
                <Image source={ images.angelbaby } style={{ width: '100%', height: '100%' }} />
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
            <View style={{ backgroundColor: '#ffffff', padding: 10, borderRadius: 30, justifyContent: 'space-between', marginBottom: 20 }}>
              <Calendar
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
                  textDayHeaderFontSize: 16,
                }}
              />
            </View>

            {/* Activities Section */}
            <Text style={{ color: '#EF5DA8', fontSize: 27, paddingLeft: 16 }}>Activities</Text>
            <View style={{ alignItems: 'center', marginTop: 10 }}>
              {selectedDate === '2023-06-09' ? (
                <>
                  {/* Cardio log for June 09 */}
                  <View style={{ backgroundColor: 'white', width: 365, height: 70, borderRadius: 18, marginTop: 15, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ backgroundColor: '#EF5DA8', width: 50, height: 50, borderRadius: 30, justifyContent: 'center', alignItems: 'center' }}>
                      <Image source={icons.activity} style={{ width: 24, height: 24 }} />
                    </View>
                    <View style={{ marginLeft: 16 }}>
                      <Text style={{ color: 'black', fontSize: 16 }}>Cardio</Text>
                      <Text style={{ color: '#EF5DA8', fontSize: 14 }}>June 09</Text>
                    </View>
                  </View>

                  <View style={{ backgroundColor: 'white', width: 365, height: 70, borderRadius: 18, marginTop: 15, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ backgroundColor: '#EF5DA8', width: 50, height: 50, borderRadius: 30, justifyContent: 'center', alignItems: 'center' }}>
                      <Image source={icons.activity} style={{ width: 24, height: 24 }} />
                    </View>
                    <View style={{ marginLeft: 16 }}>
                      <Text style={{ color: 'black', fontSize: 16 }}>Leg</Text>
                      <Text style={{ color: '#EF5DA8', fontSize: 14 }}>June 09</Text>
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

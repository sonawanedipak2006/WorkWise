import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

export default function AttendanceScreen() {
  const [employeeName, setEmployeeName] = useState('');
  const [checkedIn, setCheckedIn] = useState(false);
  const [checkedInEmployees, setCheckedInEmployees] = useState([]);
  const [myCheckInTime, setMyCheckInTime] = useState(null);
  const [myCheckOutTime, setMyCheckOutTime] = useState(null);

  const todayDate = moment().format('YYYY-MM-DD');

  useEffect(() => {
    loadCurrentUser();
  }, []);

  useEffect(() => {
    if (employeeName) {
      fetchTodayCheckIns();
    }
  }, [employeeName]);

  const loadCurrentUser = async () => {
    try {
      const user = await AsyncStorage.getItem('currentUser');
      if (user) {
        const parsedUser = JSON.parse(user);
        setEmployeeName(parsedUser.fullName || parsedUser.name || 'Unknown');
      }
    } catch (e) {
      console.error('Error loading user:', e);
    }
  };

  const fetchTodayCheckIns = async () => {
    try {
      const data = await AsyncStorage.getItem('attendance');
      const parsed = data ? JSON.parse(data) : [];

      const todaysData = parsed.filter(
        (entry) => entry.date === todayDate && entry.status === 'Checked In'
      );

      setCheckedInEmployees(todaysData);

      const myEntry = parsed.find(
        (entry) => entry.name === employeeName && entry.date === todayDate
      );
      if (myEntry) {
        setCheckedIn(true);
        setMyCheckInTime(myEntry.time);
        if (myEntry.checkoutTime) {
          setMyCheckOutTime(myEntry.checkoutTime);
        }
      } else {
        setCheckedIn(false);
        setMyCheckInTime(null);
        setMyCheckOutTime(null);
      }
    } catch (e) {
      console.error('Error fetching data:', e);
    }
  };

  const handleCheckIn = async () => {
    try {
      const data = await AsyncStorage.getItem('attendance');
      const parsed = data ? JSON.parse(data) : [];

      const alreadyCheckedIn = parsed.find(
        (entry) => entry.name === employeeName && entry.date === todayDate
      );

      if (alreadyCheckedIn) {
        Alert.alert('Already Checked In');
        return;
      }

      const timeNow = moment().format('HH:mm:ss');
      const newEntry = {
        name: employeeName,
        date: todayDate,
        time: timeNow,
        status: 'Checked In',
      };

      const updated = [...parsed, newEntry];
      await AsyncStorage.setItem('attendance', JSON.stringify(updated));
      fetchTodayCheckIns();
    } catch (e) {
      console.error('Error in check-in:', e);
    }
  };

  const handleCheckOut = async () => {
    try {
      const data = await AsyncStorage.getItem('attendance');
      let parsed = data ? JSON.parse(data) : [];

      const index = parsed.findIndex(
        (entry) => entry.name === employeeName && entry.date === todayDate
      );

      if (index === -1) {
        Alert.alert('You must check in first.');
        return;
      }

      const checkoutTime = moment().format('HH:mm:ss');
      parsed[index].status = 'Checked Out';
      parsed[index].checkoutTime = checkoutTime;

      await AsyncStorage.setItem('attendance', JSON.stringify(parsed));
      fetchTodayCheckIns();
    } catch (e) {
      console.error('Error in check-out:', e);
    }
  };

  const renderEmployee = ({ item }) => (
    <View style={styles.employeeItem}>
      <Text style={styles.employeeText}>{item.name}</Text>
      <Text style={styles.timeText}>🕒 {item.time}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Attendance</Text>

      <Text style={styles.label}>Welcome, {employeeName}</Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#4CAF50' }]}
        onPress={handleCheckIn}
      >
        <Text style={styles.buttonText}>Check In</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#f44336' }]}
        onPress={handleCheckOut}
      >
        <Text style={styles.buttonText}>Check Out</Text>
      </TouchableOpacity>

      {myCheckInTime && (
        <Text style={styles.timeDisplay}>✅ Check-In Time: {myCheckInTime}</Text>
      )}
      {myCheckOutTime && (
        <Text style={styles.timeDisplay}>⬅️ Check-Out Time: {myCheckOutTime}</Text>
      )}

      <View style={styles.statusContainer}>
        <Text style={styles.statusLabel}>Total Checked In Today:</Text>
        <Text style={styles.statusCount}>{checkedInEmployees.length}</Text>
      </View>

      <FlatList
        data={checkedInEmployees}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderEmployee}
        ListHeaderComponent={
          <Text style={styles.subHeading}>✔ Checked In Employees Today</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: 'gray',
  },
  button: {
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  timeDisplay: {
    fontSize: 16,
    color: '#00796b',
    marginTop: 5,
    fontWeight: '600',
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    padding: 15,
    backgroundColor: '#e0f7fa',
    borderRadius: 10,
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusCount: {
    fontSize: 16,
    color: '#00796b',
  },
  subHeading: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: '600',
  },
  employeeItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  employeeText: {
    fontSize: 16,
  },
  timeText: {
    fontSize: 14,
    color: 'gray',
  },
});

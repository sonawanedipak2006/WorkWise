{/*//LeaveApplication
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LeaveApplication = () => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = async () => {
    if (!fromDate || !toDate || !reason.trim()) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    const newLeave = {
      id: Date.now().toString(),
      fromDate,
      toDate,
      reason,
      status: 'Pending',
    };

    try {
      const existing = await AsyncStorage.getItem('leaves');
      const leaves = existing ? JSON.parse(existing) : [];
      const updated = [newLeave, ...leaves];
      await AsyncStorage.setItem('leaves', JSON.stringify(updated));

      Alert.alert('Leave Submitted', `From: ${fromDate}\nTo: ${toDate}`);

      setFromDate('');
      setToDate('');
      setReason('');
    } catch (err) {
      console.log('Save error:', err);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>📝 Leave Application</Text>

      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="From Date (e.g. 2025-07-15)"
          value={fromDate}
          onChangeText={setFromDate}
          placeholderTextColor="#666"
        />
        <TextInput
          style={styles.input}
          placeholder="To Date (e.g. 2025-07-18)"
          value={toDate}
          onChangeText={setToDate}
          placeholderTextColor="#666"
        />
        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Reason for Leave"
          value={reason}
          onChangeText={setReason}
          multiline
          placeholderTextColor="#666"
        />

        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.btnText}>Submit Leave</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default LeaveApplication;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f2f4f7',
    flexGrow: 1,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#000',
  },
  submitBtn: {
    backgroundColor: '#007bff',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

*/}


import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import uuid from 'react-native-uuid';

export default function ApplyLeaveScreen() {
  const [name, setName] = useState('');
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);

  const handleSubmit = async () => {
    if (!name) {
      Alert.alert('Error', 'Please enter leave reason or name');
      return;
    }

    if (toDate < fromDate) {
      Alert.alert('Error', '"To Date" cannot be earlier than "From Date"');
      return;
    }

    const newLeave = {
      id: uuid.v4(),
      name,
      fromDate: moment(fromDate).format('YYYY-MM-DD'),
      toDate: moment(toDate).format('YYYY-MM-DD'),
    };

    try {
      const existing = await AsyncStorage.getItem('holidays');
      const parsed = existing ? JSON.parse(existing) : [];
      parsed.push(newLeave);
      await AsyncStorage.setItem('holidays', JSON.stringify(parsed));
      Alert.alert('Success', 'Leave applied successfully');
      setName('');
    } catch (e) {
      Alert.alert('Error', 'Failed to save leave');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📝 Apply for Leave</Text>

      <TextInput
        placeholder="Enter Leave Reason"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TouchableOpacity onPress={() => setShowFromPicker(true)} style={styles.dateBtn}>
        <Text>📅 From Date: {moment(fromDate).format('YYYY-MM-DD')}</Text>
      </TouchableOpacity>
      {showFromPicker && (
        <DateTimePicker
          value={fromDate}
          mode="date"
          display="default"
          onChange={(e, selectedDate) => {
            setShowFromPicker(false);
            if (selectedDate) setFromDate(selectedDate);
          }}
        />
      )}

      <TouchableOpacity onPress={() => setShowToPicker(true)} style={styles.dateBtn}>
        <Text>📅 To Date: {moment(toDate).format('YYYY-MM-DD')}</Text>
      </TouchableOpacity>
      {showToPicker && (
        <DateTimePicker
          value={toDate}
          mode="date"
          display="default"
          onChange={(e, selectedDate) => {
            setShowToPicker(false);
            if (selectedDate) setToDate(selectedDate);
          }}
        />
      )}

      <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Apply Leave</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
  dateBtn: {
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 16,
  },
  submitBtn: {
    backgroundColor: '#2e7d32',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
});

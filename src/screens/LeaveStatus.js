//LeaveStatus

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Alert,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LeaveStatus = () => {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    const fetchLeaves = async () => {
      const data = await AsyncStorage.getItem('leaves');
      setLeaves(data ? JSON.parse(data) : []);
    };
    fetchLeaves();
  }, []);

  const updateLeaveStatus = async (id, status) => {
    const updatedLeaves = leaves.map((leave) =>
      leave.id === id ? { ...leave, status } : leave
    );
    setLeaves(updatedLeaves);
    await AsyncStorage.setItem('leaves', JSON.stringify(updatedLeaves));

    if (status === 'Approved') {
      const approved = updatedLeaves.find((l) => l.id === id);
      const holiday = {
        id,
        name: approved.reason || 'Approved Leave',
        date: approved.fromDate,
      };
      const existingHolidays = await AsyncStorage.getItem('holidays');
      const holidayList = existingHolidays ? JSON.parse(existingHolidays) : [];
      await AsyncStorage.setItem(
        'holidays',
        JSON.stringify([holiday, ...holidayList])
      );

      Alert.alert('✅ Leave Approved & Added to Holidays');
    } else if (status === 'Rejected') {
      Alert.alert('❌ Leave Rejected');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.label}>📌 Reason</Text>
      <Text style={styles.value}>{item.reason}</Text>

      <Text style={styles.label}>📅 Dates</Text>
      <Text style={styles.value}>
        {item.fromDate} → {item.toDate}
      </Text>

      <Text style={styles.label}>📋 Status</Text>
      <Text
        style={[
          styles.status,
          item.status === 'Approved'
            ? styles.approved
            : item.status === 'Rejected'
            ? styles.rejected
            : styles.pending,
        ]}
      >
        {item.status}
      </Text>

      {item.status === 'Pending' && (
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.approveBtn]}
            onPress={() => updateLeaveStatus(item.id, 'Approved')}
          >
            <Text style={styles.buttonText}>Approve</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.rejectBtn]}
            onPress={() => updateLeaveStatus(item.id, 'Rejected')}
          >
            <Text style={styles.buttonText}>Reject</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>🗓️ Leave Status</Text>
      <FlatList
        data={leaves}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </ScrollView>
  );
};

export default LeaveStatus;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f0f4f7',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#444',
    marginTop: 8,
  },
  value: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  status: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  approved: {
    backgroundColor: '#d4edda',
    color: '#155724',
  },
  rejected: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
  },
  pending: {
    backgroundColor: '#fff3cd',
    color: '#856404',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  approveBtn: {
    backgroundColor: '#28a745',
  },
  rejectBtn: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});





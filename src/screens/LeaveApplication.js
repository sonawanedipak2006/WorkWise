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

{/*}
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
*/}


import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Dimensions,
  Animated,
  StatusBar,
  ScrollView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import uuid from 'react-native-uuid';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

export default function ApplyLeaveScreen() {
  const [name, setName] = useState('');
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);
  const [leaveType, setLeaveType] = useState('casual');

  // Animation values
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));

  useEffect(() => {
    // Entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleSubmit = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter leave reason');
      return;
    }

    if (toDate < fromDate) {
      Alert.alert('Error', 'End date cannot be earlier than start date');
      return;
    }

    const newLeave = {
      id: uuid.v4(),
      name: name.trim(),
      leaveType,
      fromDate: moment(fromDate).format('YYYY-MM-DD'),
      toDate: moment(toDate).format('YYYY-MM-DD'),
      status: 'pending',
      appliedDate: moment().format('YYYY-MM-DD'),
    };

    try {
      const existing = await AsyncStorage.getItem('leaveApplications');
      const parsed = existing ? JSON.parse(existing) : [];
      parsed.push(newLeave);
      await AsyncStorage.setItem('leaveApplications', JSON.stringify(parsed));
      Alert.alert('Success', 'Leave application submitted successfully!');
      setName('');
      setFromDate(new Date());
      setToDate(new Date());
    } catch (e) {
      Alert.alert('Error', 'Failed to submit leave application');
    }
  };

  const leaveTypes = [
    { key: 'casual', label: 'Casual Leave', icon: 'sunny', gradient: ['#ff9a9e', '#fecfef'] },
    { key: 'sick', label: 'Sick Leave', icon: 'medical', gradient: ['#a8edea', '#fed6e3'] },
    { key: 'earned', label: 'Earned Leave', icon: 'trophy', gradient: ['#ffecd2', '#fcb69f'] },
    { key: 'maternity', label: 'Maternity', icon: 'heart', gradient: ['#ff9a9e', '#fad0c4'] },
  ];

  const renderLeaveTypeCard = (type) => (
    <TouchableOpacity
      key={type.key}
      style={[
        styles.leaveTypeCard,
        leaveType === type.key && styles.selectedLeaveType,
      ]}
      onPress={() => setLeaveType(type.key)}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={type.gradient}
        style={styles.leaveTypeGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Ionicons name={type.icon} size={24} color="#fff" />
        <Text style={styles.leaveTypeLabel}>{type.label}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#667eea" />
      
      {/* Gradient Header */}
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={styles.headerContent}>
          <Ionicons name="calendar" size={32} color="#fff" />
          <Text style={styles.headerTitle}>Apply for Leave</Text>
          <Text style={styles.headerSubtitle}>Request time off with ease</Text>
        </View>
        
        {/* Floating decorative elements */}
        <View style={[styles.floatingElement, styles.floatingElement1]} />
        <View style={[styles.floatingElement, styles.floatingElement2]} />
        <View style={[styles.floatingElement, styles.floatingElement3]} />
      </LinearGradient>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* Leave Type Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Leave Type</Text>
            <View style={styles.leaveTypeContainer}>
              {leaveTypes.map(renderLeaveTypeCard)}
            </View>
          </View>

          {/* Leave Details Form */}
          <View style={styles.formContainer}>
            <Text style={styles.sectionTitle}>Leave Details</Text>
            
            {/* Reason Input */}
            <View style={styles.inputContainer}>
              <View style={styles.inputIconContainer}>
                <Ionicons name="document-text" size={20} color="#667eea" />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Enter leave reason..."
                placeholderTextColor="#999"
                value={name}
                onChangeText={setName}
                multiline
                numberOfLines={3}
                textAlignVertical="top"
              />
            </View>

            {/* Date Selection */}
            <View style={styles.dateSection}>
              <Text style={styles.dateLabel}>Select Dates</Text>
              
              <TouchableOpacity
                onPress={() => setShowFromPicker(true)}
                style={styles.dateButton}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['#667eea', '#764ba2']}
                  style={styles.dateButtonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Ionicons name="calendar-outline" size={20} color="#fff" />
                  <Text style={styles.dateButtonText}>
                    From: {moment(fromDate).format('MMM DD, YYYY')}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setShowToPicker(true)}
                style={styles.dateButton}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['#11998e', '#38ef7d']}
                  style={styles.dateButtonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Ionicons name="calendar-outline" size={20} color="#fff" />
                  <Text style={styles.dateButtonText}>
                    To: {moment(toDate).format('MMM DD, YYYY')}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* Duration Display */}
            <View style={styles.durationContainer}>
              <LinearGradient
                colors={['#f093fb', '#f5576c']}
                style={styles.durationCard}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name="time" size={24} color="#fff" />
                <Text style={styles.durationText}>
                  Duration: {moment(toDate).diff(moment(fromDate), 'days') + 1} days
                </Text>
              </LinearGradient>
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={styles.submitButtonContainer}
              onPress={handleSubmit}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#667eea', '#764ba2']}
                style={styles.submitButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Ionicons name="send" size={20} color="#fff" />
                <Text style={styles.submitButtonText}>Submit Application</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ScrollView>

      {/* Date Pickers */}
      {showFromPicker && (
        <DateTimePicker
          value={fromDate}
          mode="date"
          display="default"
          minimumDate={new Date()}
          onChange={(e, selectedDate) => {
            setShowFromPicker(false);
            if (selectedDate) setFromDate(selectedDate);
          }}
        />
      )}

      {showToPicker && (
        <DateTimePicker
          value={toDate}
          mode="date"
          display="default"
          minimumDate={fromDate}
          onChange={(e, selectedDate) => {
            setShowToPicker(false);
            if (selectedDate) setToDate(selectedDate);
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    height: height * 0.25,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  headerContent: {
    alignItems: 'center',
    zIndex: 2,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    marginTop: 5,
    textAlign: 'center',
  },
  floatingElement: {
    position: 'absolute',
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  floatingElement1: {
    width: 80,
    height: 80,
    top: 20,
    right: 30,
  },
  floatingElement2: {
    width: 60,
    height: 60,
    bottom: 40,
    left: 20,
  },
  floatingElement3: {
    width: 40,
    height: 40,
    top: 60,
    left: 50,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  leaveTypeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  leaveTypeCard: {
    width: (width - 50) / 2,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  selectedLeaveType: {
    elevation: 8,
    shadowOpacity: 0.3,
  },
  leaveTypeGradient: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
  },
  leaveTypeLabel: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'center',
    fontSize: 12,
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: '#e1e5e9',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 20,
    backgroundColor: '#f8f9fa',
  },
  inputIconContainer: {
    marginRight: 12,
    marginTop: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    minHeight: 80,
  },
  dateSection: {
    marginBottom: 25,
  },
  dateLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  dateButton: {
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dateButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    gap: 10,
  },
  dateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  durationContainer: {
    marginBottom: 30,
  },
  durationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 15,
    gap: 12,
  },
  durationText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  submitButtonContainer: {
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    gap: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
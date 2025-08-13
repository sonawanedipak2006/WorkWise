{/*//LeaveStatus

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
*/}


import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Alert,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Animated,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

const LeaveStatus = () => {
  const [leaves, setLeaves] = useState([]);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));

  useEffect(() => {
    const fetchLeaves = async () => {
      const data = await AsyncStorage.getItem('leaveApplications');
      setLeaves(data ? JSON.parse(data) : []);
    };
    fetchLeaves();

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

  const updateLeaveStatus = async (id, status) => {
    const updatedLeaves = leaves.map((leave) =>
      leave.id === id ? { ...leave, status } : leave
    );
    setLeaves(updatedLeaves);
    await AsyncStorage.setItem('leaveApplications', JSON.stringify(updatedLeaves));

    if (status === 'approved') {
      const approved = updatedLeaves.find((l) => l.id === id);
      const holiday = {
        id,
        name: approved.name || 'Approved Leave',
        date: approved.fromDate,
      };
      const existingHolidays = await AsyncStorage.getItem('holidays');
      const holidayList = existingHolidays ? JSON.parse(existingHolidays) : [];
      await AsyncStorage.setItem(
        'holidays',
        JSON.stringify([holiday, ...holidayList])
      );

      Alert.alert('✅ Success', 'Leave Approved & Added to Holidays');
    } else if (status === 'rejected') {
      Alert.alert('❌ Rejected', 'Leave has been rejected');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return ['#28a745', '#20c997'];
      case 'rejected':
        return ['#dc3545', '#fd7e14'];
      case 'pending':
      default:
        return ['#ffc107', '#fd7e14'];
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return 'checkmark-circle';
      case 'rejected':
        return 'close-circle';
      case 'pending':
      default:
        return 'time';
    }
  };

  const renderItem = ({ item, index }) => (
    <Animated.View
      style={[
        styles.card,
        {
          opacity: fadeAnim,
          transform: [
            {
              translateY: slideAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -20],
              }),
            },
          ],
        },
      ]}
    >
      <LinearGradient
        colors={['#fff', '#f8f9fa']}
        style={styles.cardGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Header with Status */}
        <View style={styles.cardHeader}>
          <LinearGradient
            colors={getStatusColor(item.status)}
            style={styles.statusBadge}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Ionicons name={getStatusIcon(item.status)} size={16} color="#fff" />
            <Text style={styles.statusText}>
              {item.status?.charAt(0).toUpperCase() + item.status?.slice(1)}
            </Text>
          </LinearGradient>
          <Text style={styles.leaveType}>{item.leaveType || 'Leave'}</Text>
        </View>

        {/* Leave Details */}
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <View style={styles.iconContainer}>
              <Ionicons name="document-text" size={20} color="#667eea" />
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Reason</Text>
              <Text style={styles.detailValue}>{item.name}</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.iconContainer}>
              <Ionicons name="calendar" size={20} color="#667eea" />
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Duration</Text>
              <Text style={styles.detailValue}>
                {item.fromDate} → {item.toDate}
              </Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.iconContainer}>
              <Ionicons name="time" size={20} color="#667eea" />
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Applied On</Text>
              <Text style={styles.detailValue}>{item.appliedDate}</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons for Pending Status */}
        {item.status === 'pending' && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonWrapper}
              onPress={() => updateLeaveStatus(item.id, 'approved')}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#28a745', '#20c997']}
                style={styles.approveButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Ionicons name="checkmark" size={18} color="#fff" />
                <Text style={styles.buttonText}>Approve</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonWrapper}
              onPress={() => updateLeaveStatus(item.id, 'rejected')}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#dc3545', '#fd7e14']}
                style={styles.rejectButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Ionicons name="close" size={18} color="#fff" />
                <Text style={styles.buttonText}>Reject</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
      </LinearGradient>
    </Animated.View>
  );

  const EmptyState = () => (
    <View style={styles.emptyState}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.emptyStateIcon}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Ionicons name="calendar-outline" size={48} color="#fff" />
      </LinearGradient>
      <Text style={styles.emptyStateTitle}>No Leave Applications</Text>
      <Text style={styles.emptyStateSubtitle}>
        When employees apply for leave, they will appear here for your review.
      </Text>
    </View>
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
          <Ionicons name="list" size={32} color="#fff" />
          <Text style={styles.headerTitle}>Leave Status</Text>
          <Text style={styles.headerSubtitle}>Review and manage leave requests</Text>
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
          {/* Summary Cards */}
          <View style={styles.summaryContainer}>
            <View style={styles.summaryCard}>
              <LinearGradient
                colors={['#ffc107', '#fd7e14']}
                style={styles.summaryGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name="time" size={24} color="#fff" />
                <Text style={styles.summaryNumber}>
                  {leaves.filter(l => l.status === 'pending').length}
                </Text>
                <Text style={styles.summaryLabel}>Pending</Text>
              </LinearGradient>
            </View>

            <View style={styles.summaryCard}>
              <LinearGradient
                colors={['#28a745', '#20c997']}
                style={styles.summaryGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name="checkmark-circle" size={24} color="#fff" />
                <Text style={styles.summaryNumber}>
                  {leaves.filter(l => l.status === 'approved').length}
                </Text>
                <Text style={styles.summaryLabel}>Approved</Text>
              </LinearGradient>
            </View>

            <View style={styles.summaryCard}>
              <LinearGradient
                colors={['#dc3545', '#fd7e14']}
                style={styles.summaryGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name="close-circle" size={24} color="#fff" />
                <Text style={styles.summaryNumber}>
                  {leaves.filter(l => l.status === 'rejected').length}
                </Text>
                <Text style={styles.summaryLabel}>Rejected</Text>
              </LinearGradient>
            </View>
          </View>

          {/* Leave Applications List */}
          <View style={styles.listContainer}>
            <Text style={styles.listTitle}>Leave Applications</Text>
            {leaves.length === 0 ? (
              <EmptyState />
            ) : (
              leaves.map((item, index) => renderItem({ item, index }))
            )}
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

export default LeaveStatus;

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
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
    gap: 10,
  },
  summaryCard: {
    flex: 1,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  summaryGradient: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
  },
  summaryNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 8,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
    marginTop: 4,
  },
  listContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardGradient: {
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  leaveType: {
    fontSize: 14,
    color: '#667eea',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  detailsContainer: {
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  buttonWrapper: {
    flex: 1,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  approveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    gap: 8,
  },
  rejectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    gap: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptyStateSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
});





import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


const HomeScreen = ({ route, navigation }) => {
  const { username } = route.params || { username: 'User' };

  const menuItems = [
    { icon: 'people-outline', label: 'Add Employee', screen: 'Addemp', color: ['#4facfe', '#00f2fe'] },
    { icon: 'calendar-outline', label: 'Attendance', screen: 'AttendanceScreen', color: ['#43e97b', '#38f9d7'] },
    { icon: 'clipboard-outline', label: 'Leave Status', screen: 'LeaveStatus', color: ['#f953c6', '#b91d73'] },
    { icon: 'checkmark-done-outline', label: 'Manage Tasks', screen: 'TaskScreen', color: ['#30cfd0', '#330867'] },
    { icon: 'chatbubbles-outline', label: 'Chat (Admin)', screen: 'ChatScreen', color: ['#667eea', '#764ba2'], params: { role: 'Admin' } },
    { icon: 'calendar', label: 'View Holiday', screen: 'HolidayScreen', color: ['#ff6a00', '#ee0979'] },
    { icon: 'settings-outline', label: 'Settings', screen: 'SettingsScreen', color: ['#3c3b3f', '#605c3c'] },
    { icon: 'people-outline', label: 'Show Employee', screen: 'Showemp', color: ['#4e54c8', '#8f94fb'] },
    { icon: 'stats-chart-outline', label: 'My Stats', screen: 'StatsScreen', color: ['#11998e', '#38ef7d'] },
    { icon: 'document-attach-outline', label: 'Documents', screen: 'DocumentsScreen', color: ['#8e44ad', '#c0392b'] },
    { icon: 'help-circle-outline', label: 'Help / FAQ', screen: 'HelpScreen', color: ['#d35400', '#f39c12'] },
    { icon: 'people-circle-outline', label: 'My Team', screen: 'MyTeamScreen', color: ['#1abc9c', '#2ecc71'] },
    { icon: 'wallet-outline', label: 'View Salary', screen: 'SalaryScreen', color: ['#c0392b', '#e74c3c'] },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.welcome}>👋 Welcome, {username}</Text>
      <View style={styles.grid}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.card]}
            onPress={() => navigation.navigate(item.screen, item.params)}
          >
            <View style={[styles.iconContainer, { backgroundColor: item.color[0] }]}>
              <Ionicons name={item.icon} size={26} color="#fff" />
            </View>
            <Text style={styles.label}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f7f9fc',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  welcome: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 25,
    textAlign: 'center',
    color: '#34495e',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '47%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: '#6c5ce7',
  },
  label: {
    color: '#2d3436',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});
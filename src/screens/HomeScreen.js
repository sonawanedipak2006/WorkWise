//HomeScreen

//square UI
{/*import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HomeScreen = ({ route, navigation }) => {
  const { username } = route.params || { username: 'User' };

  const menuItems = [
    { icon: 'people-outline', label: 'Employee List', screen: 'EmployeeList', color: '#007bff' },
    { icon: 'document-text-outline', label: 'Apply for Leave', screen: 'LeaveApplication', color: '#6f42c1' },
    { icon: 'calendar-outline', label: 'Attendance', screen: 'Attendance', color: '#e83e8c' },
    { icon: 'clipboard-outline', label: 'Leave Status', screen: 'LeaveStatus', color: '#fd7e14' },
    { icon: 'cash-outline', label: 'Salary Info', screen: 'Salary', color: '#20c997' },
    { icon: 'settings-outline', label: 'Settings', screen: 'Settings', color: '#6c757d' },
    { icon: 'checkmark-done-outline', label: 'Manage Tasks', screen: 'Task', color: '#17a2b8' },
    { icon: 'chatbubbles-outline', label: 'Chat (Admin)', screen: 'Chat', color: '#6610f2', params: { role: 'Admin' } },
    { icon: 'chatbubble-ellipses-outline', label: 'Chat (Employee)', screen: 'Chat', color: '#28a745', params: { role: 'Employee' } },
    { icon: 'calendar', label: 'View Holiday', screen: 'Holiday', color: '#dc3545' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.welcome}>👋 Welcome, {username}</Text>

      <View style={styles.grid}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.card, { backgroundColor: item.color }]}
            onPress={() => navigation.navigate(item.screen, item.params)}
          >
            <Ionicons name={item.icon} size={30} color="#fff" />
            <Text style={styles.cardText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const { width } = Dimensions.get('window');
const cardWidth = width * 0.42;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f0f4f8',
    padding: 16,
    alignItems: 'center',
  },
  welcome: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  card: {
    width: cardWidth,
    aspectRatio: 1,
    borderRadius: 16,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  cardText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 10,
  },
});*/}



{/*}
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
    { icon: 'people-outline', label: ' Employee ', screen: 'EmployeeList', color: '#4e54c8' },
    { icon: 'document-text-outline', label: 'Apply for Leave', screen: 'LeaveApplication', color: '#8f94fb' },
    { icon: 'calendar-outline', label: 'Attendance', screen: 'Attendance', color: '#f7971e' },
    { icon: 'clipboard-outline', label: 'Leave Status', screen: 'LeaveStatus', color: '#f9536fff' },
   
    { icon: 'checkmark-done-outline', label: 'Manage Tasks', screen: 'Task', color: '#30cfd0' },
    { icon: 'chatbubbles-outline', label: 'Chat (Admin)', screen: 'Chat', color: '#667eea', params: { role: 'Admin' } },
    { icon: 'chatbubble-ellipses-outline', label: 'Chat (Employee)', screen: 'Chat', color: '#764ba2', params: { role: 'Employee' } },
    { icon: 'calendar', label: 'View Holiday', screen: 'Holiday', color: '#ff6a00' },
    { icon: 'settings-outline', label: 'Settings', screen: 'Settings', color: '#3c3b3f' },
    
    
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.welcome}>👋 Welcome, {username}</Text>

      <View style={styles.grid}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.card, { backgroundColor: item.color }]}
            onPress={() => navigation.navigate(item.screen, item.params)}
          >
            <Ionicons name={item.icon} size={26} color="#fff" />
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
    backgroundColor: '#f2f4f7',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  welcome: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 25,
    textAlign: 'center',
    color: '#222',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '47%',
    aspectRatio: 1,
    borderRadius: 16,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  label: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
});

*/}
// EmployeeDashboard.js
// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { useNavigation } from '@react-navigation/native';

// export default function EmployeeDashboard() {
//   const navigation = useNavigation();

//   // State: employee details sathvtoy
//   const [employeeData, setEmployeeData] = useState({
//     name: '',
//     profilePic: '',
//     attendance: '',
//     tasksDone: '',
//     salary: '',
//     leavesLeft: '',
//   });

//   // App suru zalyavar data ghetoy
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await AsyncStorage.getItem('employeeData');
//         if (data) {
//           setEmployeeData(JSON.parse(data)); // string → object
//         }
//       } catch (error) {
//         console.log('Error loading employee data:', error);
//       }
//     };
//     fetchData();
//   }, []);

//   // Dashboard var tile stats
//   const stats = [
//     { icon: 'checkmark-circle', label: 'Present', value: employeeData.attendance },
//     { icon: 'checkmark-done', label: 'Tasks Done', value: employeeData.tasksDone },
//     { icon: 'cash', label: 'Salary', value: employeeData.salary },
//     { icon: 'document-text', label: 'Leaves Left', value: employeeData.leavesLeft },
//   ];

//   // Menu Items (tiles)
//   const menuItems = [
//     { label: 'Employee', icon: 'people-outline', color: '#3498db', screen: 'EmployeeList' },
//     { label: 'Apply Leave', icon: 'create-outline', color: '#f39c12', screen: 'LeaveApplication' },
//     { label: 'Attendance', icon: 'calendar-outline', color: '#1abc9c', screen: 'Attendance' },
//     { label: 'Leave Status', icon: 'clipboard-outline', color: '#9b59b6', screen: 'LeaveStatus' },
//     { label: 'Tasks', icon: 'checkmark-done-outline', color: '#e67e22', screen: 'TaskScreen' },
//     { label: 'View Salary', icon: 'cash-outline', color: '#2ecc71', screen: 'Salary' },
    
//     { label: 'Chat (Admin)', icon: 'chatbubble-ellipses-outline', color: '#2980b9', screen: 'ChatScreen' },
//     { label: 'View Holiday', icon: 'calendar-number-outline', color: '#e84393', screen: 'Holiday' },
//     { label: 'Settings', icon: 'settings-outline', color: '#7f8c8d', screen: 'Settings' },
//     { label: 'Check-In/Out', icon: 'time-outline', color: '#27ae60', screen: 'CheckInOut' },
//     { label: 'Calendar', icon: 'calendar-clear-outline', color: '#d35400', screen: 'Calendar' },
//     { label: 'My Stats', icon: 'stats-chart-outline', color: '#8e44ad', screen: 'Stats' },
//     { label: 'Documents', icon: 'document-text-outline', color: '#16a085', screen: 'Documents' },
//     { label: 'Help / FAQ', icon: 'help-circle-outline', color: '#34495e', screen: 'Help' },
//     { label: 'My Team', icon: 'people-circle-outline', color: '#2c3e50', screen: 'MyTeam' },
//   ];

//   return (
//     <View style={styles.container}>
//       {/* Welcome Header */}
//       <View style={styles.header}>
//         <Text style={styles.welcome}>👋 Welcome, {employeeData.name}</Text>
//         <Image
//           source={{ uri: employeeData.profilePic || 'https://i.imgur.com/3GvwNBf.png' }}
//           style={styles.profilePic}
//         />
//       </View>

//       {/* Stat Cards */}
//       <View style={styles.statsRow}>
//         {stats.map((item, index) => (
//           <View key={index} style={styles.statCard}>
//             <Icon name={item.icon} size={20} color="#fff" />
//             <Text style={styles.statLabel}>{item.label}</Text>
//             <Text style={styles.statValue}>{item.value}</Text>
//           </View>
//         ))}
//       </View>

//       {/* Dashboard Menu */}
//       <FlatList
//         data={menuItems}
//         keyExtractor={(item) => item.label}
//         numColumns={3}
//         contentContainerStyle={styles.menuContainer}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={[styles.menuItem, { backgroundColor: item.color }]}
//             onPress={() => navigation.navigate(item.screen)}
//           >
//             <Icon name={item.icon} size={24} color="#fff" />
//             <Text style={styles.menuLabel}>{item.label}</Text>
//           </TouchableOpacity>
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f2f2f2',
//     padding: 10,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 10,
//     backgroundColor: '#fff',
//     padding: 15,
//     borderRadius: 10,
//   },
//   welcome: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   profilePic: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//   },
//   statsRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//   },
//   statCard: {
//     flex: 1,
//     margin: 5,
//     backgroundColor: '#3498db',
//     borderRadius: 10,
//     padding: 10,
//     alignItems: 'center',
//   },
//   statLabel: {
//     color: '#fff',
//     marginTop: 5,
//     fontSize: 12,
//   },
//   statValue: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   menuContainer: {
//     paddingBottom: 100,
//   },
//   menuItem: {
//     flex: 1,
//     margin: 5,
//     padding: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   menuLabel: {
//     color: '#fff',
//     marginTop: 5,
//     fontSize: 12,
//     textAlign: 'center',
//   },
// });

{/*import React from 'react';
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
    { icon: 'people-outline', label: 'Employee', screen: 'EmployeeList', color: '#4e54c8' },
    { icon: 'document-text-outline', label: 'Apply Leave', screen: 'LeaveApplication', color: '#8f94fb' },
    { icon: 'calendar-outline', label: 'Check-In/Out', screen: 'AttendanceScreen', color: '#f7971e' },
    { icon: 'clipboard-outline', label: 'Leave Status', screen: 'LeaveStatus', color: '#f9536f' },
    { icon: 'checkmark-done-outline', label: 'Tasks', screen: 'TaskScreen', color: '#30cfd0' },
    { icon: 'chatbubbles-outline', label: 'Chat (Admin)', screen: 'ChatScreen', color: '#667eea', params: { role: 'Admin' } },
    { icon: 'calendar', label: 'View Holiday', screen: 'HolidayScreen', color: '#ff6a00' },
    { icon: 'settings-outline', label: 'Settings', screen: 'SettingsScreen', color: '#3c3b3f' },
    { icon: 'calendar-clear-outline', label: 'Calendar', screen: 'CalendarScreen', color: '#3498db' },
    { icon: 'stats-chart-outline', label: 'My Stats', screen: 'StatsScreen', color: '#27ae60' },
    { icon: 'document-attach-outline', label: 'Documents', screen: 'DocumentsScreen', color: '#8e44ad' },
    { icon: 'help-circle-outline', label: 'Help / FAQ', screen: 'HelpScreen', color: '#d35400' },
    { icon: 'people-circle-outline', label: 'My Team', screen: 'MyTeamScreen', color: '#1abc9c' },
    { icon: 'wallet-outline', label: 'View Salary', screen: 'SalaryScreen', color: '#c0392b' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.welcome}>👋 Welcome, {username}</Text>

      <View style={styles.grid}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.card, { backgroundColor: item.color }]}
            onPress={() => navigation.navigate(item.screen, item.params)}
          >
            <Ionicons name={item.icon} size={26} color="#fff" />
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
    backgroundColor: '#f2f4f7',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  welcome: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 25,
    textAlign: 'center',
    color: '#222',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '47%',
    aspectRatio: 1,
    borderRadius: 16,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  label: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
});
*/}

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
  StatusBar,
  ImageBackground,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

const HomeScreen = ({ route, navigation }) => {
  const { username } = route.params || { username: 'User' };
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.8));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const menuItems = [
    { 
      icon: 'people-outline', 
      label: 'Employee', 
      screen: 'EmployeeList', 
      color: ['#667eea', '#764ba2'],
      gradient: ['#4facfe', '#00f2fe']
    },
    { 
      icon: 'document-text-outline', 
      label: 'Apply Leave', 
      screen: 'LeaveApplication', 
      color: ['#ff9966', '#ff5e62'],
      gradient: ['#fa709a', '#fee140']
    },
    { 
      icon: 'calendar-outline', 
      label: 'Check-In/Out', 
      screen: 'AttendanceScreen', 
      color: ['#f7971e', '#ffd200'],
      gradient: ['#ffecd2', '#fcb69f']
    },
    { 
      icon: 'clipboard-outline', 
      label: 'Leave Status', 
      screen: 'LeaveStatus', 
      color: ['#f9536f', '#b91d73'],
      gradient: ['#ff9a9e', '#fecfef']
    },
    { 
      icon: 'checkmark-done-outline', 
      label: 'Tasks', 
      screen: 'TaskScreen', 
      color: ['#30cfd0', '#330867'],
      gradient: ['#a8edea', '#fed6e3']
    },
    { 
      icon: 'chatbubbles-outline', 
      label: 'Chat (Admin)', 
      screen: 'ChatScreen', 
      color: ['#667eea', '#764ba2'],
      gradient: ['#d299c2', '#fef9d7'],
      params: { role: 'Admin' }
    },
    { 
      icon: 'calendar', 
      label: 'View Holiday', 
      screen: 'HolidayScreen', 
      color: ['#ff6a00', '#ee0979'],
      gradient: ['#ffecd2', '#fcb69f']
    },
    { 
      icon: 'settings-outline', 
      label: 'Settings', 
      screen: 'SettingsScreen', 
      color: ['#3c3b3f', '#605c3c'],
      gradient: ['#a8caba', '#5d4e75']
    },
    { 
      icon: 'calendar-clear-outline', 
      label: 'Calendar', 
      screen: 'CalendarScreen', 
      color: ['#3498db', '#2c3e50'],
      gradient: ['#89f7fe', '#66a6ff']
    },
    { 
      icon: 'stats-chart-outline', 
      label: 'My Stats', 
      screen: 'StatsScreen', 
      color: ['#11998e', '#38ef7d'],
      gradient: ['#84fab0', '#8fd3f4']
    },
    { 
      icon: 'document-attach-outline', 
      label: 'Documents', 
      screen: 'DocumentsScreen', 
      color: ['#8e44ad', '#c0392b'],
      gradient: ['#ffecd2', '#fcb69f']
    },
    { 
      icon: 'help-circle-outline', 
      label: 'Help / FAQ', 
      screen: 'HelpScreen', 
      color: ['#d35400', '#f39c12'],
      gradient: ['#ffecd2', '#fcb69f']
    },
    { 
      icon: 'people-circle-outline', 
      label: 'My Team', 
      screen: 'MyTeamScreen', 
      color: ['#1abc9c', '#2ecc71'],
      gradient: ['#a8edea', '#fed6e3']
    },
    { 
      icon: 'wallet-outline', 
      label: 'View Salary', 
      screen: 'SalaryScreen', 
      color: ['#c0392b', '#e74c3c'],
      gradient: ['#ff9a9e', '#fecfef']
    },
  ];

  const renderCard = (item, index) => {
    const cardAnim = new Animated.Value(0);
    
    useEffect(() => {
      Animated.timing(cardAnim, {
        toValue: 1,
        duration: 600,
        delay: index * 100,
        useNativeDriver: true,
      }).start();
    }, []);

    return (
      <Animated.View
        key={index}
        style={[
          styles.cardContainer,
          {
            opacity: cardAnim,
            transform: [
              {
                translateY: cardAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [50, 0],
                }),
              },
            ],
          },
        ]}
      >
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate(item.screen, item.params ?? {})}
          activeOpacity={0.8}
        >
          <LinearGradient 
            colors={item.gradient} 
            style={styles.iconContainer}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.iconInner}>
              <Ionicons name={item.icon} size={28} color="#fff" />
            </View>
          </LinearGradient>
          <Text style={styles.label}>{item.label}</Text>
          <View style={styles.cardGlow} />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#667eea" />
      
      {/* Header Section */}
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Animated.View
          style={[
            styles.headerContent,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <View style={styles.avatarContainer}>
            <LinearGradient
              colors={['#fff', '#f8f9fa']}
              style={styles.avatar}
            >
              <Ionicons name="person" size={32} color="#667eea" />
            </LinearGradient>
          </View>
          <Text style={styles.welcome}>👋 Welcome back!</Text>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.subtitle}>What would you like to do today?</Text>
        </Animated.View>
        
        {/* Floating Elements */}
        <View style={styles.floatingElement1} />
        <View style={styles.floatingElement2} />
        <View style={styles.floatingElement3} />
      </LinearGradient>

      {/* Content Section */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.grid}>
          {menuItems.map((item, index) => renderCard(item, index))}
        </View>
        
        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    height: height * 0.35,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: 'relative',
    overflow: 'hidden',
  },
  headerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  avatarContainer: {
    marginBottom: 15,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  welcome: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 5,
  },
  username: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  floatingElement1: {
    position: 'absolute',
    top: 50,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  floatingElement2: {
    position: 'absolute',
    top: 120,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  floatingElement3: {
    position: 'absolute',
    bottom: 40,
    right: 60,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardContainer: {
    width: '48%',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  iconInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  label: {
    color: '#2d3748',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 20,
  },
  cardGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 24,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  bottomSpacing: {
    height: 30,
  },
});
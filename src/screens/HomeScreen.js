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
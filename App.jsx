
{/*import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import EmployeeList from './src/screens/EmployeeList';
import EmployeeProfile from './src/screens/EmployeeProfile';
import AddEditEmployee from './src/screens/AddEditEmployee';
import AttendanceScreen from './src/screens/AttendanceScreen';
import LeaveApplication from './src/screens/LeaveApplication';
import SignupScreen from './src/screens/SignupScreen';
import LeaveStatus from './src/screens/LeaveStatus';
import SalaryScreen from './src/screens/SalaryScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import TaskScreen from './src/screens/TaskScreen';
import ChatScreen from './src/screens/ChatScreen';
import HolidayScreen from './src/screens/HolidayScreen';
import Admin from './src/screens/Admin';
import Addemp from './src/screens/Addemp';
import Showemp from './src/screens/Showemp';
import CalendarScreen from './src/screens/CalendarScreen';
import StatsScreen from './src/screens/StatsScreen';
import DocumentsScreen from './src/screens/DocumentsScreen';
import HelpScreen from './src/screens/HelpScreen';
import MyTeamScreen from './src/screens/MyTeamScreen';




import EditProfileScreen from './src/screens/EditProfileScreen';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: true }}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="EmployeeList" component={EmployeeList} />
                <Stack.Screen name="EmployeeProfile" component={EmployeeProfile} />
                <Stack.Screen name="AddEditEmployee" component={AddEditEmployee} />
                <Stack.Screen name="Attendance" component={AttendanceScreen} />
                <Stack.Screen name="LeaveApplication" component={LeaveApplication} />
                <Stack.Screen name="Signup" component={SignupScreen} />
                <Stack.Screen name="LeaveStatus" component={LeaveStatus} />
                <Stack.Screen name="Salary" component={SalaryScreen} />
                <Stack.Screen name="Settings" component={SettingsScreen} />
                <Stack.Screen name="Task" component={TaskScreen} />
                <Stack.Screen name="Chat" component={ChatScreen} />
                <Stack.Screen name="Holiday" component={HolidayScreen} />
                <Stack.Screen name="Admin" component={Admin} />
                <Stack.Screen name="Addemp" component={Addemp} />
                <Stack.Screen name="Showemp" component={Showemp} />
                <Stack.Screen name='CalendarScreen'component={CalendarScreen}/>
                <Stack.Screen name='StatsScreen' component={StatsScreen}/>




                <Stack.Screen name="EditProfile" component={EditProfileScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
*/}
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens Import
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import HomeScreen from './src/screens/HomeScreen';
import EmployeeList from './src/screens/EmployeeList';
import EmployeeProfile from './src/screens/EmployeeProfile';
import AddEditEmployee from './src/screens/AddEditEmployee';
import AttendanceScreen from './src/screens/AttendanceScreen';
import LeaveApplication from './src/screens/LeaveApplication';
import LeaveStatus from './src/screens/LeaveStatus';
import SalaryScreen from './src/screens/SalaryScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import TaskScreen from './src/screens/TaskScreen';
import ChatScreen from './src/screens/ChatScreen';
import HolidayScreen from './src/screens/HolidayScreen';
import Admin from './src/screens/Admin';
import Addemp from './src/screens/Addemp';
import Showemp from './src/screens/Showemp';
import EditProfileScreen from './src/screens/EditProfileScreen';

// ✅ New Screens Added
import CalendarScreen from './src/screens/CalendarScreen';
import StatsScreen from './src/screens/StatsScreen';
import DocumentsScreen from './src/screens/DocumentsScreen';
import HelpScreen from './src/screens/HelpScreen';
import MyTeamScreen from './src/screens/MyTeamScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: true }}>

        {/* Auth Screens */}
        
        <Stack.Screen name="Login" component={LoginScreen} />

        <Stack.Screen name="Signup" component={SignupScreen} />

        {/* Home / Dashboard */}
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        {/* Employee Screens */}

        <Stack.Screen name="EmployeeList" component={EmployeeList} />
        <Stack.Screen name="EmployeeProfile" component={EmployeeProfile} />
        <Stack.Screen name="AddEditEmployee" component={AddEditEmployee} />
        <Stack.Screen name="AttendanceScreen" component={AttendanceScreen} />
        <Stack.Screen name="LeaveApplication" component={LeaveApplication} />
        <Stack.Screen name="LeaveStatus" component={LeaveStatus} />
        <Stack.Screen name="SalaryScreen" component={SalaryScreen} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        <Stack.Screen name="TaskScreen" component={TaskScreen} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="HolidayScreen" component={HolidayScreen} />

        {/* Admin Specific */}
        <Stack.Screen name="Admin" component={Admin} />
        <Stack.Screen name="Addemp" component={Addemp} />
        <Stack.Screen name="Showemp" component={Showemp} />

        {/* Profile */}
        <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />

        {/* ✅ Newly Added Screens for Dashboard */}
        <Stack.Screen name="CalendarScreen" component={CalendarScreen} />
        <Stack.Screen name="StatsScreen" component={StatsScreen} />
        <Stack.Screen name="DocumentsScreen" component={DocumentsScreen} />
        <Stack.Screen name="HelpScreen" component={HelpScreen} />
        <Stack.Screen name="MyTeamScreen" component={MyTeamScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

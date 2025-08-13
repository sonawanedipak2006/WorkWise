//main working clean ui
{/*import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
  Animated,
  StatusBar,
} from 'react-native';
import { storeData, getData } from '../utils/userStorage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

export default function SignupScreen({ navigation }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    department: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));

  useEffect(() => {
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

  const handleSignup = async () => {
    const { name, email, password, phone, department } = form;

    if (!name || !email || !password || !phone || !department) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!gmailRegex.test(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid Gmail address (e.g. abc@gmail.com)');
      return;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      Alert.alert('Invalid Phone Number', 'Phone number must be exactly 10 digits');
      return;
    }

    const employees = (await getData('employees')) || [];
    const updatedList = [...employees, form];
    await storeData('employees', updatedList);

    Alert.alert('Success', 'Signup completed');
    navigation.navigate('Login');
  };

  const InputField = ({ icon, placeholder, value, onChangeText, secureTextEntry, keyboardType, autoCapitalize, maxLength, isPassword }) => (
    <View style={styles.inputContainer}>
      <View style={styles.inputIconContainer}>
        <Ionicons name={icon} size={20} color="#667eea" />
      </View>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        maxLength={maxLength}
      />
      {isPassword && (
        <TouchableOpacity 
          style={styles.eyeIconContainer}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Ionicons 
            name={showPassword ? 'eye-off' : 'eye'} 
            size={20} 
            color="#667eea" 
          />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#667eea" />
      
      
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.backgroundGradient}
      />
      
      <View style={styles.floatingCircle1} />
      <View style={styles.floatingCircle2} />
      <View style={styles.floatingCircle3} />
      
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContainer}
        enableOnAndroid={true}
        extraScrollHeight={20}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={[
            styles.contentContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          
          <View style={styles.headerSection}>
            <View style={styles.logoContainer}>
              <LinearGradient
                colors={['#fff', '#f8f9fa']}
                style={styles.logo}
              >
                <Ionicons name="person-add" size={40} color="#667eea" />
              </LinearGradient>
            </View>
            <Text style={styles.heading}>Create Account</Text>
            <Text style={styles.subheading}>Join our amazing team today!</Text>
          </View>

       
          <View style={styles.formContainer}>
            <InputField
              icon="person-outline"
              placeholder="Full Name"
              value={form.name}
              onChangeText={(text) => setForm({ ...form, name: text })}
            />

            <InputField
              icon="mail-outline"
              placeholder="Email (must be @gmail.com)"
              value={form.email}
              onChangeText={(text) => setForm({ ...form, email: text })}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <InputField
              icon="lock-closed-outline"
              placeholder="Password"
              value={form.password}
              onChangeText={(text) => setForm({ ...form, password: text })}
              secureTextEntry={!showPassword}
              isPassword={true}
            />

            <InputField
              icon="call-outline"
              placeholder="Phone (10 digits)"
              value={form.phone}
              onChangeText={(text) => setForm({ ...form, phone: text })}
              keyboardType="phone-pad"
              maxLength={10}
            />

            <InputField
              icon="business-outline"
              placeholder="Department"
              value={form.department}
              onChangeText={(text) => setForm({ ...form, department: text })}
            />

           
            <TouchableOpacity 
              style={styles.buttonContainer}
              onPress={handleSignup}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#667eea', '#764ba2']}
                style={styles.button}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.buttonText}>Create Account</Text>
                <Ionicons name="arrow-forward" size={20} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>

         
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>
                Already have an account?{' '}
                <Text 
                  style={styles.loginLink} 
                  onPress={() => navigation.navigate('Login')}
                >
                  Login
                </Text>
              </Text>
            </View>
          </View>
        </Animated.View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.4,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  floatingCircle1: {
    position: 'absolute',
    top: 80,
    right: 30,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  floatingCircle2: {
    position: 'absolute',
    top: 150,
    left: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  floatingCircle3: {
    position: 'absolute',
    top: 200,
    right: 80,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 25,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 60,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subheading: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    paddingHorizontal: 16,
    height: 56,
  },
  inputIconContainer: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#2d3748',
    fontWeight: '500',
  },
  eyeIconContainer: {
    padding: 4,
  },
  buttonContainer: {
    marginTop: 10,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },
  loginContainer: {
    marginTop: 25,
    alignItems: 'center',
  },
  loginText: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
  },
  loginLink: {
    color: '#667eea',
    fontWeight: 'bold',
  },
});
*/}

{/*import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Dimensions,
} from 'react-native';
import { storeData } from './utils/userStorage';
import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

export default function SignupScreen({ navigation }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    department: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async () => {
    if (!form.name || !form.email || !form.password || !form.phone || !form.department) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    // Phone validation
    if (form.phone.length < 10) {
      Alert.alert('Error', 'Phone number must be at least 10 digits');
      return;
    }

    try {
      // Get existing employees
      const existingEmployees = await getData('employees') || [];
      
      // Check if email already exists
      const emailExists = existingEmployees.find(emp => emp.email === form.email);
      if (emailExists) {
        Alert.alert('Error', 'Email already registered. Please use a different email.');
        return;
      }

      // Create new employee with ID
      const newEmployee = {
        ...form,
        id: Date.now().toString(),
        joinDate: new Date().toLocaleDateString(),
        role: 'Employee'
      };

      // Add to employees list
      const updatedEmployees = [...existingEmployees, newEmployee];
      await storeData('employees', updatedEmployees);

      Alert.alert(
        'Success', 
        'Account created successfully!',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login')
          }
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to create account. Please try again.');
    }
  };

  const updateForm = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView 
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.header}>
              <TouchableOpacity 
                style={styles.backButton} 
                onPress={() => navigation.goBack()}
              >
                <Icon name="arrow-back" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            <View style={styles.brandSection}>
              <View style={styles.logoContainer}>
                <Text style={styles.logoIcon}>🚀</Text>
              </View>
              <Text style={styles.brandName}>WorkWise</Text>
              <Text style={styles.tagline}>Join Our Professional Community</Text>
            </View>

            <View style={styles.formSection}>
              <Text style={styles.welcomeText}>Create Account</Text>
              <Text style={styles.subtitleText}>Start your professional journey today!</Text>

              <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputIconContainer}>
                    <Icon name="person-outline" size={20} color="#667eea" />
                  </View>
                  <TextInput
                    style={styles.input}
                    placeholder="Full Name"
                    placeholderTextColor="#9CA3AF"
                    value={form.name}
                    onChangeText={(text) => updateForm('name', text)}
                    autoCapitalize="words"
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputIconContainer}>
                    <Icon name="mail-outline" size={20} color="#667eea" />
                  </View>
                  <TextInput
                    style={styles.input}
                    placeholder="Email Address"
                    placeholderTextColor="#9CA3AF"
                    value={form.email}
                    onChangeText={(text) => updateForm('email', text)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputIconContainer}>
                    <Icon name="lock-closed-outline" size={20} color="#667eea" />
                  </View>
                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#9CA3AF"
                    value={form.password}
                    onChangeText={(text) => updateForm('password', text)}
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Icon 
                      name={showPassword ? 'eye-off' : 'eye'} 
                      size={20} 
                      color="#667eea" 
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputIconContainer}>
                    <Icon name="call-outline" size={20} color="#667eea" />
                  </View>
                  <TextInput
                    style={styles.input}
                    placeholder="Phone Number"
                    placeholderTextColor="#9CA3AF"
                    value={form.phone}
                    onChangeText={(text) => updateForm('phone', text)}
                    keyboardType="phone-pad"
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputIconContainer}>
                    <Icon name="business-outline" size={20} color="#667eea" />
                  </View>
                  <TextInput
                    style={styles.input}
                    placeholder="Department"
                    placeholderTextColor="#9CA3AF"
                    value={form.department}
                    onChangeText={(text) => updateForm('department', text)}
                    autoCapitalize="words"
                  />
                </View>
              </View>

              <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
                <Text style={styles.signupButtonText}>Create Account</Text>
              </TouchableOpacity>

              <View style={styles.loginSection}>
                <Text style={styles.loginText}>
                  Already have an account?{' '}
                  <Text 
                    style={styles.loginLink} 
                    onPress={() => navigation.navigate('Login')}
                  >
                    Sign In
                  </Text>
                </Text>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#667eea',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  backButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  brandSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  logoIcon: {
    fontSize: 40,
  },
  brandName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  tagline: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  formSection: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 25,
    paddingTop: 30,
    paddingBottom: 30,
    flex: 1,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f3c88',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  inputIconContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#1f2937',
    paddingHorizontal: 15,
  },
  eyeIcon: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupButton: {
    backgroundColor: '#667eea',
    paddingVertical: 16,
    borderRadius: 15,
    marginTop: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loginSection: {
    marginTop: 25,
    alignItems: 'center',
  },
  loginText: {
    fontSize: 16,
    color: '#6b7280',
  },
  loginLink: {
    color: '#667eea',
    fontWeight: '600',
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
  StyleSheet,
  Alert,
  ScrollView,
  Keyboard, // <-- Import Keyboard
} from 'react-native';
import { storeData, getData } from '../utils/userStorage';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function SignupScreen({ navigation }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    department: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async () => {
    const { name, email, password, phone, department } = form;

    if (!name || !email || !password || !phone || !department) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!gmailRegex.test(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid Gmail address (e.g. abc@gmail.com)');
      return;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      Alert.alert('Invalid Phone Number', 'Phone number must be exactly 10 digits');
      return;
    }

    const employees = (await getData('employees')) || [];
    const updatedList = [...employees, form];
    await storeData('employees', updatedList);

    Alert.alert('Success', 'Signup completed');
    navigation.navigate('Login');
  };

  const InputField = ({ icon, placeholder, value, onChangeText, secureTextEntry, keyboardType, maxLength, isPassword }) => (
    <View style={styles.inputContainer}>
      <Ionicons name={icon} size={20} color="#667eea" style={{ marginRight: 8 }} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={(text) => {
          onChangeText(text);
          if (text.length === 1) {
            Keyboard.dismiss(); // <-- Hide keyboard after first letter
          }
        }}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        maxLength={maxLength}
        placeholderTextColor="#999"
      />
      {isPassword && (
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={20} color="#667eea" />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Join our team today</Text>

      <InputField
        icon="person-outline"
        placeholder="Full Name"
        value={form.name}
        onChangeText={(text) => setForm({ ...form, name: text })}
      />

      <InputField
        icon="mail-outline"
        placeholder="Email (must be @gmail.com)"
        value={form.email}
        onChangeText={(text) => setForm({ ...form, email: text })}
        keyboardType="email-address"
      />

      <InputField
        icon="lock-closed-outline"
        placeholder="Password"
        value={form.password}
        onChangeText={(text) => setForm({ ...form, password: text })}
        secureTextEntry={!showPassword}
        isPassword
      />

      <InputField
        icon="call-outline"
        placeholder="Phone (10 digits)"
        value={form.phone}
        onChangeText={(text) => setForm({ ...form, phone: text })}
        keyboardType="phone-pad"
        maxLength={10}
      />

      <InputField
        icon="business-outline"
        placeholder="Department"
        value={form.department}
        onChangeText={(text) => setForm({ ...form, department: text })}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>

      <Text style={styles.loginText}>
        Already have an account?{' '}
        <Text
          style={styles.loginLink}
          onPress={() => navigation.navigate('Login')}
        >
          Login
        </Text>
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8fafc',
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 5 },
  subtitle: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 20 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  input: { flex: 1, fontSize: 16, paddingVertical: 10 },
  button: {
    backgroundColor: '#667eea',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  loginText: { textAlign: 'center', marginTop: 20, color: '#555' },
  loginLink: { color: '#667eea', fontWeight: 'bold' },
});
*/}


// src/screens/SignupScreen.js// src/screens/SignupScreen.js
import React, { useRef, useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ScrollView, Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth'; // <-- Firebase Auth import

export default function SignupScreen({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const passRef = useRef(null);
  const confirmRef = useRef(null);

  const validate = () => {
    if (fullName.trim().length < 2) return { ok: false, msg: 'Please enter a valid full name.' };
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) return { ok: false, msg: 'Please enter a valid email.' };
    if (!/^[0-9]{10}$/.test(phone.trim())) return { ok: false, msg: 'Phone must be 10 digits.' };
    if (password.length < 6) return { ok: false, msg: 'Password must be at least 6 characters.' };
    if (password !== confirm) return { ok: false, msg: 'Passwords do not match.' };
    return { ok: true };
  };

const onSignup = async () => {
  const v = validate();
  if (!v.ok) {
    Alert.alert('Validation', v.msg);
    return;
  }
  try {
    setLoading(true);

    // Firebase Signup
    const userCredential = await auth().createUserWithEmailAndPassword(email.trim(), password);

    // Full Name update
    await userCredential.user.updateProfile({
      displayName: fullName
    });

    Alert.alert('Success', 'Account created successfully', [
      { text: 'OK', onPress: () => navigation.replace('LoginScreen') }
    ]);

  } catch (e) {
    let message = e.message || 'Something went wrong';
    if (e.code === 'auth/email-already-in-use') {
      message = 'This email is already registered.';
    } else if (e.code === 'auth/invalid-email') {
      message = 'Invalid email address.';
    } else if (e.code === 'auth/weak-password') {
      message = 'Password is too weak (min 6 characters).';
    }
    Alert.alert('Signup Failed', message);
  } finally {
    setLoading(false);
  }
};
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Create Account</Text>

        {/* Full Name */}
        <View style={styles.inputWrap}>
          <Icon name="person-outline" size={20} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={fullName}
            onChangeText={setFullName}
            returnKeyType="next"
            autoCapitalize="words"
            autoCorrect={false}
            onSubmitEditing={() => emailRef.current?.focus()}
          />
        </View>

        {/* Email */}
        <View style={styles.inputWrap}>
          <Icon name="mail-outline" size={20} style={styles.inputIcon} />
          <TextInput
            ref={emailRef}
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => phoneRef.current?.focus()}
          />
        </View>

        {/* Phone */}
        <View style={styles.inputWrap}>
          <Icon name="call-outline" size={20} style={styles.inputIcon} />
          <TextInput
            ref={phoneRef}
            style={styles.input}
            placeholder="Phone (10 digits)"
            value={phone}
            onChangeText={setPhone}
            keyboardType="number-pad"
            maxLength={10}
            returnKeyType="next"
            onSubmitEditing={() => passRef.current?.focus()}
          />
        </View>

        {/* Password */}
        <View style={styles.inputWrap}>
          <Icon name="lock-closed-outline" size={20} style={styles.inputIcon} />
          <TextInput
            ref={passRef}
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPass}
            returnKeyType="next"
            onSubmitEditing={() => confirmRef.current?.focus()}
          />
          <TouchableOpacity onPress={() => setShowPass(p => !p)} style={styles.eye}>
            <Icon name={showPass ? 'eye-off-outline' : 'eye-outline'} size={20} />
          </TouchableOpacity>
        </View>

        {/* Confirm Password */}
        <View style={styles.inputWrap}>
          <Icon name="shield-checkmark-outline" size={20} style={styles.inputIcon} />
          <TextInput
            ref={confirmRef}
            style={styles.input}
            placeholder="Confirm Password"
            value={confirm}
            onChangeText={setConfirm}
            secureTextEntry={!showConfirm}
            returnKeyType="done"
            onSubmitEditing={onSignup}
          />
          <TouchableOpacity onPress={() => setShowConfirm(c => !c)} style={styles.eye}>
            <Icon name={showConfirm ? 'eye-off-outline' : 'eye-outline'} size={20} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.primaryBtn, loading && { opacity: 0.6 }]}
          onPress={onSignup}
          disabled={loading}
        >
          <Text style={styles.primaryText}>{loading ? 'Creating...' : 'Sign Up'}</Text>
        </TouchableOpacity>

        <View style={styles.row}>
          <Text style={styles.small}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={[styles.small, { color: '#3b82f6', fontWeight: '700' }]}>Log In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingTop: 40, flexGrow: 1, backgroundColor: '#f8fafc' },
  title: { fontSize: 26, fontWeight: '800', marginBottom: 24, color: '#0f172a' },
  inputWrap: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 14,
    borderWidth: 1, borderColor: '#e5e7eb', paddingHorizontal: 12, marginBottom: 14, height: 52,
  },
  inputIcon: { marginRight: 8, color: '#475569' },
  input: { flex: 1, fontSize: 16, color: '#111827' },
  eye: { paddingHorizontal: 8, paddingVertical: 6 },
  primaryBtn: {
    height: 52, backgroundColor: '#2563eb', borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginTop: 8,
  },
  primaryText: { color: '#fff', fontSize: 16, fontWeight: '700', letterSpacing: 0.2 },
  row: { flexDirection: 'row', justifyContent: 'center', marginTop: 14 },
  small: { color: '#334155', fontSize: 14 },
});

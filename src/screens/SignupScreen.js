{/*import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { storeData, getData } from '../utils/userStorage';
import Icon from 'react-native-vector-icons/Ionicons';

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
    if (!form.name || !form.email || !form.password) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    const employees = (await getData('employees')) || [];
    const updatedList = [...employees, form];
    await storeData('employees', updatedList);
    Alert.alert('Success', 'Signup completed');
    navigation.navigate('Login');
  };

  return (
    <ImageBackground
      source={require('../assets/signup-bg.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
         
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#ccc"
            onChangeText={(text) => setForm({ ...form, name: text })}
            value={form.name}
          />

         
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#ccc"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={(text) => setForm({ ...form, email: text })}
            value={form.email}
          />

          
          <View style={styles.passwordWrapper}>
            <TextInput
              style={[styles.input, { flex: 1, marginBottom: 0, borderRightWidth: 0 }]}
              placeholder="Password"
              placeholderTextColor="#ccc"
              secureTextEntry={!showPassword}
              onChangeText={(text) => setForm({ ...form, password: text })}
              value={form.password}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            >
              <Icon name={showPassword ? 'eye-off' : 'eye'} size={22} color="#ccc" />
            </TouchableOpacity>
          </View>
          <View style={{ height: 15 }} />

       
          <TextInput
            style={styles.input}
            placeholder="Phone"
            placeholderTextColor="#ccc"
            keyboardType="phone-pad"
            onChangeText={(text) => setForm({ ...form, phone: text })}
            value={form.phone}
          />

         
          <TextInput
            style={styles.input}
            placeholder="Department"
            placeholderTextColor="#ccc"
            onChangeText={(text) => setForm({ ...form, department: text })}
            value={form.department}
          />

          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
            Already registered? <Text style={styles.loginText}>Login</Text>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 25,
  },
  input: {
    height: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#aaa',
    marginBottom: 15,
  },
  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#aaa',
  },
  eyeIcon: {
    paddingHorizontal: 12,
    justifyContent: 'center',
    height: 50,
  },
  button: {
    backgroundColor: '#00c853',
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 10,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '600',
  },
  link: {
    marginTop: 20,
    textAlign: 'center',
    color: '#eee',
  },
  loginText: {
    color: '#00f',
    fontWeight: '600',
  },
});
*/}
import React, { useState, useEffect } from 'react';
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
      
      {/* Background Gradient */}
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.backgroundGradient}
      />
      
      {/* Floating Elements */}
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
          {/* Header Section */}
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

          {/* Form Section */}
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

            {/* Sign Up Button */}
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

            {/* Login Link */}
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
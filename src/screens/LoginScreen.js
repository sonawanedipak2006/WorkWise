{/*import React, { useState, useRef, useEffect } from 'react';
import {
View,
Text,
TextInput,
TouchableOpacity,
StyleSheet,
Alert,
KeyboardAvoidingView,
Platform,
ScrollView,
Keyboard,
Dimensions,
Animated,
StatusBar,
} from 'react-native';
import { getData } from '../utils/userStorage';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function LoginScreen({ navigation }) {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [showPassword, setShowPassword] = useState(false);
const [fadeAnim] = useState(new Animated.Value(0));
const [slideAnim] = useState(new Animated.Value(50));
const [scaleAnim] = useState(new Animated.Value(0.8));

const scrollRef = useRef();

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
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 50,
      friction: 7,
      useNativeDriver: true,
    }),
  ]).start();
}, []);

const handleAdminLogin = () => {
  if (email === 'admin@gmail.com' && password === 'admin@123') {
    navigation.navigate('Admin', { user: 'Admin' });
  } else {
    Alert.alert('Error', 'Invalid admin credentials');
  }
};

const handleEmployeeLogin = async () => {
  const employees = (await getData('employees')) || [];
  const match = employees.find(
    emp => emp.email === email && emp.password === password
  );
  if (match) {
    navigation.navigate('HomeScreen', { user: match });
  } else {
    Alert.alert('Error', 'Invalid employee credentials');
  }
};

const InputField = ({ icon, placeholder, value, onChangeText, secureTextEntry, keyboardType, autoCapitalize, onFocus }) => (
  <View style={styles.inputContainer}>
    <View style={styles.inputIconContainer}>
      <Icon name={icon} size={20} color="#667eea" />
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
      onFocus={onFocus}
    />
    {secureTextEntry !== undefined && (
      <TouchableOpacity 
        style={styles.eyeIconContainer}
        onPress={() => setShowPassword(!showPassword)}
      >
        <Icon 
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
    <View style={styles.floatingCircle4} />
    
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.wrapper}
    >
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={[
            styles.contentContainer,
            {
              opacity: fadeAnim,
              transform: [
                { translateY: slideAnim },
                { scale: scaleAnim }
              ],
            },
          ]}
        >
         
          <View style={styles.headerSection}>
            <View style={styles.logoContainer}>
              <LinearGradient
                colors={['#fff', '#f8f9fa']}
                style={styles.logo}
              >
                <Icon name="shield-checkmark" size={40} color="#667eea" />
              </LinearGradient>
            </View>
            <Text style={styles.heading}>Welcome Back</Text>
            <Text style={styles.subheading}>Sign in to continue your journey</Text>
          </View>

          <View style={styles.formContainer}>
            <InputField
              icon="mail-outline"
              placeholder="Email Address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              onFocus={() => {
                scrollRef.current?.scrollTo({ y: 100, animated: true });
              }}
            />

            <InputField
              icon="lock-closed-outline"
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              onFocus={() => {
                scrollRef.current?.scrollTo({ y: 150, animated: true });
              }}
            />

           
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={styles.adminButtonContainer}
                onPress={handleAdminLogin}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['#667eea', '#764ba2']}
                  style={styles.adminButton}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Icon name="shield" size={20} color="#fff" />
                  <Text style={styles.buttonText}>Login as Admin</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.empButtonContainer}
                onPress={handleEmployeeLogin}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['#11998e', '#38ef7d']}
                  style={styles.empButton}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Icon name="people" size={20} color="#fff" />
                  <Text style={styles.buttonText}>Login as Employee</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

          
            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>
                Don't have an account?{' '}
                <Text 
                  style={styles.signupLink} 
                  onPress={() => navigation.navigate('Signup')}
                >
                  Create Account
                </Text>
              </Text>
            </View>
          </View>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  height: height * 0.45,
  borderBottomLeftRadius: 40,
  borderBottomRightRadius: 40,
},
floatingCircle1: {
  position: 'absolute',
  top: 60,
  right: 30,
  width: 80,
  height: 80,
  borderRadius: 40,
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
},
floatingCircle2: {
  position: 'absolute',
  top: 120,
  left: 20,
  width: 60,
  height: 60,
  borderRadius: 30,
  backgroundColor: 'rgba(255, 255, 255, 0.08)',
},
floatingCircle3: {
  position: 'absolute',
  top: 180,
  right: 80,
  width: 40,
  height: 40,
  borderRadius: 20,
  backgroundColor: 'rgba(255, 255, 255, 0.06)',
},
floatingCircle4: {
  position: 'absolute',
  top: 220,
  left: 80,
  width: 50,
  height: 50,
  borderRadius: 25,
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
},
wrapper: {
  flex: 1,
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
},
adminButtonContainer: {
  borderRadius: 16,
  overflow: 'hidden',
  shadowColor: '#667eea',
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 0.3,
  shadowRadius: 12,
  elevation: 8,
  marginBottom: 12,
},
adminButton: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 16,
  paddingHorizontal: 24,
},
empButtonContainer: {
  borderRadius: 16,
  overflow: 'hidden',
  shadowColor: '#11998e',
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 0.3,
  shadowRadius: 12,
  elevation: 8,
},
empButton: {
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
  marginLeft: 8,
},
signupContainer: {
  marginTop: 25,
  alignItems: 'center',
},
signupText: {
  fontSize: 16,
  color: '#64748b',
  textAlign: 'center',
},
signupLink: {
  color: '#667eea',
  fontWeight: 'bold',
},
}); 
*/}

{/*import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Dimensions,
  Animated,
} from 'react-native';
import { getData, storeData } from '../utils/userStorage';



import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  const handleAdminLogin = () => {
    if (email === 'admin@gmail.com' && password === 'admin@123') {
      const adminUser = {
        name: 'Admin',
        email: 'admin@gmail.com',
        role: 'Admin',
        department: 'Administration'
      };
      storeData('currentUser', adminUser);
      storeData('isLoggedIn', true);
      navigation.navigate('Admin', { user: adminUser });
    } else {
      Alert.alert('Error', 'Invalid admin credentials');
    }
  };

  const handleEmployeeLogin = async () => {
    try {
      const employees = await getData('employees') || [];
      const match = employees.find(
        emp => emp.email === email && emp.password === password
      );
      
      if (match) {
        await storeData('currentUser', match);
        await storeData('isLoggedIn', true);
        navigation.navigate('HomeScreen', { user: match });
      } else {
        Alert.alert('Error', 'Invalid email or password');
      }
    } catch (error) {
      Alert.alert('Error', 'Login failed. Please try again.');
    }
  };

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    if (email === 'admin@gmail.com') {
      handleAdminLogin();
    } else {
      handleEmployeeLogin();
    }
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
              <View style={styles.headerContent}>
                <Text style={styles.headerTitle}>Welcome Back!</Text>
                <Text style={styles.headerSubtitle}>Sign in to continue</Text>
              </View>
            </View>

            <Animated.View 
              style={[
                styles.formSection,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }]
                }
              ]}
            >
              <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputIconContainer}>
                    <Icon name="mail-outline" size={20} color="#667eea" />
                  </View>
                  <TextInput
                    style={styles.input}
                    placeholder="Email Address"
                    placeholderTextColor="#9CA3AF"
                    value={email}
                    onChangeText={setEmail}
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
                    value={password}
                    onChangeText={setPassword}
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

              <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Sign In</Text>
              </TouchableOpacity>

              <View style={styles.signupSection}>
                <Text style={styles.signupText}>
                  Don't have an account?{' '}
                  <Text 
                    style={styles.signupLink} 
                    onPress={() => navigation.navigate('Signup')}
                  >
                    Sign Up
                  </Text>
                </Text>
              </View>

              <View style={styles.demoSection}>
                <Text style={styles.demoTitle}>Demo Credentials:</Text>
                <Text style={styles.demoText}>Admin: admin@gmail.com / admin@123</Text>
                <Text style={styles.demoText}>Employee: Use your registered email</Text>
              </View>
            </Animated.View>
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
    paddingHorizontal: 25,
    paddingTop: 80,
    paddingBottom: 40,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  headerSubtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  formSection: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 25,
    paddingTop: 40,
    paddingBottom: 30,
    flex: 1,
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
  loginButton: {
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
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  signupSection: {
    marginTop: 25,
    alignItems: 'center',
  },
  signupText: {
    fontSize: 16,
    color: '#6b7280',
  },
  signupLink: {
    color: '#667eea',
    fontWeight: '600',
  },
  demoSection: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#f8fafc',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  demoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 10,
  },
  demoText: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 5,
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
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { getData } from '../utils/userStorage';
import Icon from 'react-native-vector-icons/Ionicons';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleAdminLogin = () => {
    if (email === 'admin@gmail.com' && password === 'admin@123') {
      navigation.navigate('Admin', { user: 'Admin' });
    } else {
      Alert.alert('Error', 'Invalid admin credentials');
    }
  };

  const handleEmployeeLogin = async () => {
    const employees = (await getData('employees')) || [];
    const match = employees.find(
      emp => emp.email === email && emp.password === password
    );
    if (match) {
      navigation.navigate('HomeScreen', { user: match });
    } else {
      Alert.alert('Error', 'Invalid employee credentials');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Login</Text>

        <View style={styles.inputContainer}>
          <Icon name="mail-outline" size={20} color="#555" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="lock-closed-outline" size={20} color="#555" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon
              name={showPassword ? 'eye-off' : 'eye'}
              size={20}
              color="#555"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.adminButton} onPress={handleAdminLogin}>
          <Text style={styles.buttonText}>Login as Admin</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.empButton} onPress={handleEmployeeLogin}>
          <Text style={styles.buttonText}>Login as Employee</Text>
        </TouchableOpacity>

        <Text style={styles.signupText}>
          Don’t have an account?{' '}
          <Text
            style={styles.signupLink}
            onPress={() => navigation.navigate('Signup')}
          >
            Create Account
          </Text>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  scrollContainer: { flexGrow: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 },
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
  icon: { marginRight: 8 },
  input: { flex: 1, fontSize: 16, paddingVertical: 10 },
  adminButton: {
    backgroundColor: '#667eea',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  empButton: {
    backgroundColor: '#38a169',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  signupText: { textAlign: 'center', marginTop: 20, color: '#555' },
  signupLink: { color: '#667eea', fontWeight: 'bold' },
});
*/}

{/*}
// src/screens/LoginScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    try {
      setLoading(true);
      // Firebase Auth sign in
      const userCredential = await auth().signInWithEmailAndPassword(email, password);

      // Check if user exists in Firestore database
      const userDoc = await firestore()
        .collection('employees')
        .doc(userCredential.user.uid)
        .get();

      if (userDoc.exists) {
        Alert.alert('Success', 'Login successful');
        navigation.replace('HomeScreen'); // Go to home
      } else {
        // If not found in database, sign out
        await auth().signOut();
        Alert.alert('Error', 'You are not registered as an employee');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Login Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Employee Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Logging in...' : 'Login'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
        <Text style={styles.link}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    textAlign: 'center',
    color: '#007bff',
  },
});
*/}{/*}
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // 🔹 Admin Login
  const handleAdminLogin = () => {
    if (email === 'admin@gmail.com' && password === '55555') {
      Alert.alert('Success', 'Welcome Admin!');
      navigation.replace('Admin');
    } else {
      Alert.alert('Error', 'Invalid admin credentials');
    }
  };

  // 🔹 Employee Login
  const handleEmployeeLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    try {
      setLoading(true);

      const userCredential = await auth().signInWithEmailAndPassword(email, password);

      const userDoc = await firestore()
        .collection('employees')
        .doc(userCredential.user.uid)
        .get();

      if (userDoc.exists) {
        Alert.alert('Success', 'Login successful');
        navigation.replace('HomeScreen');
      } else {
        await auth().signOut();
        Alert.alert('Error', 'You are not registered as an employee');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Login Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#ff9800' }]}
        onPress={handleAdminLogin}
      >
        <Text style={styles.buttonText}>Admin Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#007bff', marginTop: 10 }]}
        onPress={handleEmployeeLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Logging in...' : 'Employee Login'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
        <Text style={styles.link}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  button: {
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    textAlign: 'center',
    color: '#007bff',
  },
});
*/}

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // 🔹 Admin Login
  const handleAdminLogin = () => {
    if (email === 'admin@gmail.com' && password === '55555') {
      navigation.replace('Admin'); // ✅ No success alert
    } else {
      Alert.alert('Error', 'Invalid admin credentials');
    }
  };

  // 🔹 Employee Login
  const handleEmployeeLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    try {
      setLoading(true);

      const userCredential = await auth().signInWithEmailAndPassword(email, password);

      const userDoc = await firestore()
        .collection('employees')
        .doc(userCredential.user.uid)
        .get();

      if (userDoc.exists) {
        navigation.replace('HomeScreen'); // ✅ No success alert
      } else {
        await auth().signOut();
        Alert.alert('Error', 'You are not registered as an employee');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Login Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Admin Login Button */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#ff9800' }]}
        onPress={handleAdminLogin}
      >
        <Text style={styles.buttonText}>Admin Login</Text>
      </TouchableOpacity>

      {/* Employee Login Button */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#007bff', marginTop: 10 }]}
        onPress={handleEmployeeLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Logging in...' : 'Employee Login'}
        </Text>
      </TouchableOpacity>

      {/* Signup Redirect */}
      <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
        <Text style={styles.link}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  button: {
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    textAlign: 'center',
    color: '#007bff',
  },
});

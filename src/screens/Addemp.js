import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  FlatList,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const STORAGE_KEY = '@employee_data';

const roles = [
  'Developer', 'Designer', 'Manager', 'Tester', 'HR', 'Intern',
  'Team Lead', 'Project Manager', 'QA Engineer', 'Business Analyst',
  'DevOps Engineer', 'UI/UX Designer', 'Technical Writer',
  'Support Engineer', 'Frontend Developer', 'Backend Developer',
  'Full Stack Developer', 'Mobile App Developer', 'React Native Developer',
  'Flutter Developer', 'Scrum Master', 'Software Engineer',
  'Data Analyst', 'Data Scientist', 'Machine Learning Engineer',
  'Cloud Architect', 'System Administrator', 'Security Analyst',
  'Database Administrator', 'SEO Specialist', 'Content Writer',
  'Product Owner', 'Network Engineer'
];


const departments = [
  'Engineering', 'Design', 'Marketing', 'Sales', 'HR', 'Support',
  'IT', 'Finance', 'Operations', 'Research & Development',
  'Customer Success', 'Administration', 'Product Management',
  'React Native Developer', 'Mobile Development', 'Web Development',
  'Quality Assurance', 'Cloud Services', 'Cybersecurity',
  'AI & ML', 'Data Science', 'DevOps', 'Legal', 'Training',
  'Procurement', 'Public Relations', 'Content & Media',
  'Business Intelligence', 'Networking', 'Technical Support'
];

export default function AddEditEmployee({ navigation, route }) {
  const existingEmployee = route.params?.employee;

  const [empId, setEmpId] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [department, setDepartment] = useState('');
  const [joinDate, setJoinDate] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');



  const [roleModalVisible, setRoleModalVisible] = useState(false);
  const [deptModalVisible, setDeptModalVisible] = useState(false);

  useEffect(() => {
    if (existingEmployee) {
      setEmpId(existingEmployee.empId);
      setName(existingEmployee.name);
      setRole(existingEmployee.role);
      setDepartment(existingEmployee.department);
      setJoinDate(existingEmployee.joinDate);
      setPhone(existingEmployee.phone);
      setEmail(existingEmployee.email);
      setAddress(existingEmployee.address);
      setNotes(existingEmployee.notes);
    }
  }, [existingEmployee]);

  const handleSave = async () => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    const phoneRegex = /^\d{10}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (!empId || !name || !role || !department || !joinDate) {
      Alert.alert('Error', 'Please fill all mandatory fields');
      return;
    }

    if (!dateRegex.test(joinDate)) {
      Alert.alert('Invalid Date', 'Please enter a valid date in YYYY-MM-DD format');
      return;
    }

    if (phone && !phoneRegex.test(phone)) {
      Alert.alert('Invalid Phone', 'Phone number must be exactly 10 digits');
      return;
    }

    if (!email.endsWith('@gmail.com') || !emailRegex.test(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid Gmail address ending with @gmail.com');
      return;
    }

    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      const employeeList = stored ? JSON.parse(stored) : [];

      let updatedList;
      if (existingEmployee) {
        updatedList = employeeList.map(emp =>
          emp.id === existingEmployee.id
            ? {
                ...emp,
                empId,
                name,
                role,
                department,
                joinDate,
                phone,
                email,
                address,
                notes,
              }
            : emp
        );
      } else {
        const newEmployee = {
          id: Date.now().toString(),
          empId,
          name,
          role,
          department,
          joinDate,
          phone,
          email,
          address,
          notes,
        };
        updatedList = [...employeeList, newEmployee];
      }

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
      navigation.goBack();
    } catch (error) {
      console.error('Error saving employee:', error);
      Alert.alert('Error', 'Something went wrong while saving.');
    }
  };

  const renderModal = (visible, setVisible, data, onSelect) => (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <FlatList
            data={data}
            keyExtractor={item => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  onSelect(item);
                  setVisible(false);
                }}
                style={styles.modalItem}
              >
                <Text style={styles.modalItemText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity onPress={() => setVisible(false)} style={styles.modalClose}>
            <Text style={styles.modalCloseText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, backgroundColor: '#f2f2f2' }}
      contentContainerStyle={styles.container}
      enableOnAndroid={true}
      extraScrollHeight={100}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.label}>Employee ID*</Text>
      <TextInput style={styles.input} value={empId} onChangeText={setEmpId} />

      <Text style={styles.label}>Full Name*</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Role / Designation*</Text>
      <TouchableOpacity onPress={() => setRoleModalVisible(true)} style={styles.dropdown}>
        <Text style={styles.dropdownText}>{role || 'Select Role'}</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Department*</Text>
      <TouchableOpacity onPress={() => setDeptModalVisible(true)} style={styles.dropdown}>
        <Text style={styles.dropdownText}>{department || 'Select Department'}</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Join Date (YYYY-MM-DD)*</Text>
      <TextInput
        style={styles.input}
        value={joinDate}
        onChangeText={(text) => setJoinDate(text.replace(/[^0-9-]/g, ''))}
        placeholder="e.g. 2025-08-06"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Phone Number</Text>
<TextInput
  style={[styles.input, phoneError ? styles.inputError : null]}
  keyboardType="numeric"
  value={phone}
  onChangeText={(text) => {
    setPhone(text);
    if (text.length > 0 && text.length < 10) {
      setPhoneError('Please enter a valid phone number');
    } else {
      setPhoneError('');
    }
  }}
  maxLength={10}
/>
{phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}


      <Text style={styles.label}>Email Address</Text>
<TextInput
  style={[styles.input, emailError ? styles.inputError : null]}
  value={email}
  onChangeText={(text) => {
    setEmail(text);
    if (!text.includes('@gmail.com')) {
      setEmailError('Please enter a valid Gmail address (e.g., example@gmail.com)');
    } else {
      setEmailError('');
    }
  }}
  keyboardType="email-address"
  placeholder="e.g. example@gmail.com"
/>
{emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}


      <Text style={styles.label}>Address</Text>
      <TextInput style={styles.input} value={address} onChangeText={setAddress} multiline />

      <Text style={styles.label}>Remarks / Notes</Text>
      <TextInput style={styles.input} value={notes} onChangeText={setNotes} multiline />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Employee</Text>
      </TouchableOpacity>

      {renderModal(roleModalVisible, setRoleModalVisible, roles, setRole)}
      {renderModal(deptModalVisible, setDeptModalVisible, departments, setDepartment)}
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 100,

  },
  inputError: {
  borderColor: 'red',
},
errorText: {
  color: 'red',
  fontSize: 12,
  marginTop: 4,
},

  label: {
    fontSize: 16,
    marginTop: 12,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 6,
    marginTop: 6,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  inputError: {
  borderColor: 'red',
},
errorText: {
  color: 'red',
  fontSize: 12,
  marginTop: 4,
},

  dropdown: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 6,
    marginTop: 6,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  dropdownText: {
    color: '#333',
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    margin: 32,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    maxHeight: '80%',
  },
  modalItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  modalItemText: {
    fontSize: 16,
  },
  modalClose: {
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#eee',
    marginTop: 10,
    borderRadius: 6,
  },
  modalCloseText: {
    fontWeight: 'bold',
  },
});

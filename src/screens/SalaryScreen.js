import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Keyboard,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const SalaryScreen = () => {
  const [year, setYear] = useState('');
  const [basic, setBasic] = useState('');
  const [hra, setHra] = useState('');
  const [bonus, setBonus] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [department, setDepartment] = useState('');
  const [salaryList, setSalaryList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [showNamePicker, setShowNamePicker] = useState(false);

  useEffect(() => {
    loadSalaryData();
    loadEmployeeList();
  }, []);

  const loadEmployeeList = async () => {
    try {
      const data = await AsyncStorage.getItem('employees');
      if (data) {
        setEmployeeList(JSON.parse(data));
      }
    } catch (err) {
      console.log('Error loading employees', err);
    }
  };

  const loadSalaryData = async () => {
    try {
      const data = await AsyncStorage.getItem('salaries');
      if (data !== null) {
        setSalaryList(JSON.parse(data));
      }
    } catch (error) {
      console.log('Error loading salary data', error);
    }
  };

  const saveSalaryData = async (newEntry) => {
    try {
      const updatedList = [newEntry, ...salaryList];
      await AsyncStorage.setItem('salaries', JSON.stringify(updatedList));
      setSalaryList(updatedList);
    } catch (error) {
      console.log('Error saving salary data', error);
    }
  };

  const handleAddSalary = () => {
    if (!year || !basic || !hra || bonus === '' || !employeeName || !department) {
      Alert.alert('Please fill all fields');
      return;
    }

    const newEntry = {
      id: Date.now().toString(),
      employeeName,
      department,
      month: year,
      basic: parseFloat(basic),
      hra: parseFloat(hra),
      bonus: parseFloat(bonus),
      total: parseFloat(basic) + parseFloat(hra) + parseFloat(bonus),
    };

    saveSalaryData(newEntry);
    setYear('');
    setBasic('');
    setHra('');
    setBonus('');
    setEmployeeName('');
    setDepartment('');
  };

  const handleNameSelect = (name, dept) => {
    setEmployeeName(name);
    setDepartment(dept);
    setShowNamePicker(false);
    Keyboard.dismiss();
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>➕ Add Salary Entry</Text>

      <View style={styles.form}>
        {/* Employee Name Input */}
        <View style={{ position: 'relative' }}>
          <TextInput
            style={styles.input}
            placeholder="👤 Employee Name"
            value={employeeName}
            onFocus={() => setShowNamePicker(true)}
            onChangeText={(text) => {
              setEmployeeName(text);
              setShowNamePicker(true);
            }}
          />

          {/* Side Dropdown */}
          {showNamePicker && employeeList.length > 0 && (
            <ScrollView style={styles.dropdown}>
              {employeeList
                .filter(emp =>
                  emp.name.toLowerCase().includes(employeeName.toLowerCase())
                )
                .map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.dropdownItem}
                    onPress={() => handleNameSelect(item.name, item.department || '')}
                  >
                    <Text style={{ fontSize: 16 }}>{item.name}</Text>
                  </TouchableOpacity>
                ))}
            </ScrollView>
          )}
        </View>

        <TextInput
          style={styles.input}
          placeholder="🏢 Department"
          value={department}
          onChangeText={setDepartment}
        />

        <TextInput
          style={styles.input}
          placeholder="📅 Year (e.g. 2025)"
          keyboardType="numeric"
          value={year}
          onChangeText={setYear}
        />
        <TextInput
          style={styles.input}
          placeholder="💼 Basic"
          keyboardType="numeric"
          value={basic}
          onChangeText={setBasic}
        />
        <TextInput
          style={styles.input}
          placeholder="🏠 HRA"
          keyboardType="numeric"
          value={hra}
          onChangeText={setHra}
        />
        <TextInput
          style={styles.input}
          placeholder="🎁 Bonus"
          keyboardType="numeric"
          value={bonus}
          onChangeText={setBonus}
        />

        <TouchableOpacity style={styles.button} onPress={handleAddSalary}>
          <Text style={styles.buttonText}>💾 Save Salary</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitle}>📋 Stored Salary Records</Text>

      {salaryList.map((item) => (
        <View style={styles.card} key={item.id}>
          <Text style={styles.cardMonth}>📅 {item.month}</Text>
          <Text style={styles.line}>👤 {item.employeeName} ({item.department})</Text>
          <Text style={styles.line}>💼 Basic: ₹{item.basic}</Text>
          <Text style={styles.line}>🏠 HRA: ₹{item.hra}</Text>
          <Text style={styles.line}>🎁 Bonus: ₹{item.bonus}</Text>
          <Text style={styles.cardTotal}>🧾 Total: ₹{item.total}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default SalaryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fbff',
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
    color: '#2b2d42',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 18,
    color: '#1e3a8a',
    textAlign: 'center',
  },
  form: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    zIndex: 1,
  },
  input: {
    backgroundColor: '#f1f5f9',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  button: {
    backgroundColor: '#1d4ed8',
    padding: 14,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderLeftWidth: 6,
    borderLeftColor: '#3b82f6',
    elevation: 2,
  },
  cardMonth: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 6,
  },
  line: {
    fontSize: 15,
    color: '#374151',
    marginVertical: 1,
  },
  cardTotal: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#16a34a',
  },
  dropdown: {
    position: 'absolute',
    top: 50,
    right: 0,
    width: width * 0.9,
    backgroundColor: '#ffffff',
    borderColor: '#1e40af',
    borderWidth: 1,
    borderRadius: 10,
    maxHeight: 180,
    zIndex: 999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
});

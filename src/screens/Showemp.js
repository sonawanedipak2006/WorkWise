//Showemp

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'EMPLOYEE_LIST';

const EmployeeList = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [searchText, setSearchText] = useState('');
  const [sortAZ, setSortAZ] = useState(true);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    loadEmployees();
  }, [isFocused]);

  const loadEmployees = async () => {
    try {
      const storedData = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedData) {
        setEmployees(JSON.parse(storedData));
      } else {
        setEmployees([]);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleDelete = (id) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this employee?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const updatedList = employees.filter(emp => emp.id !== id);
            setEmployees(updatedList);
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleEdit = (employee) => {
    navigation.navigate('AddEditEmployee', {
      employee,
      onSave: async (updatedEmp) => {
        const updatedList = employees.map(emp =>
          emp.id === updatedEmp.id ? updatedEmp : emp
        );
        setEmployees(updatedList);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
      }
    });
  };

  const filtered = employees
    .filter(emp => emp.name.toLowerCase().includes(searchText.toLowerCase()))
    .sort((a, b) =>
      sortAZ ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>👨‍💼 Employee Directory</Text>

      <TextInput
        style={styles.input}
        placeholder="🔍 Search employee by name"
        value={searchText}
        onChangeText={setSearchText}
        placeholderTextColor="#888"
      />

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.sortButton}
          onPress={() => setSortAZ(!sortAZ)}
        >
          <Text style={styles.sortText}>
            {sortAZ ? '🔽 Sort Z-A' : '🔼 Sort A-Z'}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity
              onPress={() => navigation.navigate('EmployeeProfile', { employee: item })}
              style={{ flex: 1 }}
            >
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.info}>📅 Joined: {item.joinDate}</Text>
              <Text style={styles.info}>💼 Role: {item.role}</Text>
            </TouchableOpacity>

            <View style={styles.actionsRow}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => handleEdit(item)}
              >
                <Text style={styles.editButtonText}>✏️ Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(item.id)}
              >
                <Text style={styles.deleteButtonText}>🗑️ Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </SafeAreaView>
  );
};

export default EmployeeList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f4f8',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#2c3e50',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  sortButton: {
    backgroundColor: '#6c5ce7',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  sortText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3436',
  },
  info: {
    fontSize: 14,
    color: '#636e72',
    marginTop: 4,
  },
  actionsRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#3498db',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginRight: 10,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});


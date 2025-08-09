//EmployeeList
{/*}
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
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
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const filtered = employees
    .filter(emp => emp.name.toLowerCase().includes(searchText.toLowerCase()))
    .sort((a, b) =>
      sortAZ ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👨‍💼 Employee Directory</Text>

      <TextInput
        style={styles.input}
        placeholder="🔍 Search employee by name"
        value={searchText}
        onChangeText={setSearchText}
        placeholderTextColor="#888"
      />

      <TouchableOpacity style={styles.sortButton} onPress={() => setSortAZ(!sortAZ)}>
        <Text style={styles.sortText}>{sortAZ ? '🔽 Sort Z-A' : '🔼 Sort A-Z'}</Text>
      </TouchableOpacity>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('EmployeeProfile', { employee: item })}
            style={styles.card}
          >
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.info}>📅 Joined: {item.joinDate}</Text>
            <Text style={styles.info}>💼 Role: {item.role}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </View>
  );
};

export default EmployeeList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#343a40',
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 10,
    fontSize: 16,
  },
  sortButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  sortText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
  },
  info: {
    fontSize: 14,
    color: '#495057',
    marginTop: 4,
  },
});

*/}


import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';

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
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const filtered = employees
    .filter(emp => emp.name.toLowerCase().includes(searchText.toLowerCase()))
    .sort((a, b) =>
      sortAZ ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );

  return (
    <View style={styles.container}>
      {/* Gradient Header */}
      <LinearGradient colors={['#4facfe', '#00f2fe']} style={styles.header}>
        <Text style={styles.headerText}>👨‍💼 Employee Directory</Text>
      </LinearGradient>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="🔍 Search employee by name"
          value={searchText}
          onChangeText={setSearchText}
          placeholderTextColor="#888"
        />
      </View>

      {/* Sort Button */}
      <TouchableOpacity style={styles.sortButton} onPress={() => setSortAZ(!sortAZ)}>
        <Text style={styles.sortText}>{sortAZ ? '🔽 Sort Z-A' : '🔼 Sort A-Z'}</Text>
      </TouchableOpacity>

      {/* Employee List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('EmployeeProfile', { employee: item })}
            style={styles.card}
            activeOpacity={0.8}
          >
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.info}>📅 Joined: {item.joinDate}</Text>
            <Text style={styles.info}>💼 Role: {item.role}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </View>
  );
};

export default EmployeeList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef3f8',
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  searchContainer: {
    marginTop: -25,
    paddingHorizontal: 20,
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 25,
    fontSize: 16,
    elevation: 3,
  },
  sortButton: {
    backgroundColor: '#4facfe',
    paddingVertical: 12,
    borderRadius: 25,
    marginHorizontal: 20,
    marginTop: 15,
    elevation: 3,
  },
  sortText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    marginHorizontal: 20,
    marginTop: 15,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
  },
  info: {
    fontSize: 14,
    color: '#495057',
    marginTop: 4,
  },
});



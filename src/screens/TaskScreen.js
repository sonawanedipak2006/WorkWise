//TaskScreen

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TaskScreen = () => {
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const stored = await AsyncStorage.getItem('taskList');
      if (stored) {
        setTaskList(JSON.parse(stored));
      }
    } catch {
      Alert.alert('Error', 'Failed to load tasks');
    }
  };

  const saveTasks = async (tasks) => {
    await AsyncStorage.setItem('taskList', JSON.stringify(tasks));
  };

  const addTask = () => {
    if (task.trim() === '') return;
    const newTask = {
      id: Date.now().toString(),
      title: task,
      completed: false,
    };
    const updatedList = [newTask, ...taskList];
    setTaskList(updatedList);
    setTask('');
    saveTasks(updatedList);
  };

  const toggleComplete = (id) => {
    const updatedList = taskList.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setTaskList(updatedList);
    saveTasks(updatedList);
  };

  const deleteTask = (id) => {
    const updatedList = taskList.filter(item => item.id !== id);
    setTaskList(updatedList);
    saveTasks(updatedList);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.taskItem, item.completed && styles.completed]}
      onPress={() => toggleComplete(item.id)}
      onLongPress={() => deleteTask(item.id)}
    >
      <Text style={styles.taskText}>
        {item.completed ? '✅' : '📝'} {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <Text style={styles.title}>🗂️ Task Manager</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="✍️ Enter a new task"
          value={task}
          onChangeText={setTask}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>➕</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={taskList}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>No tasks yet. Add one! 🚀</Text>}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </KeyboardAvoidingView>
  );
};

export default TaskScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f4f8',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#0d47a1',
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 45,
    fontSize: 16,
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: '#0d47a1',
    padding: 12,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 20,
  },
  taskItem: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    borderLeftWidth: 6,
    borderLeftColor: '#0d47a1',
    elevation: 1,
  },
  completed: {
    backgroundColor: '#d4edda',
    borderLeftColor: '#28a745',
  },
  taskText: {
    fontSize: 16,
    color: '#333',
  },
  empty: {
    marginTop: 60,
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
  },
});


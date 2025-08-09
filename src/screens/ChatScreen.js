//ChatScreen

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChatScreen = ({ route }) => {
  const { role } = route.params || { role: 'Employee' };
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const data = await AsyncStorage.getItem('chatMessages');
      if (data) setMessages(JSON.parse(data));
    } catch (err) {
      console.error('Error loading messages:', err);
    }
  };

  const saveMessages = async (msgs) => {
    try {
      await AsyncStorage.setItem('chatMessages', JSON.stringify(msgs));
    } catch (err) {
      console.error('Error saving messages:', err);
    }
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      sender: role,
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedMessages = [newMessage, ...messages];
    setMessages(updatedMessages);
    saveMessages(updatedMessages);
    setInput('');
  };

  const renderItem = ({ item }) => {
    const isMe = item.sender === role;

    return (
      <View style={[styles.messageContainer, isMe ? styles.myMessage : styles.otherMessage]}>
        <Text style={styles.sender}>{item.sender}</Text>
        <Text style={styles.messageText}>{item.text}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <Text style={styles.header}>💬 Chat - {role}</Text>

      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        inverted
        contentContainerStyle={styles.chatContainer}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={90}
      >
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            value={input}
            onChangeText={setInput}
            placeholderTextColor="#888"
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 15,
    textAlign: 'center',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  chatContainer: {
    padding: 12,
    paddingBottom: 5,
  },
  messageContainer: {
    borderRadius: 16,
    padding: 12,
    marginVertical: 6,
    maxWidth: '75%',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  myMessage: {
    backgroundColor: '#007bff',
    alignSelf: 'flex-end',
  },
  otherMessage: {
    backgroundColor: '#28a745',
    alignSelf: 'flex-start',
  },
  sender: {
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  messageText: {
    fontSize: 16,
    color: '#fff',
  },
  time: {
    fontSize: 11,
    color: '#d9d9d9',
    textAlign: 'right',
    marginTop: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 30,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginLeft: 10,
    borderRadius: 30,
    justifyContent: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});




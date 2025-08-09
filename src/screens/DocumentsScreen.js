import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DocumentsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>📁 All your documents will appear here.</Text>
    </View>
  );
};

export default DocumentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: '#2f3640',
  },
}); 
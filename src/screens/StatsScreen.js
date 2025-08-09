import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const StatsScreen = () => {
  const [completion, setCompletion] = useState(0);
  const [incomplete, setIncomplete] = useState(0);

  useEffect(() => {
    fetchTaskData();
  }, []);

  const fetchTaskData = async () => {
    const storedTasks = await AsyncStorage.getItem('tasks');
    const tasks = storedTasks ? JSON.parse(storedTasks) : [];

    const total = tasks.length;
    const done = tasks.filter(t => t.completed).length;
    const remaining = total - done;

    const percent = total > 0 ? (done / total) * 100 : 0;

    setCompletion(percent.toFixed(1));
    setIncomplete((100 - percent).toFixed(1));
  };

  const chartData = [
    {
      name: 'Completed',
      population: parseFloat(completion),
      color: '#00b894',
      legendFontColor: '#2d3436',
      legendFontSize: 15,
    },
    {
      name: 'Incomplete',
      population: parseFloat(incomplete),
      color: '#d63031',
      legendFontColor: '#2d3436',
      legendFontSize: 15,
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>📈 Task Completion Stats</Text>
      <Text style={styles.percent}>✅ {completion}% Tasks Completed</Text>

      <PieChart
        data={chartData}
        width={screenWidth - 20}
        height={220}
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#ffeaa7',
          backgroundGradientTo: '#ffeaa7',
          color: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    </ScrollView>
  );
};

export default StatsScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ffeaa7',
    alignItems: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2d3436',
  },
  percent: {
    fontSize: 18,
    marginBottom: 20,
    color: '#2d3436',
  },
});

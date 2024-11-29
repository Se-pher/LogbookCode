// App.js
import React, { useState } from 'react';
import { View, StyleSheet, Button, ScrollView } from 'react-native';
import LengthConverter from './components/LengthConverter';
import TodoList from './components/TodoList';

const App = () => {
  const [activeComponent, setActiveComponent] = useState('LengthConverter');

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="Length Converter" onPress={() => setActiveComponent('LengthConverter')} />
        <Button title="Todo List" onPress={() => setActiveComponent('TodoList')} />
      </View>
      <ScrollView style={styles.scrollContainer}>
        {activeComponent === 'LengthConverter' && <LengthConverter />}
        {activeComponent === 'TodoList' && <TodoList />}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  scrollContainer: {
    flex: 1,
  },
});

export default App;

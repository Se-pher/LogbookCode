// components/LengthConverter.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

const LengthConverter = () => {
  const [value, setValue] = useState('');
  const [result, setResult] = useState(null);
  const [fromUnit, setFromUnit] = useState('metre');
  const [toUnit, setToUnit] = useState('metre');

  const units = {
    metre: 1,
    millimetre: 1000,
    mile: 0.000621371,
    foot: 3.28084,
  };

  const convertLength = () => {
    const numericValue = parseFloat(value);
    if (isNaN(numericValue)) {
      alert('Please enter a valid number');
      return;
    }

    const resultValue = (numericValue * units[fromUnit]) / units[toUnit];
    setResult(resultValue);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter value"
        keyboardType="numeric"
        onChangeText={setValue}
        value={value}
      />
      <Text>Select From Unit:</Text>
      <TextInput
        style={styles.input}
        placeholder="From Unit (metre, millimetre, mile, foot)"
        onChangeText={setFromUnit}
        value={fromUnit}
      />
      <Text>Select To Unit:</Text>
      <TextInput
        style={styles.input}
        placeholder="To Unit (metre, millimetre, mile, foot)"
        onChangeText={setToUnit}
        value={toUnit}
      />
      <Button title="Convert" onPress={convertLength} />
      {result !== null && <Text>Result: {result}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
  },
});

export default LengthConverter;

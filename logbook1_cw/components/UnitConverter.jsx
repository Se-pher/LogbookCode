import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
const UnitConverter = () => {
 const [inputValue, setInputValue] = useState('');
 const [fromUnit, setFromUnit] = useState('Metre');
 const [toUnit, setToUnit] = useState('Millimetre');
 const [result, setResult] = useState('');
 const units = ['Metre', 'Millimetre', 'Mile', 'Foot'];
 const convertUnits = () => {
 if (inputValue.trim() === '') {
 setResult('Please enter a value to convert');
 return;
 }
 
 if (isNaN(inputValue)) {
 setResult('Please enter a valid number');
 return;
 }
 
 const value = parseFloat(inputValue);
 let convertedValue;
 if (fromUnit === toUnit) {
 convertedValue = value;
 } else if (fromUnit === 'Metre' && toUnit === 'Millimetre') {
 convertedValue = value * 1000;
 } else if (fromUnit === 'Millimetre' && toUnit === 'Metre') {
 convertedValue = value / 1000;
 } else if (fromUnit === 'Metre' && toUnit === 'Mile') {
 convertedValue = value / 1609.344;
 } else if (fromUnit === 'Mile' && toUnit === 'Metre') {
 convertedValue = value * 1609.344;
 } else if (fromUnit === 'Metre' && toUnit === 'Foot') {
 convertedValue = value * 3.28084;
 } else if (fromUnit === 'Foot' && toUnit === 'Metre') {
 convertedValue = value / 3.28084;
 } else if (fromUnit === 'Mile' && toUnit === 'Millimetre') {
 convertedValue = value * 1609.344 * 1000;
 } else if (fromUnit === 'Millimetre' && toUnit === 'Mile') {
 convertedValue = value / (1609.344 * 1000);
 } else if (fromUnit === 'Foot' && toUnit === 'Millimetre') {
 convertedValue = (value / 3.28084) * 1000;
 } else if (fromUnit === 'Millimetre' && toUnit === 'Foot') {
 convertedValue = (value / 1000) * 3.28084;
 } else if (fromUnit === 'Mile' && toUnit === 'Foot') {
 convertedValue = value * 5280;
 } else if (fromUnit === 'Foot' && toUnit === 'Mile') {
 convertedValue = value / 5280;
 } else {
 convertedValue = 0;
 }
 setResult(`${value} ${fromUnit} = ${(convertedValue || 0).toFixed(4)} ${toUnit}`);
 };
 return (
 <View style={styles.container}>
 <Text style={styles.title}>Length Unit Converter</Text>
 <TextInput
 style={styles.input}
 onChangeText={setInputValue}
 value={inputValue}
 keyboardType="numeric"
 placeholder="Enter value"
 />
 <View style={styles.pickerContainer}>
 <Text>From:</Text>
 <View style={styles.picker}>
 {units.map((unit) => (
 <TouchableOpacity
 key={unit}
 style={[styles.pickerItem, fromUnit === unit && styles.pickerItemSelected]}
 onPress={() => setFromUnit(unit)}
 >
 <Text>{unit}</Text>
 </TouchableOpacity>
 ))}
 </View>
 </View>
 <View style={styles.pickerContainer}>
 <Text>To:</Text>
 <View style={styles.picker}>
 {units.map((unit) => (
 <TouchableOpacity
 key={unit}
 style={[styles.pickerItem, toUnit === unit && styles.pickerItemSelected]}
 onPress={() => setToUnit(unit)}
 >
 <Text>{unit}</Text>
 </TouchableOpacity>
 ))}
 </View>
 </View>
 <Button title="Convert" onPress={convertUnits} />
 <Text style={styles.result}>{result}</Text>
 </View>
 );
};
const styles = StyleSheet.create({
 container: {
 flex: 1,
 padding: 20,
 backgroundColor: '#fff',
 },
 title: {
 fontSize: 24,
 fontWeight: 'bold',
 marginBottom: 20,
 },
 input: {
 height: 40,
 borderColor: 'gray',
 borderWidth: 1,
 marginBottom: 10,
 paddingHorizontal: 10,
 },
 pickerContainer: {
 marginBottom: 10,
 },
 picker: {
 flexDirection: 'row',
 justifyContent: 'space-around',
 marginTop: 5,
 },
 pickerItem: {
 padding: 10,
 borderWidth: 1,
 borderColor: 'gray',
 },
 pickerItemSelected: {
 backgroundColor: 'lightblue',
 },
 result: {
 marginTop: 20,
 fontSize: 18,
 },
});
export default UnitConverter;
import React from 'react';
import { SafeAreaView } from 'react-native';
import TodoList from './components/TodoList';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TodoList />
    </SafeAreaView>
  );
}
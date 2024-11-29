import React from 'react';
import { SafeAreaView } from 'react-native';
import TodoListSQLite from './components/TodoListSQLite';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TodoListSQLite />
    </SafeAreaView>
  );
}
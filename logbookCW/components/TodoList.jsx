// components/TodoList.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({ name: 'todo.db' });

const TodoList = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS Tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, completed INTEGER)');
      loadTasks();
    });
  }, []);

  const loadTasks = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM Tasks', [], (tx, results) => {
        const items = [];
        for (let i = 0; i < results.rows.length; i++) {
          items.push(results.rows.item(i));
        }
        setTasks(items);
      });
    });
  };

  const addTask = () => {
    if (task) {
      db.transaction(tx => {
        tx.executeSql('INSERT INTO Tasks (name, completed) VALUES (?, ?)', [task, 0], () => {
          loadTasks();
          setTask('');
        });
      });
    }
  };

  const deleteTask = id => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM Tasks WHERE id = ?', [id], () => {
        loadTasks();
      });
    });
  };

  const toggleTaskCompletion = (id, completed) => {
    db.transaction(tx => {
      tx.executeSql('UPDATE Tasks SET completed = ? WHERE id = ?', [completed ? 0 : 1, id], () => {
        loadTasks();
      });
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Add a new task"
        value={task}
        onChangeText={setTask}
      />
      <Button title="Add Task" onPress={addTask} />
      <FlatList
        data={tasks}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <TouchableOpacity onPress={() => toggleTaskCompletion(item.id, item.completed)}>
              <Text style={item.completed ? styles.completedTask : styles.task}>{item.name}</Text>
            </TouchableOpacity>
            <Button title="Delete" onPress={() => deleteTask(item.id)} />
          </View>
        )}
      />
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
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  task: {
    fontSize: 16,
  },
  completedTask: {
    fontSize: 16,
    textDecorationLine: 'line-through',
  },
});

export default TodoList;

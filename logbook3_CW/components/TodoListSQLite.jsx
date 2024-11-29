import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import * as SQLite from 'expo-sqlite';

const DB_NAME = 'todolist.db';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [db, setDb] = useState(null);

  useEffect(() => {
    initDB();
    return () => {
      if (db) {
        console.log("Closing database");
        db.closeAsync()
          .then(() => console.log("Database closed"))
          .catch((error) => console.error("Error closing database", error));
      }
    };
  }, []);

  const initDB = async () => {
    try {
      console.log("Opening database");
      const database = await SQLite.openDatabaseAsync(DB_NAME);
      console.log("Database opened");
      setDb(database);
      await createTable(database);
      await loadTasks(database);
    } catch (error) {
      console.error('Error opening database', error);
      Alert.alert('Database Error', 'Could not open the database. Please restart the app.');
    }
  };

  const createTable = async (database) => {
    try {
      console.log("Creating table");
      await database.execAsync(`
        CREATE TABLE IF NOT EXISTS tasks (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          completed INTEGER NOT NULL DEFAULT 0
        );
      `);
      console.log("Table created");
    } catch (error) {
      console.error('Error creating table', error);
      Alert.alert('Database Error', 'Could not create the table. Please restart the app.');
    }
  };

  const loadTasks = async (database) => {
    try {
      console.log("Loading tasks");
      const loadedTasks = await database.getAllAsync('SELECT * FROM tasks');
      console.log("Tasks loaded", loadedTasks);
      setTasks(loadedTasks);
    } catch (error) {
      console.error('Error loading tasks', error);
      Alert.alert('Database Error', 'Could not load tasks. Please try again.');
    }
  };

  const addTask = async () => {
    if (newTask.trim() === '' || !db) return;
    try {
      console.log("Adding task", newTask);
      const result = await db.runAsync('INSERT INTO tasks (name, completed) VALUES (?, ?)', newTask, 0);
      if (result.lastInsertRowId) {
        const newTaskObject = { id: result.lastInsertRowId, name: newTask, completed: 0 };
        setTasks([...tasks, newTaskObject]);
        setNewTask('');
        console.log("Task added", newTaskObject);
      }
    } catch (error) {
      console.error('Error adding task', error);
      Alert.alert('Database Error', 'Could not add the task. Please try again.');
    }
  };

  const toggleTaskCompletion = async (id, completed) => {
    if (!db) return;
    try {
      console.log("Toggling task completion", id, completed);
      await db.runAsync('UPDATE tasks SET completed = ? WHERE id = ?', completed ? 0 : 1, id);
      setTasks(tasks.map(task =>
        task.id === id ? { ...task, completed: completed ? 0 : 1 } : task
      ));
      console.log("Task completion toggled");
    } catch (error) {
      console.error('Error toggling task completion', error);
      Alert.alert('Database Error', 'Could not update the task. Please try again.');
    }
  };

  const startEditTask = (task) => {
    setEditingTask(task);
    setNewTask(task.name);
  };

  const saveEditedTask = async () => {
    if (newTask.trim() === '' || !db || !editingTask) return;
    try {
      console.log("Saving edited task", editingTask.id, newTask);
      await db.runAsync('UPDATE tasks SET name = ? WHERE id = ?', newTask, editingTask.id);
      setTasks(tasks.map(task =>
        task.id === editingTask.id ? { ...task, name: newTask } : task
      ));
      setEditingTask(null);
      setNewTask('');
      console.log("Task edited");
    } catch (error) {
      console.error('Error saving edited task', error);
      Alert.alert('Database Error', 'Could not update the task. Please try again.');
    }
  };

  const deleteTask = async (id) => {
    if (!db) return;
    try {
      console.log("Deleting task", id);
      await db.runAsync('DELETE FROM tasks WHERE id = ?', id);
      setTasks(tasks.filter(task => task.id !== id));
      console.log("Task deleted");
    } catch (error) {
      console.error('Error deleting task', error);
      Alert.alert('Database Error', 'Could not delete the task. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setNewTask}
          value={newTask}
          placeholder="Enter new task"
        />
        <Button
          title={editingTask ? "Save" : "Add"}
          onPress={editingTask ? saveEditedTask : addTask}
        />
      </View>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <TouchableOpacity onPress={() => toggleTaskCompletion(item.id, item.completed)}>
              <Text style={item.completed ? styles.completedTask : null}>{item.name}</Text>
            </TouchableOpacity>
            <View style={styles.taskButtons}>
              <Button title="Edit" onPress={() => startEditTask(item)} />
              <Button title="Delete" onPress={() => deleteTask(item.id)} color="red" />
            </View>
          </View>
        )}
      />
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
      inputContainer: {
        flexDirection: 'row',
        marginBottom: 20,
      },
      input: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginRight: 10,
        paddingHorizontal: 10,
      },
      taskItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
      },
      completedTask: {
        textDecorationLine: 'line-through',
        color: 'gray',
      },
      taskButtons: {
        flexDirection: 'row',
      },
});

export default TodoList;
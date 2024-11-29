import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);

  const addTask = () => {
    if (newTask.trim() === '') return;
    const newTaskObject = {
      id: Date.now(),
      name: newTask,
      completed: false
    };
    setTasks([...tasks, newTaskObject]);
    setNewTask('');
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const startEditTask = (task) => {
    setEditingTask(task);
    setNewTask(task.name);
  };

  const saveEditedTask = () => {
    if (newTask.trim() === '' || !editingTask) return;
    setTasks(tasks.map(task =>
      task.id === editingTask.id ? { ...task, name: newTask } : task
    ));
    setEditingTask(null);
    setNewTask('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
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
            <TouchableOpacity onPress={() => toggleTaskCompletion(item.id)}>
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
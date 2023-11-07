import React, { useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

function App() {
  const date = ['1/11/2023', '2/11/2023', '3/11/2023', '4/11/2023', '5/11/2023', '6/11/2023','7/11/2023','8/11/2023','9/11/2023'];
  const [item, setItem] = useState('');
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [todoList, setTodoList] = useState([]);

 const Add = () => {
  if (item.trim() === '' || selectedDateIndex >= date.length) {
    return;
  } else {
    const newItem = {
      text: item,
      date: date[selectedDateIndex], 
    };
    setTodoList([...todoList, newItem]);
    setItem('');
    setSelectedDateIndex(selectedDateIndex + 1); 
  }
};


  const sortByDateAscending = () => {
    const sortedList = [...todoList].sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });
    setTodoList(sortedList);
  };

  const sortByDateDescending = () => {
    const sortedList = [...todoList].sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
    setTodoList(sortedList);
  };

  return (
    <SafeAreaView>
      <TextInput
        placeholder="Add Todo"
        value={item}
        onChangeText={(text) => setItem(text)}
      />
      <TouchableOpacity onPress={Add} style={{ padding: 10, backgroundColor: 'red' }}>
        <Text style={{ textAlign: 'center', color: '#ffffff' }}>Add Todo</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
        <TouchableOpacity onPress={sortByDateAscending} style={{ backgroundColor: 'green', padding: 10 }}>
          <Text style={{ color: 'white' }}>Sort Ascending</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={sortByDateDescending} style={{ backgroundColor: 'green', padding: 10 }}>
          <Text style={{ color: 'white' }}>Sort Descending</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={todoList}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
            <Text>{item.text}</Text>
            <Text>{item.date}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
}

export default App;

import React, { useEffect, useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Modal, Button } from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const TaskA = () => {
  const base_url = "https://jsonplaceholder.typicode.com/posts"
  const [data, setData] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [modalVisible, setModalVisible] = useState("")

  const [post, setPost] = useState([])
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")


  useEffect(() => {
    fetch()
    getData();
  }, [])

  const getData = async () => {
    try {
      const savedPosts = await AsyncStorage.getItem('posts');
      if (savedPosts !== null) {
        setPost(JSON.parse(savedPosts));
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  }

  const handleAdd = async () => {
    const newPost = {
      title: title,
      body: body,
      id: Date.now() + Math.random(),
      userId: Date.now() + Math.random()
    };
    setPost((prevPosts) => [
      ...prevPosts,
      newPost
    ]);
    try {
      await AsyncStorage.setItem('posts', JSON.stringify([...post, newPost]));
    } catch (error) {
      console.error('Error saving data:', error);
    }
    setTitle("");
    setBody("");
    setModalVisible(false)
  }
  const fetch = async () => {

    try {
      const res = await axios.get(base_url)
      console.log(res.data, "call")
      setData([...post, ...res.data]);

    } catch (error) {
    }
  }

  const searchedData = (data, searchQuery) => {
    return data.filter((item) => {
      const title = item.title.toLowerCase().includes(searchQuery.toLowerCase());
      const body = item.body.toLowerCase().includes(searchQuery.toLowerCase());
      return title && body;
    });
  }

  const filteredData = searchedData(data, searchQuery);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.dec}>{item.body}</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.contain}>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Search..."
            onChangeText={(text) => setSearchQuery(text)}
            value={searchQuery}
          />
        </View>
        <View style={styles.addButton}>
          <TouchableOpacity
            onPress={() => { setModalVisible(true) }}>

            <Text style={styles.addText}>Add New Post</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.container}>
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>add your post</Text>
            <TextInput
              style={styles.inputqq}
              placeholder="Enter your post here"
              multiline
              value={title}
              onChangeText={(text) => setTitle(text)}
            />
            <TextInput
              style={styles.inputqq}
              placeholder="Enter your post here"
              multiline
              value={body}
              onChangeText={(text) => setBody(text)}
            />
            <Button title={'Add Post'} onPress={handleAdd} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>

  )
}

export default TaskA

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 5,
    marginVertical: 5,
    marginHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 14,
    paddingBottom: 10,
  },
  dec: {
    fontSize: 12,
  },
  input: {
    backgroundColor: '#fff',
    width: 200,
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: "#c2c2c2",
    padding: 10,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 45,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  inputqq: {
    backgroundColor: '#fff',
    width: 170,
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: "#c2c2c2",
    padding: 10,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  contain: { flexDirection: "row", justifyContent: "space-around" },
  addButton: { borderRadius: 10, backgroundColor: "green", justifyContent: "center", alignItems: "center", marginVertical: 10, paddingHorizontal: 10 },
  addText: { color: "white" }
})
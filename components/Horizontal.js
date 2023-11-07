import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const Horizontal = ({url, title}) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Image source={url} style={styles.image} />
      <View
        style={{
          borderBottomColor: '#ccc',
          borderWidth: 1,
          borderColor: '#fff',
          paddingBottom:5,
        }}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Horizontal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // width: 200,
    // height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  title: {
    fontSize: 15,
    marginTop: 5,

  },
});

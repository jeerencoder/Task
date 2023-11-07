import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Horizontal from './components/Horizontal';
import {ListData, HeaderData} from './data/dummy';

const app = () => {
  const renderItem = ({item}) => (
    // <Horizontal url={item.image} title={item.name} />
    <TouchableOpacity style={styles.renderContainer}>
      <Image source={item.image} style={styles.image} />
      <View
        style={{
          borderBottomColor: '#06D6A0',
          borderWidth: 1,
          borderColor: '#fff',
          paddingBottom: 5,
          paddingHorizontal: 10,
        }}>
        <Text style={styles.title}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderVerticle = ({item}) => (
    <TouchableOpacity style={styles.rendervContainer}></TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <FlatList
          data={HeaderData}
          horizontal
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>

      {/* <View
        style={{
          flex: 1,
          padding: 10,
          margin: 10,
          backgroundColor: '#000',
          width: 100,
        }}>
        <View>
          <Image
            source={require('images.jpeg')}
            style={{width: 100, height: 100}}
          />
        </View>
        <View></View>
        <View>
          <Text style={styles.title}>hiih</Text>
        </View>
      </View> */}

      {/* <View>
        <FlatList
          data={ListData}
          renderItem={renderVerticle}
          keyExtractor={item => item.id}
        />
      </View> */}
    </SafeAreaView>
  );
};

export default app;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 20,
  },
  title: {
    fontSize: 32,
  },
  renderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 50,
  },
  title: {
    fontSize: 15,
    marginTop: 5,
    color: '#06D6A0',
  },
  rendervContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
});

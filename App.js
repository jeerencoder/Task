import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {ListData, HeaderData} from './data/dummy';

const app = () => {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [selected, setSelected] = useState(null);

  console.log(selected);

  const AddToCart = item => {
    console.log(item, 'it');
    setCart([...cart, item]);
    setCartCount(cart.length);
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.renderContainer}
      onPress={() => {
        setSelected(item.id);
      }}>
      <Image source={item.image} style={styles.image} />
      <View
        style={{
          borderBottomColor: item.id === selected ? '#06D6A0' : '#fff',
          borderBottomWidth: 1,
          paddingVertical: 5,
          paddingHorizontal: 10,
        }}>
        <Text
          style={{
            fontSize: 15,
            color: item.id == selected ? '#06D6A0' : '#000',
          }}>
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderVerticle = ({item}) => (
    <View key={item.id} style={styles.rendervContainer}>
      <View style={{width: '25%'}}>
        <Image source={item.image} style={{width: 90, height: 90}} />
      </View>
      <View style={{width: '60%', paddingLeft: 10}}>
        <Text style={styles.name}>{item?.name}</Text>
        {item?.category === null ? null : (
          <Text style={styles.category}>{item?.category}</Text>
        )}
        {item?.description == null ? null : (
          <Text style={styles.description}>{item?.description}</Text>
        )}
        <Text style={styles.Price}>${item?.Price}</Text>
        <Text style={styles.quantity}>{item?.quantity}</Text>
      </View>
      <TouchableOpacity
        onPress={() => AddToCart(item.id)}
        style={{
          alignSelf: 'flex-start',
          width: '15%',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 20,
            borderWidth: 1,
            borderColor: '#c2c2c238',
            padding: 1,
            justifyContent: 'center',
          }}>
          <Image
            source={require('./src/Assets/icons/add.png')}
            style={{width: 10, height: 10, paddingRight: 1}}
          />
          <Text style={styles.Button}>{'Add'}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          height: 50,
          paddingHorizontal: 10,
          justifyContent: 'space-between',
          borderBottomWidth: 1,
          borderBottomColor: '#000',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity>
            <Image
              source={require('./src/Assets/icons/main-back.png')}
              style={{width: 30, height: 25}}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={{fontSize: 25, marginLeft: 15}}>Products</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            source={require('./src/Assets/icons/search.png')}
            style={{
              width: 35,
              height: 35,
              paddingRight: 1,
              resizeMode: 'contain',
            }}
          />

          <Image
            source={require('./src/Assets/icons/Group.png')}
            style={{
              width: 35,
              height: 35,
              marginHorizontal: 10,
              position: 'relative',
              resizeMode: 'contain',
            }}
          />
          {cartCount === 0 ? null : (
            <View
              style={{
                position: 'absolute',
                top: 1,
                right: 1,
                backgroundColor: 'red',
                borderRadius: 50,
                width: 20,
                height: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 15, color: '#fff'}}>{cartCount + 1}</Text>
            </View>
          )}
        </View>
      </View>

      <View style={{marginTop: 15}}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={HeaderData}
          horizontal
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>

      <View style={{marginBottom: 150}}>
        <FlatList
          data={ListData}
          renderItem={renderVerticle}
          keyExtractor={item => item.id}
        />
      </View>
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
    height: 60,
    width: 60,
    borderRadius: 50,
  },
  title: {
    fontSize: 15,
    color: '#06D6A0',
  },
  rendervContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#c2c2c2',
    borderBottomWidth: 1,
    marginHorizontal: 20,
    marginVertical: 10,
    paddingBottom: 10,
  },
  Button: {
    color: '#06D6A0',
    fontSize: 14,
  },
  name: {
    fontSize: 15,
    color: '#000',
  },
  category: {
    fontSize: 14,
    color: '#000',
  },
  description: {
    fontSize: 14,
    color: '#c2c2c2',
  },
  Price: {
    fontSize: 20,
    color: '#000',
  },
  quantity: {
    fontSize: 15,
    color: '#c2c2c2',
  },
});

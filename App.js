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
  const [selected, setSelected] = useState(1);

  const toggleItemCart = item => {
    if (cart.includes(item)) {
      const updatedCart = cart.filter(cartItem => cartItem !== item);
      setCart(updatedCart);
      setCartCount(cartCount - 1);
    } else {
      setCart([...cart, item]);
      setCartCount(cartCount + 1);
    }
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

  const renderProducts = ({item}) => (
    <View key={item.id} style={styles.VerticalContainer}>
      <View style={styles.VContA}>
        <Image source={item.image} style={styles.renderImage} />
      </View>
      <View style={styles.VContB}>
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
        onPress={() => toggleItemCart(item.id)}
        style={styles.VContC}>
        <View style={styles.AddButton}>
          <Image
            source={require('./src/Assets/icons/add.png')}
            style={styles.AddIcon}
          />
          <Text style={styles.Button}>{'Add'}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.NavBar}>
        <View style={styles.backView}>
          <TouchableOpacity onPress={() => console.log('goback')}>
            <Image
              source={require('./src/Assets/icons/main-back.png')}
              style={styles.backIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={styles.backTitle}>Products</Text>
        </View>

        <View style={styles.iconCont}>
          <Image
            source={require('./src/Assets/icons/search.png')}
            style={styles.searchIcon}
          />

          <Image
            source={require('./src/Assets/icons/Group.png')}
            style={styles.cartIcon}
          />
          {cartCount === 0 ? null : (
            <View style={styles.cartBadge}>
              <Text style={styles.cartCount}>{cartCount}</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.ListA}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={HeaderData}
          horizontal
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>

      <View style={styles.ListB}>
        <FlatList
          data={ListData}
          renderItem={renderProducts}
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
  VerticalContainer: {
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
  AddButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#c2c2c238',
    padding: 1,
    justifyContent: 'center',
  },
  NavBar: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  searchIcon: {
    width: 35,
    height: 35,
    paddingRight: 1,
    resizeMode: 'contain',
  },
  cartIcon: {
    width: 35,
    height: 35,
    marginHorizontal: 10,
    position: 'relative',
    resizeMode: 'contain',
  },
  cartBadge: {
    position: 'absolute',
    top: 1,
    right: 1,
    backgroundColor: 'red',
    borderRadius: 50,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  VContA: {
    width: '25%',
  },
  VContB: {
    width: '60%',
    paddingLeft: 10,
  },
  VContC: {
    alignSelf: 'flex-start',
    width: '15%',
  },
  AddIcon: {
    width: 10,
    height: 10,
    paddingRight: 1,
  },
  renderImage: {width: 90, height: 90},
  cartCount: {fontSize: 15, color: '#fff'},
  backTitle: {fontSize: 25, marginLeft: 15, color: '#000'},
  iconCont: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {width: 30, height: 25},
  backView: {flexDirection: 'row', alignItems: 'center'},
  ListA: {marginTop: 15},
  ListB: {marginBottom: 150},
});

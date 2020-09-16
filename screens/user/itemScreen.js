import 'react-native-gesture-handler';

import React from 'react';
import {
  StyleSheet,
  Image,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

//Item Screen
function ItemsScreen() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 2}}>
        <Image
          style={styles.logo1}
          source={require('../../assets/images/breakfast2.jpg')}
        />
      </View>
      {this.renderViewItem()}
    </SafeAreaView>
  );
}

//looping
renderViewItem = () => {
  const views = [];
  for (let index = 0; index < itemData.length; index++) {
    views.push(
      <View style={styles.second}>
        {/* item list images */}
        <Image style={styles.logo2} source={itemData[index].image} />
        {/*  displaying text fields */}
        <View>
          <Text style={styles.titleText}>{itemData[index].dishName}</Text>
          <Text style={styles.baseText}>{itemData[index].description}</Text>
          <Text style={styles.costText}>{itemData[index].cost}</Text>
        </View>
        <TouchableOpacity>
          <View style={styles.button1}>
            <Text style={styles.text1}>+ADD</Text>
          </View>
        </TouchableOpacity>
      </View>,
    );
  }
  return views;
};

//item data
const itemData = [
  {
    dishName: 'Cornmeal Mush',
    description: 'Pudding boiled in fresh mayo',
    cost: '$ 9.99',
    image: require('../../assets/images/cornemeal.jpeg'),
  },
  {
    dishName: 'Fruit Pizza',
    description: 'Choose filled,fruit topping an',
    cost: '$ 9.99',
    image: require('../../assets/images/fruitpizza.jpeg'),
  },
  {
    dishName: 'Omelette',
    description: 'Beaten eggs fried with oil an.',
    cost: '$ 9.99',
    image: require('../../assets/images/omellete.jpeg'),
  },
  {
    dishName: 'Beignet',
    description: 'Made from tasty pastry eggs.',
    cost: '$ 9.99',
    image: require('../../assets/images/beigenette.jpeg'),
  },
];

//Item Screen styles
const styles = StyleSheet.create({
  second: {
    flexDirection: 'row',
    flex: 1,
  },
  logo1: {
    width: '100%',
    height: '90%',
  },
  logo2: {
    resizeMode: 'stretch',
    marginLeft: '3%',
    marginEnd: '5%',
    width: '20%',
    height: '60%',
  },
  titleText: {
    fontFamily: 'Cochin',
    fontSize: 17,
  },
  baseText: {
    marginTop: '3%',
    fontFamily: 'Cochin',
  },
  costText: {
    marginTop: '3%',
    color: '#d68624',
  },
  button1: {
    marginLeft: '2%',
    alignSelf: 'flex-start',
    padding: 4,
    left: '70%',
    borderWidth: 1,
    borderColor: '#349617',
  },
  text1: {
    color: '#349617',
    marginTop: 4,
    textAlign: 'center',
  },
});

export default ItemsScreen;

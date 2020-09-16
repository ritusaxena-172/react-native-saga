import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {TextInput} from 'react-native-gesture-handler';

import React from 'react';
import {
  StyleSheet,
  Image,
  SafeAreaView,
  Text,
  View,
  Button,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';

//Menu data
const menuData = [
  {
    mealType: 'Breakfast',
    description: 'All happiness depends \non a leisurely breakfast',
    image: require('../../assets/images/breakfast.jpg'),
    color: '#e7eb7f',
    borderColor: '#ab9a05',
  },
  {
    mealType: 'Lunch',
    description: 'Stop what you are doing \nwork and grab your lunch',
    image: require('../../assets/images/lunch.jpeg'),
    color: '#abdb70',
    borderColor: '#59de59',
  },
  {
    mealType: 'Dinner',
    description: 'One cannot think well if \none has not dined well',
    cost: '$ 9.99',
    image: require('../../assets/images/dinner.jpeg'),
    color: '#bdbcb1',
    borderColor: '#b2e5ed',
  },
  {
    mealType: 'Drinks',
    description: 'Sometimes you just need \nthe drinks to freshen you up',
    cost: '$ 9.99',
    image: require('../../assets/images/drinks.jpg'),
    color: '#b2e5ed',
    borderColor: '#42daeb',
  },
];

//Menu page
function MenuPage({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      {this.renderViewMenu(navigation)}
    </SafeAreaView>
  );
}

renderViewMenu = ({navigation}) => {
  const views = [];
  for (let index = 0; index < menuData.length; index++) {
    views.push(
      <TouchableNativeFeedback onPress={() => navigation.navigate('Items')}>
        <View
          style={{
            ...styles.body,
            backgroundColor: menuData[index].color,
            borderColor: menuData[index].borderColor,
          }}>
          <Image style={styles.logo} source={menuData[index].image} />

          <View style={styles.text}>
            <Text style={styles.titleText}>{menuData[index].mealType}</Text>
            <Text style={styles.baseText}>{menuData[index].description}</Text>
          </View>
        </View>
      </TouchableNativeFeedback>,
    );
  }
  return views;
};

//menu page styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    flexDirection: 'row',
    textAlign: 'left',
    borderWidth: 5,
    marginRight: '10%',
    marginTop: '10%',
    marginEnd: '10%',
    marginLeft: '10%',
  },
  logo: {
    marginTop: '4%',
    marginLeft: '5%',
    width: 100,
    height: 100,
  },
  text: {
    flexDirection: 'column',
  },
  titleText: {
    fontFamily: 'Cochin',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: '10%',
    marginTop: '7%',
  },
  baseText: {
    textAlign: 'left',
    fontFamily: 'Cochin',
    marginLeft: '6%',
    marginTop: '1%',
  },
});

export default MenuPage;

import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SignUpScreen from './screens/signupScreen';
import LoginScreen from './screens/loginScreen';
import UserItemScreen from './screens/user/itemScreen';
import MenuPage from './screens/user/menuPage';
import AdminMenuScreen from './screens/admin/adminMenu';
import AdminItemsScreen from './screens/admin/adminItems';
import * as React from 'react';
import {firebase} from '@react-native-firebase/auth';
import SplashScreen from './screens/splashScreen';
import {Provider} from 'react-redux';
import store from './redux/store';
// var firebase = require('firebase');
const Stack = createStackNavigator();

var config = {
  databaseURL: 'https://firstproject-e4881.firebaseio.com/',
  projectId: 'firstproject-e4881',
  storageBucket: 'firstproject-e4881.appspot.com',
};
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
 
function App() {
  return (
      <NavigationContainer>
        <Provider store={store}>
        <Stack.Navigator initialRouteName="AdminMenu">
          <Stack.Screen name="Menu" component={MenuPage} />
          <Stack.Screen name="Items" component={UserItemScreen} />
          <Stack.Screen name="Signup" component={SignUpScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="AdminMenu" component={AdminMenuScreen} />
          <Stack.Screen name="AdminItems" component={AdminItemsScreen} />
        </Stack.Navigator>
        </Provider>
      </NavigationContainer>
  );
}

export default App;

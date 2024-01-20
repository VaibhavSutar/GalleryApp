import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './Screens/Home';
const DrawerNav = createDrawerNavigator();
import 'react-native-gesture-handler';

const App = () => {

  return (
    <NavigationContainer>
    <DrawerNav.Navigator initialRouteName='Home'>
      <DrawerNav.Screen name='Home' component={Home} />
    </DrawerNav.Navigator>
  </NavigationContainer>
  )
}

export default App
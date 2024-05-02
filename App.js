import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import HomePage from './Pages/HomePage';
import Photo from './Pages/Photo';

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='HomeScreen'>
        <Stack.Screen
          name='HomeScreen'
          component={HomePage}
          options={{
            headerTitle: 'Image Gallery',
          }}
        />
        <Stack.Screen
          name='PhotoScreen'
          component={Photo}
          options={{
            title: 'Photo',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

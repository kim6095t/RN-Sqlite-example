import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import Login from './src/screens/Login';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{
          headerTitleAlign:'center',
          headerStyle:{
            backgroundColor:'#0080ff'
          },
          headerTintColor:'#ffffff',
          headerTitleStyle:{
            fontSize:25,
            fontWeigth:'bold'
          }
        }}
      >
        <Stack.Screen 
          name="Login" 
          component={Login}
          options={{
            headerShown:false
          }}
         />
        <Stack.Screen 
          name="Home" 
          component={Home} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
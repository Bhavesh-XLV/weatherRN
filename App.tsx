import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Home from './screen/Home';
import WeatherData from './screen/WeatherData';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="Weather"
          component={WeatherData}
          options={{title: 'Weather Data'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

import React, {useState} from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  TextInput,
  View,
  ImageBackground,
} from 'react-native';
import axios from 'axios';

const Home = ({navigation}) => {
  const [country, setCountry] = useState<any>('');
  const local = require('../assets/HomeBackground.jpg');

  const countryText = (enteredText: any) => {
    setCountry(enteredText);
  };

  const handleCountrySubmit = (name: string) => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=d34a8c4ec3aa787d79f50071cdae8836&query=${name}`,
      )
      .then((res: any) => {
        if (res.data.success === false) {
          throw new Error();
        }
        navigation.navigate('Weather', {data: name});
      })
      .catch(() => {
        Alert.alert('Oops! Something went wrong', 'Please check connection');
      });
  };

  return (
    <ImageBackground source={local} style={{width: '100%', height: '100%'}}>
      <View style={styles.homeScreen}>
        <TextInput
          placeholder="Enter Country"
          style={styles.input}
          onChangeText={countryText}
        />
        <Button
          title="Submit"
          disabled={country.trim().length === 0 ? true : false}
          onPress={() => handleCountrySubmit(country)}
        />
      </View>
    </ImageBackground>
  );
};

export default Home;

const styles = StyleSheet.create({
  homeScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 2,
    borderColor: 'white',
    width: '80%',
    textAlign: 'center',
    marginBottom: 20,
    borderRadius: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

import React, {useEffect, useState} from 'react';
import {
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  View,
  ImageBackground,
} from 'react-native';
import axios from 'axios';

const WeatherData = ({route}) => {
  const [data, setData] = useState<any>({
    capital: null,
    population: null,
    lating: null,
    flag: '',
    temperature: null,
    humidity: null,
    pressure: null,
    visibility: null,
  });
  const local = require('../assets/HomeBackground.jpg');
  useEffect(() => {
    const data = route.params.data;
    console.log('data', data);
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=d34a8c4ec3aa787d79f50071cdae8836&query=${data}`,
      )
      .then((res: any) => {
        let capitalName = res.data.location.country;
        getData(capitalName);
      })
      .catch(() => {
        Alert.alert('Oops! Something went wrong', 'Please check connection');
      });
  }, []);

  function getData(capitalName: string) {
    console.log('CapitalName', capitalName);
    axios
      .get(`https://restcountries.com/v3.1/name/${capitalName}`)
      .then(res => {
        setData({
          capital: res.data[0].capital[0],
          population: res.data[0].population,
          lating: res.data[0].latlng[0],
          // flag: res.data[0].flags.png,
        });
      });
  }

  function getCurrentCityData(capitalData: string) {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=d34a8c4ec3aa787d79f50071cdae8836&query=${capitalData}`,
      )
      .then(res => {
        setData({
          ...data,
          temperature: res.data.current.temperature,
          humidity: res.data.current.humidity,
          pressure: res.data.current.pressure,
          visibility: res.data.current.visibility,
        });
      })
      .catch(() => {
        Alert.alert('Oops! Something went wrong', 'Please check connection');
      });
  }

  return (
    <ImageBackground source={local} style={{width: '100%', height: '100%'}}>
      <View style={styles.WeatherDataContainer}>
        {data.capital === null ? (
          <Text style={styles.loading}>Loading...</Text>
        ) : (
          <View>
            <View>
              <Text style={styles.text}>Capital: {data.capital}</Text>
              <Text style={styles.text}>Population: {data.population}</Text>
              <Text style={styles.text}>Lating: {data.lating}</Text>
              {/* <Image/> */}
            </View>
            <View style={styles.button}>
              <Button
                title="Capital Weather"
                onPress={() => getCurrentCityData(data.capital)}
              />
            </View>
          </View>
        )}
        <View>
          {data.pressure !== null ? (
            <View>
              <Text style={styles.text}>Temperature: {data.temperature}</Text>
              <Text style={styles.text}>Pressure: {data.pressure}</Text>
              <Text style={styles.text}>Humidity: {data.humidity}</Text>
              <Text style={styles.text}>Visibility: {data.visibility}</Text>
            </View>
          ) : (
            ''
          )}
        </View>
      </View>
    </ImageBackground>
  );
};

export default WeatherData;

const styles = StyleSheet.create({
  WeatherDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    fontSize: 40,
  },
  text: {
    fontSize: 20,
  },
  button: {
    marginVertical: 20,
  },
});

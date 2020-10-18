import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

import { weatherConditions } from '../utils/WeatherConditions';

const CurrentWeather = ({ weather, temperature, place, tempMin, tempMax }) => {
  if (weather != null) {
    return (
      <View style={styles.weatherContainer}>
        <Text style={styles.place}>{place}</Text>
        <Text style={styles.title}>{weatherConditions[weather].title}</Text>
      </View>
    );
  } else {
    return (
      <View>
        <Text>Oh no, something went wrong</Text>
      </View>
    );
  }
};

CurrentWeather.propTypes = {
  temperature: PropTypes.number.isRequired,
  weather: PropTypes.string,
  place: PropTypes.string.isRequired,
  tempMin: PropTypes.number.isRequired,
  tempMax: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  weatherContainer: {},
  title: {
    marginTop: 4,
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 16,
    color: '#fff',
  },
  place: {
    textAlign: 'center',
    fontSize: 30,
    color: '#fff',
    marginTop: 54,
  },
});

export default CurrentWeather;

import React from 'react';
import { ScrollView, View, Text, StyleSheet, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

import { API_KEY } from '../utils/WeatherAPIKey';
import { hourlyWeatherData } from '../utils/HourlyWeatherData';

export default class HourlyWeather extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      hourlyWeatherList: null,
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      error => {
        console.log('Error getting weather condtions');
        this.setState({
          error: 'Error getting weather condtions',
        });
      }
    );
  }

  fetchWeather(lat = 25, lon = 25) {
    this.setState({
      isLoading: false,
      hourlyWeatherList: hourlyWeatherData.list,
    });
  }

  render() {
    const { isLoading, hourlyWeatherList } = this.state;

    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <Text>Fetching the weather</Text>
        </View>
      );
    } else {
      return (
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          style={styles.hourlyWeatherContainer}>
          {hourlyWeatherList.map(item => (
            <View style={styles.weatherByHour}>
              <Text style={styles.hours}>
                {new Date(item.dt_txt).getHours() < 10
                  ? '0' + new Date(item.dt_txt).getHours()
                  : new Date(item.dt_txt).getHours()}
              </Text>
              <Image
                style={{ width: 35, height: 35 }}
                source={{
                  uri: `http://openweathermap.org/img/wn/${
                    item.weather[0].icon
                  }.png`,
                }}
              />
              <Text style={styles.degress}>
                {Math.round(item.main.temp - 273.15)}˚
              </Text>
            </View>
          ))}
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  hourlyWeatherContainer: {
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#777',
    paddingTop: 8,
    paddingBottom: 12,
    paddingHorizontal: 10,
    flexShrink: 0,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.1,
    borderColor: '#777',
    color: '#fff',
  },
  weatherByHour: {
    marginHorizontal: 4,
    alignItems: 'center',
  },
  hours: {
    color: '#fff',
    marginBottom: 8,
    fontSize: 16,
  },
  degress: {
    color: '#fff',
    marginTop: 10,
    fontSize: 20,
    marginLeft: 10,
  },
});

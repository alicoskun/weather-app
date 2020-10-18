import React from 'react';
import { ScrollView, View, Text, StyleSheet, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

import { API_KEY } from '../utils/WeatherAPIKey';
import { weatherConditions } from '../utils/WeatherConditions';
import { days } from '../utils/Days';
import { dailyWeatherData } from '../utils/DailyWeatherData';

export default class DailyWeather extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      dailyWeatherList: null,
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
      dailyWeatherList: dailyWeatherData.list,
    });
  }

  render() {
    const { isLoading, dailyWeatherList } = this.state;

    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <Text>Fetching the weather</Text>
        </View>
      );
    } else {
      return (
        <ScrollView
          showsVerticalScrollIndicator={false}
          horizontal={false}
          style={styles.dailyWeatherContainer}>
          <View style={styles.rowContainer}>
            {dailyWeatherList.map(item => (
              <View style={styles.dailyRow}>
                <Text style={styles.dayName}>
                  {days[new Date(item.dt * 1000).getDay()]}
                </Text>
                <View style={styles.iconContainer}>
                  <Image
                    style={styles.weatherIcon}
                    source={{
                      uri: `http://openweathermap.org/img/wn/${
                        item.weather[0].icon
                      }.png`,
                    }}
                  />
                </View>
                <Text style={styles.dayDegree}>
                  {Math.round(item.temp.day - 273.15)}
                </Text>
                <Text style={styles.nightDegree}>
                  {Math.round(item.temp.night - 273.15)}
                </Text>
              </View>
            ))}
          </View>
          <View style={styles.rowContainer}>
            {dailyWeatherList.map(item => (
              <View style={styles.dailyRow}>
                <Text style={styles.dayName}>
                  {days[new Date(item.dt * 1000).getDay()]}
                </Text>
                <View style={styles.iconContainer}>
                  <Image
                    style={styles.weatherIcon}
                    source={{
                      uri: `http://openweathermap.org/img/wn/${
                        item.weather[0].icon
                      }.png`,
                    }}
                  />
                </View>
                <Text style={styles.dayDegree}>
                  {Math.round(item.temp.day - 273.15)}
                </Text>
                <Text style={styles.nightDegree}>
                  {Math.round(item.temp.night - 273.15)}
                </Text>
              </View>
            ))}
          </View>
          <View style={styles.dayExtraContainer}>
            <Text style={styles.dayDescription}>
              {this.props.dayDescription.charAt(0).toUpperCase() +
                this.props.dayDescription.slice(1)}
            </Text>
          </View>
        </ScrollView>
      );
    }
  }
}

DailyWeather.propTypes = {
  dayDescription: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  dailyWeatherContainer: {
    paddingLeft: 20,
    paddingRight: 4
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.1,
    borderColor: '#777',
    color: '#fff',
  },
  rowContainer: {
  },
  dayExtraContainer: {
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#777',
    marginHorizontal: -20,
    paddingVertical: 15,
    paddingHorizontal: 20
  },
  dayDescription: {
    color: '#fff',
    fontSize: 16,
    marginTop: -4
  },
  dailyRow: {
    flexDirection: 'row',
    marginVertical: 2,
  },
  dayName: {
    flex: 3,
    color: '#fff',
    fontSize: 18,
  },
  iconContainer: {
    flex: 6,
    alignItems: 'center',
  },
  weatherIcon: {
    marginTop: -4,
    width: 35,
    height: 35,
  },
  dayDegree: {
    flex: 1,
    color: '#fff',
    fontSize: 20,
  },
  nightDegree: {
    flex: 1,
    color: '#777',
    fontSize: 20,
  },
});

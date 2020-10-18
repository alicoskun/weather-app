import * as React from 'react';
import { Text, ScrollView, View, StyleSheet, Animated } from 'react-native';
import Constants from 'expo-constants';
import { weatherConditions } from './utils/WeatherConditions';
import { countryList } from './utils/CountryList';

import { API_KEY } from './utils/WeatherAPIKey';
import { days } from './utils/Days';

import CurrentWeather from './components/CurrentWeather';
import HourlyWeather from './components/HourlyWeather';
import DailyWeather from './components/DailyWeather';
import Footer from './components/Footer';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      temperature: 0,
      tempMin: 0,
      tempMax: 0,
      weatherCondition: null,
      error: null,
      place: null,
      weatherDescription: null,
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
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`
    )
      .then(res => res.json())
      .then(json => {
        console.log(json);
        this.setState({
          temperature: Math.round(json.main.temp),
          tempMin: Math.round(json.main.temp_min),
          tempMax: Math.round(json.main.temp_max),
          weatherCondition: json.weather[0].main,
          place: json.name,
          weatherDescription: json.weather[0].description,
          isLoading: false,
        });
      })
      .catch(error => console.error(error));
  }

  getCountry(countryCode) {
    return countryList.filter(item => item.Code === countryCode)[0]
      ? countryList.filter(item => item.Code === countryCode)[0].Name
      : 'Not Found';
  }

  render() {
    const {
      isLoading,
      weatherCondition,
      temperature,
      tempMin,
      tempMax,
      place,
      weatherDescription,
    } = this.state;

    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <Text>Fetching the weather</Text>
        </View>
      );
    } else {
      return (
        <View
          style={[
            styles.mainContainer,
            { backgroundColor: weatherConditions[weatherCondition].color },
          ]}>
          <CurrentWeather
            weather={weatherCondition}
            temperature={temperature}
            tempMin={tempMin}
            tempMax={tempMax}
            place={place}
          />
          <Text style={styles.tempText}>{temperature}˚</Text>
          <View style={styles.currentNav}>
            <Text style={styles.day}>{days[new Date().getDay()]}</Text>
            <Text style={styles.today}>TODAY</Text>
            <Text style={styles.currentDayDegree}>{tempMax}</Text>
            <Text style={styles.currentNightDegree}>{tempMin}</Text>
          </View>
          <HourlyWeather />
          <DailyWeather dayDescription={weatherDescription} />
          <Footer />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  currentNav: {
    flexDirection: 'row',
    padding: 14,
  },
  day: {
    color: '#fff',
    marginRight: 8,
    fontSize: 18,
    alignSelf: 'flex-end',
  },
  today: {
    color: '#fff',
    fontSize: 14.6,
    fontWeight: '500',
    alignSelf: 'flex-end',
    marginRight: 'auto',
  },
  currentDayDegree: {
    color: '#fff',
    marginRight: 20,
    fontSize: 20,
  },
  currentNightDegree: {
    color: '#777',
    fontSize: 20,
  },
  tempText: {
    marginStart: 36,
    textAlign: 'center',
    fontSize: 88,
    color: '#fff',
    fontWeight: '200',
  },
});

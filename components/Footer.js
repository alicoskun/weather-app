import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default class DailyWeather extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      dailyWeatherList: null,
    };
  }

  render() {
    return (
      <View style={styles.footerContainer}>
        <MaterialCommunityIcons
          size={24}
          name={'menu'}
          color={'#fff'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  footerContainer: {
    borderTopWidth: 0.5,
    borderColor: '#777',
    padding: 10,
    alignItems: 'flex-end'
  },
});

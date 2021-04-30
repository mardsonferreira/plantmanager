import React from 'react';
import {SafeAreaView, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';

import wateringImg from '../assets/watering.png';
import { Button } from '../components/Button';
import colors from '../styles/colors';

export function Welcome() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
          Manage
          {'\n'}
          your plants
          {'\n'}
          easily
      </Text>

      <Image source={wateringImg} style={styles.image}/>

      <Text style={styles.subtitle}>
        Don't forget to water your plants anymore. We take care to remind you whenever you need it.
      </Text>

      <Button />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  }, 
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.heading,
    marginTop: 38,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 18,
    paddingHorizontal: 20,
    color: colors.heading,
  },
  button: {
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginBottom: 10,
    height: 56,
    width: 56,
  },
  image: {
    width: 292,
    height: 284
  },
  buttonText: {
    color: colors.white,
    fontSize: 24,
  }
})
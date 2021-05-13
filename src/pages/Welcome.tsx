import React from 'react';
import {
  SafeAreaView,
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  StyleSheet,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Feather} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';

import wateringImg from '../assets/watering.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Welcome() {
  const navigation = useNavigation();

  async function handleStart() {
    const username = await AsyncStorage.getItem('@plantmanager:user');

    if (username) {
      navigation.navigate('PlantSelect');
    } else {
      navigation.navigate('UserIdentification');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>
            Manage
            {'\n'}
            your plants
            {'\n'}
            easily
        </Text>

        <Image 
          source={wateringImg} 
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.subtitle}>
          Don't forget to water your plants anymore. We take care to remind you whenever you need it.
        </Text>

        <TouchableOpacity 
          style={styles.button} 
          activeOpacity={0.7}
          onPress={handleStart}
        >
          <Feather 
            name="chevron-right"  
            style={styles.buttonIcon}
          />
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  }, 
  title: {
    fontSize: 28,
    textAlign: 'center',
    color: colors.heading,
    marginTop: 38,
    fontFamily: fonts.heading,
    lineHeight: 34,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 18,
    paddingHorizontal: 20,
    color: colors.heading,
    fontFamily: fonts.text,
  },
  image: {
    height: Dimensions.get('window').width * 0.7,
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
  buttonIcon: {
    fontSize: 32,
    color: colors.white,
  }
})
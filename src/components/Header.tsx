import React from 'react';
import {
  View, 
  Text, 
  StyleSheet, 
  Image
} from 'react-native';

import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import profile from '../assets/perfil.jpg';

import colors from '../styles/colors';
import fonts from '../styles/fonts';


export function Header () {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Hello,</Text>
        <Text style={styles.username}>Mardson</Text>
      </View>

      <Image source={profile} style={styles.image}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    marginTop: getStatusBarHeight(),
  },
  greeting: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.text
  },
  username: {
    fontSize: 32,
    fontFamily: fonts.heading,
    color: colors.heading,
    lineHeight: 40,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 40,
  }
})

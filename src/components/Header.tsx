import React, { useEffect, useState} from 'react';
import {
  View, 
  Text, 
  StyleSheet, 
  Image
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import profile from '../assets/perfil.jpg';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface HeadersProps {
  title?: string;
  sub_title?: string;
}

export function Header ({ title, sub_title }: HeadersProps) {
  const [userName, setUserName] = useState<string>();

  useEffect(() => {
    async function loadStorageData() {
      const user = await AsyncStorage.getItem('@plantmanager:user');
      setUserName(user || '');
    }

    loadStorageData();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>{title ? title : 'Hello,'}</Text>
        <Text style={styles.username}>{sub_title ? sub_title : userName}</Text>
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
    fontSize: 28,
    color: colors.heading,
    fontFamily: fonts.text
  },
  username: {
    fontSize: 28,
    fontFamily: fonts.heading,
    color: colors.heading,
    lineHeight: 40,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  }
})

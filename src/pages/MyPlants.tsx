import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { Header } from '../components/Header';
import waterdrop from '../assets/waterdrop.png';
import { PlantProps, loadPlants } from '../libs/storage';
import { formatDistance } from 'date-fns';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { PlantCardSecondary } from '../components/PlantCardSecondary';

export function MyPlants () {
  const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextWatered, setNextWatered] = useState<string>();

  useEffect(() => {
    async function loadStoragedData() {
      const plantsStoraged = await loadPlants();
      
      const nextTime = formatDistance(
        new Date(plantsStoraged[0].dateTimeNotification).getTime(),
        new Date().getTime()
      );

      setNextWatered(
        `Do not forget to water ${plantsStoraged[0].name} at ${nextTime}.`
      );

      setMyPlants(plantsStoraged);

      setLoading(false);
    }

    loadStoragedData();
  }, [])

  return (
    <View style={styles.container}>
     
      <Header />

      <View style={styles.spotilight}>
        <Image 
          source={waterdrop}
          style={styles.spotilightImage}
        />
        <Text style={styles.spotilightText}>
          {nextWatered}
        </Text>
      </View>

      <View style={styles.plants}>
        <Text style={styles.plantsTitle}>
          Need to be watered
        </Text>
        
        <FlatList 
          data={myPlants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({item}) => (
            <PlantCardSecondary data={item} />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
   </View>
 )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: 50,
    backgroundColor: colors.background,
  },
  spotilight: {
    backgroundColor: colors.blue_light,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 110,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  spotilightImage: {
    width: 60,
    height: 60,
  },
  spotilightText: {
    flex: 1,
    color: colors.blue,
    paddingHorizontal: 20,
  },
  plants: {
    flex: 1,
    width: '100%'
  },
  plantsTitle: {
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginVertical: 20,
  },
  flatListContainer: {
    flex: 1,
  }
});
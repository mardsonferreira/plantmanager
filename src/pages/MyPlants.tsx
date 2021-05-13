import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Alert
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { formatDistance } from 'date-fns';

import { PlantProps, loadPlants, removePlant } from '../libs/storage';
import { Header } from '../components/Header';
import { PlantCardSecondary } from '../components/PlantCardSecondary';
import { Load } from '../components/Load';

import waterdrop from '../assets/waterdrop.png';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function MyPlants () {
  const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextWatered, setNextWatered] = useState<string>();

  function handleRemove(plant: PlantProps) {
    Alert.alert('Delete', `Would you like to delete ${plant.name}?`, [
      {
        text: 'No 🙏',
        style: 'cancel',
      }, 
      {
        text: 'Yes 😢',
        onPress: async () => {
          try {
            await removePlant(plant.id);
            
            setMyPlants((oldData) =>
              oldData.filter((item) => item.id !== plant.id)
            );

          } catch (error) {
            Alert.alert('Could not remove');
          }
        }
      }
    ])
  }

  useEffect(() => {
    async function loadStoragedData() {
      const plantsStoraged = await loadPlants();
      
      if (plantsStoraged && plantsStoraged.length) {
        const nextTime = formatDistance(
          new Date(plantsStoraged[0].dateTimeNotification).getTime(),
          new Date().getTime()
        );

        setNextWatered(
          `Do not forget to water ${plantsStoraged[0].name} at ${nextTime}.`
        );
      } else {
        setNextWatered(
          'No planst to water.'
        );
      }

      setMyPlants(plantsStoraged);

      setLoading(false);
    }

    loadStoragedData();
  }, [])

  if (loading) 
    return <Load />

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
            <PlantCardSecondary
            data={item}
            handleRemove={() => {handleRemove(item)}} />
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
    paddingTop: 10,
    backgroundColor: colors.background,
  },
  spotilight: {
    backgroundColor: colors.blue_light,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 100,
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
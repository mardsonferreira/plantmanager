import React, { useEffect, useState } from 'react';
import { 
  Text, 
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator 
}  from 'react-native';
import { useNavigation } from '@react-navigation/core';

import { PlantProps } from '../libs/storage';

import { EnvButton } from '../components/EnviromentButton';
import { Header } from '../components/Header';
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import { Load } from '../components/Load';

import api from '../services/api';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface EnvironmentProps {
  key: string,
  title: string,
}

export function PlantSelect() {
  const [environments, setEnvironments] = useState<EnvironmentProps[]>([]);
  const [plants, setPlants] = useState<PlantProps[]>([]);
  const [filteredPlants, setfilteredPlants] = useState<PlantProps[]>([]);
  const [envSelected, setEnvSelected] = useState('all');
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] =  useState(false);

  const navigation = useNavigation();


  function handleEnvironmentSelected(environment: string) {
    setEnvSelected(environment);

    if (environment === 'all') {
      return setfilteredPlants(plants);
    }

    const filtered = plants.filter(plant => 
      plant.environments.includes(environment)  
    );
    
    setfilteredPlants(filtered);
  }

  async function fetchPlants() {
    const { data } = await api.get('plants', {
      params: {
        _sort: 'name',
        _order: 'asc',
        _page: page,
        _limit: 8,
      }
    });

    if (!data) {
      return setLoading(false);
    }

    if (page > 1) {
      setPlants(oldValue => [...oldValue, ...data]);
      setfilteredPlants(oldValue => [...oldValue, ...data]);
    } else {
      setPlants(data);
      setfilteredPlants(data);
    }

    
    setLoading(false);
    setLoadingMore(false);
  }

  function handleFetchMore(distance: number) {
    if (distance < 1) {
      return;
    }

    setLoadingMore(true);
    setPage(oldValue => oldValue + 1);

    fetchPlants();
  }

  function handlePlantSelect (plant: PlantProps) {
    navigation.navigate('PlantSave', {  plant });
  }

  useEffect(() => {
    async function fetchEnvironments() {
      const { data } = await api.get('plants_environments', {
        params: {
          _sort: 'title',
          _order: 'asc'
        }
      });

      setEnvironments([
        {
          key: 'all',
          title: 'All',
        },
        ... data,
      ]);
    }

    fetchEnvironments();
  }, []);

  useEffect(() => {
    fetchPlants();
  }, []);

  if (loading) 
    return <Load />

  return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Header />
          
          <Text style={styles.title}>What environment</Text>
          <Text style={styles.subtitle}>would you like to place your plant in?</Text>
        </View>

        <View>
          <FlatList
            data={environments}
            keyExtractor={(item) => String(item.key)}
            renderItem={({ item }) => (
              <EnvButton 
                title={item.title}
                active={item.key === envSelected}
                onPress={() => handleEnvironmentSelected(item.key)} 
              />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.envList}
          />
        </View>

        <View style={styles.plants}>
          <FlatList
            data={filteredPlants}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <PlantCardPrimary 
                data={item}
                onPress={() => handlePlantSelect(item)}/>
            )}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            contentContainerStyle={styles.plantsList}
            onEndReachedThreshold={0.1}
            onEndReached={({ distanceFromEnd }) => 
              handleFetchMore(distanceFromEnd)
            }
            ListFooterComponent={
              loadingMore
              ? <ActivityIndicator color={colors.green} />
              : <></>
            }
          />
        </View>
          
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 17,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 20,
    marginTop: 15,
  },
  subtitle: {
    fontFamily: fonts.text,
    fontSize: 17,
    lineHeight: 20,
    color: colors.heading,
  },
  envList: {
    height: 40,
    justifyContent: 'center',
    paddingBottom: 5,
    marginLeft: 32,
    marginVertical: 32,
  },
  plants: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center',
  },
  plantsList: {

  }
})
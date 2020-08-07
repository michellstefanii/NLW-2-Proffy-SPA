import React, { useState } from 'react';
import { View } from 'react-native';
import PageHeader from '../../components/PageHeader';
import { useFocusEffect } from '@react-navigation/native'

import styles from './styles';
import { ScrollView } from 'react-native-gesture-handler';
import TeacherItem, { Classe } from '../../components/TeacherItem';
import AsyncStorage from '@react-native-community/async-storage';

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState([]);

  useFocusEffect(() => loadFavorites())

  function loadFavorites() {
    AsyncStorage.getItem('favorites').then(res => {
      if (res) {
        const favoritedTeachers = JSON.parse(res);
        setFavorites(favoritedTeachers);
      }
    })
  }
  
  return (
    <View style={styles.container}>
      <PageHeader title="Meus proffys favoritos"/>

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 24,
        }}
      >
        {favorites.map((classe: Classe) => {
          return (
                <TeacherItem 
                  key={classe.class_id} 
                  classe={classe}
                  favorited
                 />
          )
        })} 
      </ScrollView>
    </View>
  );
}

export default Favorites;
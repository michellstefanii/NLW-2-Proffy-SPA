import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { ScrollView, TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';

import PageHeader from '../../components/PageHeader';

import styles from './styles';
import TeacherItem, { Classe } from '../../components/TeacherItem';
import api from '../../services/api';

const TeacherList: React.FC = () => {
  const [classes, setClasses] = useState([]);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [subject, setSubject] = useState('Matematica');
  const [week_day, setWeekDay] = useState('1');
  const [time, setTime] = useState('10:00');

  function loadFavorites() {
    AsyncStorage.getItem('favorites').then(res => {
      if (res) {
        const favoritedTeachers = JSON.parse(res);
        const favoritedTeachersIds = favoritedTeachers.map((teacher: Classe) => {
          return teacher.user_id;
        })

        setFavorites(favoritedTeachersIds);
      }
    })
  }

  async function searchTeachers() {
    loadFavorites()
    try {
      await api.get('classes', {
        params: {
          subject,
          week_day,
          time
        }
      }).then((res) => setClasses(res.data));
      setIsFilterVisible(false)
    } catch (err) {
      alert(err)
    }
  }

  function handleToggleFiltersVisible(){
    setIsFilterVisible(!isFilterVisible);
  }
  
  return (
    <View style={styles.container}>
      <PageHeader 
        title="Proffys disponíveis"
        headerRight={(
          <BorderlessButton style={styles.filterButton} onPress={handleToggleFiltersVisible}>
            <Feather name="filter" size={20} color="#FFF"/>
          </BorderlessButton>
        )}
      >
        { isFilterVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput
              style={styles.input}
              onChangeText={text => setSubject(text)}
              value={subject}
              placeholder="Selecione"
              placeholderTextColor="#c1bccc"
            />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={text => setWeekDay(text)}
                  value={week_day}
                  placeholder="Selecione"
                  placeholderTextColor="#c1bccc"
                />
              </View>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={text => setTime(text)}
                  value={time}
                  placeholder="Selecione"
                  placeholderTextColor="#c1bccc"
                />
              </View>
            </View>

              <RectButton onPress={searchTeachers} style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Filtrar</Text>
              </RectButton>
          </View>
        )}
      </PageHeader>

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 24,
        }}
      >
         {classes.map((classe: Classe) => {
          return (
            <TeacherItem 
                key={classe.class_id} 
                classe={classe}
                favorited={favorites.includes(classe.user_id)}
            />
          )
        })}
      </ScrollView>
    </View>
  );
}

export default TeacherList;
import React, { useState } from 'react';

import styles from './styles';
import { View, Image, Text, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage'

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';
import api from '../../services/api';

export interface Classe {
    class_id: number;
    user_id: number;
    avatar: string;
    bio: string;
    cost: number;
    name: string;
    subject: string;
    whatsapp: string;
}

interface ClassesItemProps {
  classe: Classe;
  favorited: boolean; 
}


const TeacherItem: React.FC<ClassesItemProps> = ({ classe, favorited }) => {
    const [isFavorited, setIsFavorited] = useState(favorited)

    function handleLinkToWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${classe.whatsapp}`);
        createNewConnection();
    }

    async function handleToggleFavorite() {
      const favorites = await AsyncStorage.getItem('favorites');
      let favoritesArray = []
      if (favorites) {
        favoritesArray = JSON.parse(favorites);
      }

      if(isFavorited) { 
        const favoriteIndex = favoritesArray.findIndex((classeItem: Classe) => {
          return classeItem.user_id === classe.user_id
        });

        favoritesArray.splice(favoriteIndex, 1);

        setIsFavorited(false);
      } else {
        favoritesArray.push(classe);

        setIsFavorited(true);
      }
      await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
    }

    function createNewConnection() {
      api.post('connections', {
        user_id: classe.user_id
      })
    }
  return (
      <View style={styles.container}>
          <View style={styles.profile}>
                <Image
                    style={styles.avatar}
                    source={{ uri: `${classe.avatar}` }}
                />

                <View style={styles.profileInfo}>
                    <Text style={styles.name}>{classe.name}</Text>
                    <Text style={styles.subject}>{classe.subject}</Text>
                </View>
          </View>

          <Text style={styles.bio}>
            {classe.bio}
          </Text>

          <View style={styles.footer}>
              <Text style={styles.price}>
                  Preço/hora {'   '}
                  <Text style={styles.priceValue}>R$ {classe.cost}</Text>
              </Text>
              
            <View style={styles.buttonsContainer}>
                <RectButton 
                  onPress={handleToggleFavorite}
                  style={[
                    styles.favoriteButton, 
                    isFavorited ? styles.favorited : {}
                  ]}>
                  {
                  isFavorited 
                  ? <Image source={unfavoriteIcon} />
                  : <Image source={heartOutlineIcon} />
                  }
                    
                </RectButton>
                <RectButton onPress={handleLinkToWhatsapp} style={styles.contactButton}>
                    <Image source={whatsappIcon} />
                    <Text style={styles.contactButtonText}>Entrar em contato</Text>
                </RectButton>
            </View>
          </View>
      </View>
  );
}

export default TeacherItem;
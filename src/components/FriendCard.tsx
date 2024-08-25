import React from 'react';
import {User} from '../types';
import {BLCard, CARD_PADDING, CARD_WIDTH} from './UIKit/BLCard';
import {Image, StyleSheet, View} from 'react-native';
import {BLText} from './UIKit/BLText';
import {theme} from '../theme';

const IMAGE_WIDTH = CARD_WIDTH - 2 * CARD_PADDING;

export const FriendCard = ({friend}: {friend: User}) => {
  const {name, location, photoUrl} = friend;
  return (
    <BLCard>
      <Image
        source={{uri: photoUrl || ''}}
        style={styles.image}
        resizeMode="stretch"
      />
      <View style={styles.infoContainer}>
        <BLText size="h2">{name}</BLText>
        <BLText color="grey">{location}</BLText>
      </View>
    </BLCard>
  );
};

const styles = StyleSheet.create({
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_WIDTH,
    borderRadius: 100,
    borderWidth: 5,
    borderColor: theme.colorGreen,
    alignSelf: 'center',
  },
  infoContainer: {alignSelf: 'center', alignItems: 'center', gap: 5},
});

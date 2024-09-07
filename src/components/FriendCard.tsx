import React from 'react';
import {User, UserItem} from '../types';
import {BLCard} from './UIKit/BLCard';
import {StyleSheet, View} from 'react-native';
import {BLText} from './UIKit/BLText';
import {FriendImage} from './FriendImage';

export const FriendCard = ({
  friend,
  onPress,
}: {
  friend: User & {items: UserItem[]};
  onPress?: () => void;
}) => {
  const {name, location, photoUrl, items} = friend;
  return (
    <BLCard onPress={onPress}>
      <FriendImage photoUrl={photoUrl} />
      <View style={styles.infoContainer}>
        <BLText size="h2">{name}</BLText>
        <BLText color="blue">{`${items.length} items`}</BLText>
        <BLText color="grey">{location}</BLText>
      </View>
    </BLCard>
  );
};

const styles = StyleSheet.create({
  infoContainer: {alignSelf: 'center', alignItems: 'center', gap: 5},
});

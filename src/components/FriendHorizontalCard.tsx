import React from 'react';
import {StyleSheet, View} from 'react-native';
import {User, UserItem} from '../types';
import {FriendImage} from './FriendImage';
import {BLText} from './UIKit/BLText';
import {BLHorizontalCard} from './UIKit/BLHorizontalCard';

export const FriendHorizontalCard = ({
  friend,
  onPress,
}: {
  friend: User & {items: UserItem[]};
  onPress?: () => void;
}) => {
  const {photoUrl, name, items, location} = friend;
  return (
    <BLHorizontalCard onPress={onPress}>
      <FriendImage photoUrl={photoUrl} imageSize="s" />
      <View style={styles.friendInfo}>
        <BLText bold size="h2">
          {name}
        </BLText>
        <BLText color="blue">{`${items.length} items`}</BLText>
        <BLText color="grey">{location}</BLText>
      </View>
    </BLHorizontalCard>
  );
};

const styles = StyleSheet.create({
  friendInfo: {
    gap: 5,
  },
});

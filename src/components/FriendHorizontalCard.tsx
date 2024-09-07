import React from 'react';
import {StyleSheet, View} from 'react-native';
import {User, UserItem} from '../types';
import {FriendImage} from './FriendImage';
import {BLText} from './UIKit/BLText';
import {BLHorizontalCard} from './UIKit/BLHorizontalCard';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {FriendsStackParamList} from '../navigators/Friends.navigator';

export const FriendHorizontalCard = ({
  friend,
}: {
  friend: User & {items: UserItem[]};
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<FriendsStackParamList>>();

  const {photoUrl, name, items, location, id} = friend;
  return (
    <BLHorizontalCard
      onPress={() => navigation.navigate('FriendDetails', {friendId: id})}>
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

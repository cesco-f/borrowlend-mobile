import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {useAppContext} from '../App.provider';
import {FriendHorizontalCard} from '../components/FriendHorizontalCard';
import {BLText} from '../components/UIKit/BLText';

export const FriendRequests = () => {
  const {
    user: {receivedFriendRequests},
  } = useAppContext();

  return (
    <FlatList
      data={receivedFriendRequests.map(({sender}) => sender)}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => (
        <FriendHorizontalCard friend={{...item, items: []}} />
      )}
      scrollEnabled
      horizontal
      ListHeaderComponent={
        <BLText
          bold
          size="h2">{`${receivedFriendRequests.length} friend requests`}</BLText>
      }
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 20,
    padding: 20,
  },
});

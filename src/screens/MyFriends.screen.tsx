import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {useAppContext} from '../App.provider';
import {BLHeader} from '../components/BLHeader';
import {FriendHorizontalCard} from '../components/FriendHorizontalCard';

export const MyFriends = () => {
  const {user} = useAppContext();
  const {friends} = user;

  return (
    <>
      <BLHeader title="My Friends" />
      <FlatList
        data={friends}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => <FriendHorizontalCard friend={item} />}
        scrollEnabled
        horizontal
        contentContainerStyle={styles.container}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 20,
    padding: 20,
    flex: 1,
  },
});

import React from 'react';
import {useAppContext} from '../App.provider';
import {FlatList, StyleSheet, View} from 'react-native';
import {
  FriendUserCard,
  ReceivedFriendRequestsCard,
} from '../components/UserCard';
import {theme} from '../theme';
import {BLText} from '../components/UIKit/BLText';
import {Button} from 'react-native-paper';
import {ItemCard} from '../components/ItemCardWithButtons';

export const UserLists = () => {
  const {user, refetchUser} = useAppContext();
  const {friends, receivedFriendRequests, items} = user;
  return (
    <>
      <View>
        <Button onPress={refetchUser}>
          <BLText>Refetch user data</BLText>
        </Button>
        <BLText>My items</BLText>
        {items.length ? (
          <FlatList
            data={items}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => <ItemCard item={item.item} />}
            scrollEnabled
            horizontal
            contentContainerStyle={styles.resultsContainer}
          />
        ) : (
          <BLText>This user has no items</BLText>
        )}
        <BLText>User friends</BLText>
        {friends.length ? (
          <FlatList
            data={friends}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => <FriendUserCard item={item} />}
            scrollEnabled
            horizontal
            contentContainerStyle={styles.resultsContainer}
          />
        ) : (
          <BLText>This user has no friends</BLText>
        )}
      </View>
      <View>
        <BLText>User friend requests</BLText>
        {receivedFriendRequests.length ? (
          <FlatList
            data={receivedFriendRequests}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <ReceivedFriendRequestsCard
                item={item.sender}
                friendRequestId={item.id}
              />
            )}
            scrollEnabled
            horizontal
            contentContainerStyle={styles.resultsContainer}
          />
        ) : (
          <BLText>This user has no friend requests</BLText>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  resultsContainer: {
    gap: 20,
    backgroundColor: theme.colorWhite,
    alignSelf: 'flex-start',
  },
});

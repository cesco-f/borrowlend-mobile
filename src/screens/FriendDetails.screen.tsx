import React, {useEffect} from 'react';
import {BLHeader} from '../components/BLHeader';
import {useRoute} from '@react-navigation/native';
import {useMutation} from '@tanstack/react-query';
import {fetchUserById} from '../api';
import {ActivityIndicator, FlatList, StyleSheet} from 'react-native';
import {ItemHorizontalCard} from '../components/ItemHorizontalCard';
import {BLText} from '../components/UIKit/BLText';

export const FriendDetails = () => {
  const {friendId} = useRoute().params as {friendId: string};

  const {
    data: friend,
    mutateAsync,
    isPending,
  } = useMutation({
    mutationFn: () => fetchUserById(friendId),
  });

  useEffect(() => {
    mutateAsync();
  }, [mutateAsync]);

  if (isPending) {
    return <ActivityIndicator />;
  }

  if (!friend) {
    return null;
  }

  return (
    <>
      <BLHeader title={friend.name} showBackButton />
      <FlatList
        data={friend.items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => <ItemHorizontalCard item={item} />}
        contentContainerStyle={styles.container}
        ListHeaderComponent={
          <BLText bold size="h2">{`${friend.items.length} items`}</BLText>
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 20,
    padding: 20,
  },
});

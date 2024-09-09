import React, {useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {useAppContext} from '../App.provider';
import {BLHeader} from '../components/BLHeader';
import {FriendHorizontalCard} from '../components/FriendHorizontalCard';
import {BLSubMenu} from '../components/UIKit/BLSubMenu';
import {FriendRequests} from './FriendRequests.screen';
import {FriendSearch} from './FriendSearch.screen';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {FriendsStackParamList} from '../navigators/Friends.navigator';

type FriendsSubMenuOptions = 'my-friends' | 'requests' | 'search';

const subMenuOptionsMapFriends: Record<FriendsSubMenuOptions, {title: string}> =
  {
    'my-friends': {title: 'My friends'},
    requests: {title: 'Requests'},
    search: {title: 'Search'},
  };

export const Friends = () => {
  const {user} = useAppContext();
  const {friends} = user;
  const navigation =
    useNavigation<NativeStackNavigationProp<FriendsStackParamList>>();

  const [selectedItem, setSelectedItem] =
    useState<FriendsSubMenuOptions>('my-friends');

  const getScreenToRender = () => {
    if (selectedItem === 'my-friends') {
      return (
        <FlatList
          data={friends}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <FriendHorizontalCard
              friend={item}
              onPress={() =>
                navigation.navigate('FriendDetails', {
                  friendId: item.id,
                })
              }
            />
          )}
          scrollEnabled
          horizontal
          contentContainerStyle={styles.container}
        />
      );
    }
    if (selectedItem === 'requests') {
      return <FriendRequests />;
    }
    return <FriendSearch />;
  };

  return (
    <>
      <BLHeader title="Friends" />
      <BLSubMenu
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        subMenuOptionsMap={subMenuOptionsMapFriends}
      />
      {getScreenToRender()}
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

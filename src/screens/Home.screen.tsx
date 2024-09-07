import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {useAppContext} from '../App.provider';
import {theme} from '../theme';
import {BLScrollableList} from '../components/UIKit/BLScrollableList';
import {ItemCard} from '../components/ItemCard';
import {FriendCard} from '../components/FriendCard';
import {BLHeader} from '../components/BLHeader';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {FriendsStackParamList} from '../navigators/Friends.navigator';
import {BottomTabsParamList} from '../navigators/BottomTabs.navigator';

export const Home = () => {
  const {user} = useAppContext();
  const {items, friends} = user;
  const navigation =
    useNavigation<
      NativeStackNavigationProp<FriendsStackParamList & BottomTabsParamList>
    >();

  const onPressFriend = () => {
    navigation.reset({
      index: 0, // Index of the active screen (0 is the first screen in the stack)
      routes: [
        {name: 'FriendsBottom'}, // The route to navigate to (can include more routes)
      ],
    });
  };
  return (
    <>
      <BLHeader />
      <ScrollView style={styles.container}>
        <BLScrollableList
          title="Library"
          items={items.map(({item}) => item)}
          renderItem={({item}) => <ItemCard item={item} />}
          onViewAll={() => {}}
        />
        <BLScrollableList
          title="My friends"
          items={friends}
          renderItem={({item}) => (
            <FriendCard friend={item} onPress={onPressFriend} />
          )}
          onViewAll={onPressFriend}
        />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colorWhite,
    flex: 1,
  },
});

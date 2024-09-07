import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MyFriends} from '../screens/MyFriends.screen';
import {FriendDetails} from '../screens/FriendDetails.screen';

export type FriendsStackParamList = {
  MyFriends: undefined;
  FriendDetails: {friendId: string};
};

const Stack = createNativeStackNavigator<FriendsStackParamList>();

export const FriendsStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="MyFriends" component={MyFriends} />
      <Stack.Screen name="FriendDetails" component={FriendDetails} />
    </Stack.Navigator>
  );
};

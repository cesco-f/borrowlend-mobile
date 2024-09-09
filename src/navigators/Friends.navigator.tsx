import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Friends} from '../screens/Friends.screen';
import {FriendDetails} from '../screens/FriendDetails.screen';

export type FriendsStackParamList = {
  Friends: undefined;
  FriendDetails: {friendId: string};
};

const Stack = createNativeStackNavigator<FriendsStackParamList>();

export const FriendsStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Friends" component={Friends} />
      <Stack.Screen name="FriendDetails" component={FriendDetails} />
    </Stack.Navigator>
  );
};

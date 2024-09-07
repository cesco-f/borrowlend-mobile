import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  ExchangesIcon,
  FriendsIcon,
  HomeIcon,
  IconProps,
  LibraryIcon,
  ProfileIcon,
} from '../components/icons';
import {Home} from '../screens/Home.screen';
import {Search} from '../screens/Search.screen';
import {Profile} from '../screens/Profile.screen';
import {UserLists} from '../screens/UserLists';
import {FriendsStackNavigator} from './Friends.navigator';

export type BottomTabsParamList = {
  Home: undefined;
  Library: undefined;
  Exchanges: undefined;
  Profile: undefined;
  FriendsBottom: undefined;
};

const BottomTabs = createBottomTabNavigator<BottomTabsParamList>();

interface BottomTabsScreen {
  name: keyof BottomTabsParamList;
  component: () => React.JSX.Element;
  tabBarIcon: ({size, color}: IconProps) => React.JSX.Element;
  tabBarLabel: string;
}

// const Library = () => {
//   return <BLText>Library</BLText>;
// };
// const Exchanges = () => {
//   return <BLText>Exchanges</BLText>;
// };

// const Friends = () => {
//   return <BLText>Friends</BLText>;
// };

const bottomTabsScreens: BottomTabsScreen[] = [
  {
    name: 'Home',
    component: Home,
    tabBarIcon: HomeIcon,
    tabBarLabel: 'Home',
  },
  {
    name: 'Library',
    component: Search,
    tabBarIcon: LibraryIcon,
    tabBarLabel: 'Library',
  },
  {
    name: 'Exchanges',
    component: UserLists,
    tabBarIcon: ExchangesIcon,
    tabBarLabel: 'Exchanges',
  },
  {
    name: 'FriendsBottom',
    component: FriendsStackNavigator,
    tabBarIcon: FriendsIcon,
    tabBarLabel: 'Friends',
  },
  {
    name: 'Profile',
    component: Profile,
    tabBarIcon: ProfileIcon,
    tabBarLabel: 'Profile',
  },
  // {
  //   name: 'UserLists',
  //   component: UserLists,
  //   tabBarIcon: HomeIcon,
  //   title: 'UserLists',
  // },
  // {
  //   name: 'Search',
  //   component: Search,
  //   tabBarIcon: SearchIcon,
  //   title: 'Search',
  // },
  // {
  //   name: 'Profile',
  //   component: Profile,
  //   tabBarIcon: ProfileIcon,
  //   title: 'Profile',
  // },
];
const getTabBarIcon =
  (IconComponent: ({size, color}: IconProps) => React.JSX.Element) =>
  ({color, size}: IconProps) =>
    <IconComponent color={color} size={size} />;

export const BottomTabsNavigator = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {bottomTabsScreens.map(s => (
        <BottomTabs.Screen
          key={s.name}
          name={s.name}
          component={s.component}
          options={{
            tabBarIcon: s.tabBarIcon ? getTabBarIcon(s.tabBarIcon) : undefined,
            tabBarLabel: s.tabBarLabel,
            tabBarShowLabel: true,
          }}
        />
      ))}
    </BottomTabs.Navigator>
  );
};

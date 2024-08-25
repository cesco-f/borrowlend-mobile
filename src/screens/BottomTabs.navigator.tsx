import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  ChatIcon,
  ExchangesIcon,
  FriendsIcon,
  HomeIcon,
  IconProps,
  LibraryIcon,
} from '../components/icons';
import {theme} from '../theme';
import {BLText} from '../components/UIKit/BLText';
import {Home} from './Home.screen';
import {Search} from './Search.screen';

const BottomTabs = createBottomTabNavigator();

interface BottomTabsScreen {
  name: string;
  component: () => React.JSX.Element;
  tabBarIcon: ({size, color}: IconProps) => React.JSX.Element;
  title: string;
  tabBarLabel: string;
}

// const Library = () => {
//   return <BLText>Library</BLText>;
// };
const Exchanges = () => {
  return <BLText>Exchanges</BLText>;
};
const Chat = () => {
  return <BLText>Chat</BLText>;
};
const Friends = () => {
  return <BLText>Friends</BLText>;
};

const bottomTabsScreens: BottomTabsScreen[] = [
  {
    name: 'Home',
    component: Home,
    tabBarIcon: HomeIcon,
    title: 'Home',
    tabBarLabel: 'Home',
  },
  {
    name: 'Library',
    component: Search,
    tabBarIcon: LibraryIcon,
    title: 'Library',
    tabBarLabel: 'Library',
  },
  {
    name: 'Exchanges',
    component: Exchanges,
    tabBarIcon: ExchangesIcon,
    title: 'Exchanges',
    tabBarLabel: 'Exchanges',
  },
  {
    name: 'Chat',
    component: Chat,
    tabBarIcon: ChatIcon,
    title: 'Chat',
    tabBarLabel: 'Chat',
  },
  {
    name: 'Friends',
    component: Friends,
    tabBarIcon: FriendsIcon,
    title: 'Friends',
    tabBarLabel: 'Friends',
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
        tabBarActiveTintColor: theme.colorLightBlue,
        tabBarInactiveTintColor: theme.colorGrey,
        tabBarShowLabel: false,
        headerTintColor: theme.colorLightBlue,
        headerStyle: {
          backgroundColor: theme.colorLightBlue,
        },
      }}>
      {bottomTabsScreens.map(s => (
        <BottomTabs.Screen
          key={s.name}
          name={s.name}
          component={s.component}
          options={{
            tabBarIcon: s.tabBarIcon ? getTabBarIcon(s.tabBarIcon) : undefined,
            title: s.title,
            tabBarLabel: s.tabBarLabel,
            tabBarShowLabel: true,
          }}
        />
      ))}
    </BottomTabs.Navigator>
  );
};

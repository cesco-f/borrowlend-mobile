import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Profile} from './Profile.screen';
import {
  IconProps,
  ListIcon,
  ProfileIcon,
  SearchIcon,
} from '../components/icons';
import {theme} from '../theme';
import {Search} from './Search.screen';
import {UserLists} from './UserLists';

const BottomTabs = createBottomTabNavigator();

interface BottomTabsScreen {
  name: string;
  component: () => React.JSX.Element;
  tabBarIcon: ({size, color}: IconProps) => React.JSX.Element;
  title: string;
}

const bottomTabsScreens: BottomTabsScreen[] = [
  {
    name: 'UserLists',
    component: UserLists,
    tabBarIcon: ListIcon,
    title: 'UserLists',
  },
  {
    name: 'Search',
    component: Search,
    tabBarIcon: SearchIcon,
    title: 'Search',
  },
  {
    name: 'Profile',
    component: Profile,
    tabBarIcon: ProfileIcon,
    title: 'Profile',
  },
];
const getTabBarIcon =
  (IconComponent: ({size, color}: IconProps) => React.JSX.Element) =>
  ({color, size}: IconProps) =>
    <IconComponent color={color} size={size} />;

export const BottomTabsNavigator = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colorBlue,
        tabBarInactiveTintColor: theme.colorGrey,
        tabBarShowLabel: false,
        headerTitleStyle: {fontFamily: theme.fontFamilyRegular},
      }}>
      {bottomTabsScreens.map(s => (
        <BottomTabs.Screen
          key={s.name}
          name={s.name}
          component={s.component}
          options={{
            tabBarIcon: s.tabBarIcon ? getTabBarIcon(s.tabBarIcon) : undefined,
            title: s.title,
          }}
        />
      ))}
    </BottomTabs.Navigator>
  );
};

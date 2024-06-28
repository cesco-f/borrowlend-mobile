import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home} from './Home.screen';
import {History} from './History.screen';
import {Analytics} from './Analytics.screen';
import {
  AnalyticsIcon,
  HistoryIcon,
  HomeIcon,
  IconProps,
} from '../components/icons';
import {theme} from '../theme';

const BottomTabs = createBottomTabNavigator();

interface BottomTabsScreen {
  name: string;
  component: () => React.JSX.Element;
  tabBarIcon: ({size, color}: IconProps) => React.JSX.Element;
  title: string;
}

const bottomTabsScreens: BottomTabsScreen[] = [
  {name: 'Home', component: Home, tabBarIcon: HomeIcon, title: "Today's Mood"},
  {
    name: 'History',
    component: History,
    tabBarIcon: HistoryIcon,
    title: 'Past Moods',
  },
  {
    name: 'Analytics',
    component: Analytics,
    tabBarIcon: AnalyticsIcon,
    title: 'Fancy Charts',
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

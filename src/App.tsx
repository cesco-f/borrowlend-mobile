import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {BottomTabsNavigator} from './screens/BottomTabs.navigator';
import {AppProvider} from './App.provider';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';

export const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <AppProvider>
        <NavigationContainer>
          <BottomTabsNavigator />
        </NavigationContainer>
      </AppProvider>
    </GestureHandlerRootView>
  );
};

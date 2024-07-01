import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {BottomTabsNavigator} from './screens/BottomTabs.navigator';
import {AppProvider, useAppContext} from './App.provider';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import LoginScreen from './screens/LoginPage';

const LandingPage = () => {
  const {isLoggedIn} = useAppContext();

  if (isLoggedIn) {
    return <BottomTabsNavigator />;
  }

  return <LoginScreen />;
};
export const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <AppProvider>
        <NavigationContainer>
          <LandingPage />
        </NavigationContainer>
      </AppProvider>
    </GestureHandlerRootView>
  );
};

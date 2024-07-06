import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {BottomTabsNavigator} from './screens/BottomTabs.navigator';
import {AppProvider, useAppContext} from './App.provider';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import LoginScreen from './screens/LoginPage';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const LandingPage = () => {
  const {isLoggedIn} = useAppContext();

  if (isLoggedIn) {
    return <BottomTabsNavigator />;
  }

  return <LoginScreen />;
};

const queryClient = new QueryClient();

export const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{flex: 1}}>
        <AppProvider>
          <NavigationContainer>
            <LandingPage />
          </NavigationContainer>
        </AppProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
};

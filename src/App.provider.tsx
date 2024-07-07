import React, {useCallback, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CompleteUser, FriendRequest} from './types';
import {fetchUserById} from './api';
import SplashScreen from 'react-native-splash-screen';

const storageKey = 'my-app-data';

type AppData = {
  user: CompleteUser;
  isLoggedIn: boolean;
};

const getAppData = async (): Promise<AppData | null> => {
  try {
    const data = await AsyncStorage.getItem(storageKey);

    if (data) {
      return JSON.parse(data);
    }
    return null;
  } catch {
    return null;
  }
};

const setAppData = async (newData: AppData) => {
  try {
    await AsyncStorage.setItem(storageKey, JSON.stringify(newData));
  } catch {}
};

type AppContextType = {
  isLoggedIn: boolean;
  user: CompleteUser;
  logIn: (user: CompleteUser) => void;
  logOut: () => void;
  addSentFriendRequest: (friendRequest: FriendRequest) => void;
};

const defaultUser: CompleteUser = {
  name: '',
  id: '',
  lastName: '',
  email: '',
  friends: [],
  items: [],
  location: '',
  receivedFriendRequests: [],
  sentFriendRequests: [],
};

const defaultValue: AppContextType = {
  isLoggedIn: false,
  user: defaultUser,
  logIn: () => {},
  logOut: () => {},
  addSentFriendRequest: () => {},
};

const AppContext = React.createContext<AppContextType>(defaultValue);

export const AppProvider = ({children}: {children: React.ReactElement}) => {
  const [user, setUser] = useState<CompleteUser>(defaultUser);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const updateUser = (updatedUser: CompleteUser) => {
    setUser(updatedUser);
    setAppData({isLoggedIn: true, user: updatedUser});
  };

  useEffect(() => {
    const getDataFromStorage = async () => {
      const data = await getAppData();

      if (data?.user.id) {
        const updatedUser = await fetchUserById(data.user.id);
        updateUser(updatedUser);
        setIsLoggedIn(data.isLoggedIn);
      }
      SplashScreen.hide();
    };
    getDataFromStorage();
  }, []);

  const logIn = useCallback((newUser: CompleteUser) => {
    updateUser(newUser);
    setIsLoggedIn(true);
  }, []);

  const logOut = useCallback(() => {
    setUser(defaultUser);
    setIsLoggedIn(false);
    setAppData({isLoggedIn: false, user: defaultUser});
  }, []);

  const addSentFriendRequest = (friendRequest: FriendRequest) => {
    const updatedUser = {
      ...user,
      sentFriendRequests: [...user.sentFriendRequests, friendRequest],
    };
    updateUser(updatedUser);
  };

  return (
    <AppContext.Provider
      value={{isLoggedIn, logIn, logOut, user, addSentFriendRequest}}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);

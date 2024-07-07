import React, {useCallback, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CompleteUser} from './types';

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
};

const AppContext = React.createContext<AppContextType>(defaultValue);

export const AppProvider = ({children}: {children: React.ReactElement}) => {
  const [user, setUser] = useState<CompleteUser>(defaultUser);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  React.useEffect(() => {
    const getDataFromStorage = async () => {
      const data = await getAppData();

      if (data) {
        setUser(data.user);
        setIsLoggedIn(data.isLoggedIn);
      }
    };
    getDataFromStorage();
  }, []);

  const logIn = useCallback((newUser: CompleteUser) => {
    setUser(newUser);
    setIsLoggedIn(true);
    setAppData({isLoggedIn: true, user: newUser});
  }, []);

  const logOut = useCallback(() => {
    setUser(defaultUser);
    setIsLoggedIn(false);
    setAppData({isLoggedIn: false, user: defaultUser});
  }, []);

  return (
    <AppContext.Provider value={{isLoggedIn, logIn, logOut, user}}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);

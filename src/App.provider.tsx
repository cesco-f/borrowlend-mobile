import React, {useCallback, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storageKey = 'my-app-data';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  city: string;
}

type AppData = {
  user: User;
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
  user: User;
  logIn: (user: User) => void;
  logOut: () => void;
};

const defaultUser: User = {city: '', firstName: '', id: '', lastName: ''};

const defaultValue: AppContextType = {
  isLoggedIn: false,
  user: defaultUser,
  logIn: () => {},
  logOut: () => {},
};

const AppContext = React.createContext<AppContextType>(defaultValue);

export const AppProvider = ({children}: {children: React.ReactElement}) => {
  const [user, setUser] = useState<User>(defaultUser);
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

  const logIn = useCallback((newUser: User) => {
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

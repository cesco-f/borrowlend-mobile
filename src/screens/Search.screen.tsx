import React, {useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {Button} from 'react-native-paper';
import {BLText} from '../components/UIKit/BLText';
import {theme} from '../theme';
import {BLTextInput} from '../components/UIKit/BLTextInput';
import {useSearchBooks} from '../hooks/useSearchBooks';
import {ItemCard} from '../components/ItemCardWithButtons';
import {useAppContext} from '../App.provider';
import {BLItem, User} from '../types';
import {useSearchUsers} from '../hooks/useSearchUsers';
import {FriendHorizontalCard} from '../components/FriendHorizontalCard';

const SearchInternal = <T extends BLItem | User>({
  isLoading,
  onPress,
  error,
  data,
  renderItem,
  label,
}: {
  isLoading: boolean;
  onPress: (query: string) => void;
  error: Error | null;
  data?: T[];
  renderItem: ({item}: {item: T}) => React.ReactElement;
  label: string;
}) => {
  const [query, setQuery] = useState('');

  return (
    <View style={styles.container}>
      <BLTextInput
        label={label}
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />
      <Button
        mode="contained"
        onPress={() => onPress(query)}
        style={styles.button}
        loading={isLoading}>
        <BLText color="white">Search</BLText>
      </Button>
      {error && <BLText style={styles.error}>{error.message}</BLText>}
      {data ? (
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.resultsContainer}
          scrollEnabled
          horizontal
        />
      ) : null}
    </View>
  );
};

const SearchBooks = () => {
  const [searchBooksQuery, setSearchBooksQuery] = useState('');
  const {
    user: {location},
  } = useAppContext();

  const {data, isLoading, error} = useSearchBooks({
    searchTerm: searchBooksQuery,
    language: location === 'Barcelona' ? 'es' : 'it',
  });

  return (
    <SearchInternal
      data={data}
      isLoading={isLoading}
      onPress={(query: string) => setSearchBooksQuery(query)}
      error={error}
      renderItem={({item}) => <ItemCard item={item} />}
      label="Search books"
    />
  );
};

export const SearchUsers = () => {
  const [searchUsersQuery, setSearchUsersQuery] = useState('');
  const {
    user: {id},
  } = useAppContext();

  const {data, isLoading, error} = useSearchUsers({
    searchTerm: searchUsersQuery,
  });

  return (
    <SearchInternal
      data={data ? data.filter(u => u.id !== id) : undefined}
      isLoading={isLoading}
      onPress={(query: string) => setSearchUsersQuery(query)}
      error={error}
      renderItem={({item}) => (
        <FriendHorizontalCard
          friend={{
            ...item,
            items: new Array(item._count.items).fill({
              isAvailable: true,
              itemId: '',
              userId: item.id,
            }),
          }}
        />
      )}
      label="Search users"
    />
  );
};

export const Search = () => {
  return (
    <>
      <SearchBooks />
      <SearchUsers />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginBottom: 16,
    backgroundColor: theme.colorBlue,
  },
  error: {
    color: 'red',
    marginBottom: 16,
  },
  resultsContainer: {
    gap: 20,
    alignSelf: 'flex-start',
    flex: 1,
  },
});

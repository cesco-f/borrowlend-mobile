import React, {useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {Button} from 'react-native-paper';
import {BLText} from '../components/UIKit/BLText';
import {theme} from '../theme';
import {BLTextInput} from '../components/UIKit/BLTextInput';
import {useSearchBooks} from '../hooks/useSearchBooks';
import {ItemCard} from '../components/ItemCard';
import {useAppContext} from '../App.provider';

export const Search = () => {
  const [query, setQuery] = useState('');
  const [searchBooksQuery, setSearchBooksQuery] = useState('');
  const {
    user: {city},
  } = useAppContext();

  const booksQuery = useSearchBooks({
    searchTerm: searchBooksQuery,
    language: city === 'Barcelona' ? 'es' : 'it',
  });

  return (
    <View style={styles.container}>
      <BLTextInput
        label="Search"
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />
      <Button
        mode="contained"
        onPress={() => setSearchBooksQuery(query)}
        style={styles.button}
        loading={booksQuery.isLoading}>
        <BLText style={{color: theme.colorWhite}}>Search</BLText>
      </Button>
      {booksQuery.error && (
        <BLText style={styles.error}>{booksQuery.error.message}</BLText>
      )}
      {booksQuery.data ? (
        <FlatList
          data={booksQuery.data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => <ItemCard item={item} />}
          contentContainerStyle={styles.resultsContainer}
          scrollEnabled
          horizontal
        />
      ) : null}
    </View>
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
    backgroundColor: theme.colorWhite,
    alignSelf: 'flex-start',
  },
});

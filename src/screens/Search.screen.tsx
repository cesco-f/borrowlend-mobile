import React, {useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {Button, Card} from 'react-native-paper';
import {BLText} from '../components/UIKit/BLText';
import {theme} from '../theme';
import {BLTextInput} from '../components/UIKit/BLTextInput';

interface Result {
  title: string;
}

export const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const handleSearch = async () => {
    setLoading(true);
    setError(undefined);
    try {
      // Replace with your API endpoint and request logic
      const response = {data: {results: [{title: 'My Title'}]}};
      setResults(response.data.results); // Adjust based on your API response structure
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

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
        onPress={handleSearch}
        style={styles.button}
        loading={loading}>
        <BLText content="Search" style={{color: theme.colorWhite}} />
      </Button>
      {error && <BLText style={styles.error} content={error} />}
      <FlatList
        data={results}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <Card style={styles.card}>
            <Card.Content>
              <BLText content={item.title} />
            </Card.Content>
          </Card>
        )}
      />
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
  card: {
    marginBottom: 16,
  },
});

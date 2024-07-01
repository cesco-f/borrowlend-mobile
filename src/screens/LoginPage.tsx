import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import {useAppContext} from '../App.provider';
import {theme} from '../theme';
import {BLText} from '../components/UIKit/BLText';
import {BLTextInput} from '../components/UIKit/BLTextInput';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {logIn} = useAppContext();

  return (
    <View style={styles.container}>
      <BLText style={styles.title} content="Login" />
      <BLTextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        contentStyle={{fontFamily: theme.fontFamilyRegular}}
      />
      <BLTextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
        contentStyle={{fontFamily: theme.fontFamilyRegular}}
      />
      <Button
        mode="contained"
        onPress={() => {
          logIn({
            lastName: 'Fagnani',
            firstName: 'Francesco',
            id: 'f522188b-ca91-4197-9662-a3c21b52b33f',
            city: 'Creazzo',
          });
        }}
        style={styles.button}>
        <BLText content="Login" style={{color: theme.colorWhite}} />
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
    backgroundColor: theme.colorBlue,
  },
});

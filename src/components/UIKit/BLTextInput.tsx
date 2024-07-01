import React from 'react';
import {TextInput, TextInputProps} from 'react-native-paper';
import {theme} from '../../theme';

export const BLTextInput = (props: TextInputProps) => {
  return (
    <TextInput
      {...props}
      contentStyle={{fontFamily: theme.fontFamilyRegular}}
    />
  );
};

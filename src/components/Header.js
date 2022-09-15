/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {
  Appbar,
  Avatar,
  IconButton,
  TouchableRipple,
  useTheme,
} from 'react-native-paper';
import {useRoute} from '@react-navigation/native';

import AppContext from '../context/AppContext';

import {stringToColor} from '../util/utils';
import FileManagerLogo from './FileManagerLogo';

const Header = ({navigation, back}) => {
  const theme = useTheme();
  const route = useRoute();
  const {darkMode, switchDarkMode, user, logout} = useContext(AppContext);

  return (
    <Appbar.Header>
      {back ? (
        <Appbar.BackAction onPress={() => navigation.goBack()} />
      ) : (
        <FileManagerLogo
          height={50}
          width={50}
          stroke={theme.colors.text}
          strokeWidth=".25"
        />
      )}
      <Appbar.Content
        title="FileManager"
        subtitle="File manager service"
        onPress={() => navigation.navigate('Home')}
      />
      {route.name === 'Home' && (
        <>
          <TouchableRipple onPress={() => navigation.navigate('Files')}>
            <Avatar.Text
              label={user?.name[0].toUpperCase()}
              size={32}
              style={{
                backgroundColor: stringToColor(user?.name || ''),
                marginHorizontal: 10,
              }}
              labelStyle={{
                textAlignVertical: 'center',
                textAlign: 'center',
              }}
            />
          </TouchableRipple>
          <IconButton
            icon={darkMode ? 'weather-sunny' : 'weather-night'}
            size={32}
            onPress={logout}
          />
        </>
      )}
      <IconButton
        icon={darkMode ? 'weather-sunny' : 'weather-night'}
        size={32}
        onPress={switchDarkMode}
      />
    </Appbar.Header>
  );
};

export default Header;

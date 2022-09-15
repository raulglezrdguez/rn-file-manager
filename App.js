import React from 'react';
import {LogBox} from 'react-native';

import AppState from './src/context/AppState';

import Main from './src/Main';

LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const App = () => {
  return (
    <AppState>
      <Main />
    </AppState>
  );
};

export default App;

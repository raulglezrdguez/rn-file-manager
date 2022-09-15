import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from './screens/Login';
import RegisterScreen from './screens/Register';
import ActivateScreen from './screens/Activate';
import ForgotPassScreen from './screens/ForgotPass';
import RecoveryPassScreen from './screens/RecoveryPass';
import HomeScreen from './screens/Home';
import FilesScreen from './screens/Files';

import Header from './components/Header';
import AppContext from './context/AppContext';

const Stack = createStackNavigator();

const Main = () => {
  const {user} = useContext(AppContext);

  return (
    <Stack.Navigator
      screenOptions={{
        header: props => <Header {...props} />,
      }}>
      {user ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Files" component={FilesScreen} />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Activate"
            component={ActivateScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Forgot"
            component={ForgotPassScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Recovery"
            component={RecoveryPassScreen}
            options={{
              headerShown: false,
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default Main;

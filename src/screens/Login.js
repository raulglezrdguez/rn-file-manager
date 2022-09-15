/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  Button,
  Caption,
  Headline,
  HelperText,
  TextInput,
  useTheme,
} from 'react-native-paper';
import axios from 'axios';

import AppContext from '../context/AppContext';

import {re_email} from '../util/regex';

import config from '../../config';
import FileManagerLogo from '../components/FileManagerLogo';

const Login = ({navigation}) => {
  const theme = useTheme();
  const {login} = useContext(AppContext);

  const [variables, setVariables] = useState({
    email: 'raulglezrdguez69@gmail.com',
    password: '111111',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const loginUser = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${config.REACT_APP_SERVER_HOST}auth/login`,
        variables,
      );
      setLoading(false);
      console.log(response.data);
      login(response.data);
    } catch (error) {
      console.log(error);
      setLoading(false);
      if (error.response) {
        error.response.data ? setErrors(error.response.data) : setErrors({});
      } else if (error.request) {
        setErrors({general: 'No response received'});
      } else {
        setErrors({general: error.message});
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.link}>
          <FileManagerLogo
            style={{marginTop: 50, marginRight: 10}}
            height={50}
            width={50}
            stroke={theme.colors.text}
            strokeWidth=".25"
          />
          <Headline>Login</Headline>
        </View>
        <ScrollView style={styles.scroll}>
          <TextInput
            label="email"
            value={variables.email}
            onChangeText={email => setVariables({...variables, email})}
            mode="outlined"
            placeholder="email"
            error={
              (variables.email !== '' &&
                !re_email.test(String(variables.email).toLowerCase())) ||
              (errors.email && errors.email !== '')
            }
            keyboardType="email-address"
          />
          <HelperText
            type="error"
            visible={
              (variables.email !== '' &&
                !re_email.test(String(variables.email).toLowerCase())) ||
              (errors.email && errors.email !== '')
            }>
            {variables.email !== '' &&
            !re_email.test(String(variables.email).toLowerCase())
              ? 'Incorrect email'
              : errors.email}
          </HelperText>
          <TextInput
            label="Password"
            value={variables.password}
            onChangeText={password => setVariables({...variables, password})}
            mode="outlined"
            placeholder="password"
            error={
              (variables.password !== '' && variables.password.length < 6) ||
              (errors.password && errors.password !== '')
            }
            right={
              <TextInput.Icon
                name={showPassword ? 'eye-off' : 'eye'}
                onPress={() => {
                  setShowPassword(!showPassword);
                }}
                forceTextInputFocus={false}
              />
            }
            secureTextEntry={!showPassword}
          />
          <HelperText
            type="error"
            visible={
              (variables.password !== '' && variables.password.length < 6) ||
              (errors.password && errors.password !== '')
            }>
            {variables.password !== '' && variables.password.length < 6
              ? 'Incorrect password'
              : errors.password}
          </HelperText>
          <Button
            icon="login"
            mode="contained"
            onPress={loginUser}
            style={{width: '60%', alignSelf: 'center'}}
            disabled={
              !re_email.test(String(variables.email).toLowerCase()) ||
              variables.password.length < 6 ||
              loading
            }>
            Login
          </Button>
          <HelperText
            type="error"
            visible={errors.general}
            style={{alignSelf: 'center'}}>
            {errors.general}
          </HelperText>
          <View style={styles.link}>
            <Caption>Don't have an account? </Caption>
            <Button
              icon="account-plus"
              mode="outlined"
              onPress={() => navigation.navigate('Register')}>
              Register
            </Button>
          </View>
          <View style={styles.link}>
            <Caption>Forgot password? </Caption>
            <Button
              icon="account-key"
              mode="outlined"
              onPress={() => navigation.navigate('Forgot')}>
              Recovery
            </Button>
          </View>
          <View style={styles.bottom}></View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  scroll: {
    width: '100%',
    padding: 2,
    marginBottom: 10,
    alignContent: 'center',
  },
  link: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  bottom: {
    marginTop: 40,
  },
});

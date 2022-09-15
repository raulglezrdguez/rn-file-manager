/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useContext, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  Button,
  Caption,
  Headline,
  HelperText,
  Subheading,
  TextInput,
  useTheme,
} from 'react-native-paper';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import AppContext from '../context/AppContext';

import config from '../../config';
import FileManagerLogo from '../components/FileManagerLogo';

const RecoveryPass = ({navigation}) => {
  const theme = useTheme();
  const {login} = useContext(AppContext);

  const [decodedToken, setDecodedToken] = useState({
    email: '',
    id: '',
    name: '',
  });

  const [variables, setVariables] = useState({
    token: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (variables.token !== '' && variables.token.length > 60) {
      try {
        const dt = jwtDecode(variables.token);
        setDecodedToken(value => ({...value, ...dt}));
        setErrors({...errors, token: ''});
      } catch (error) {
        setErrors({token: 'Invalid token'});
      }
    } else {
      setErrors({token: 'Invalid token'});
    }
  }, [variables.token, errors]);

  const recoveryPassUser = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${config.REACT_APP_SERVER_PROXY}api/recoverypass`,
        {
          ...variables,
          nick: decodedToken.nick,
          email: decodedToken.email,
        },
      );
      setLoading(false);
      login(response.data);
    } catch (error) {
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
          <Headline>Recovery password</Headline>
        </View>

        <ScrollView style={styles.scroll}>
          {decodedToken.name && decodedToken.email ? (
            <>
              <Subheading style={{padding: 5}}>{decodedToken.name}</Subheading>
              <Subheading style={{padding: 5}}>{decodedToken.email}</Subheading>
            </>
          ) : null}
          <TextInput
            label="Token"
            value={variables.token}
            onChangeText={token => setVariables({...variables, token})}
            mode="outlined"
            placeholder="token"
            error={
              (variables.token !== '' && variables.token.length < 60) ||
              (errors.token && errors.token !== '')
            }
            multiline
          />
          <HelperText
            type="error"
            visible={
              (variables.token && variables.token.length < 60) ||
              (errors.token && errors.token !== '')
            }>
            {variables.token && variables.token.length < 60
              ? 'Incorrect token'
              : errors.token}
          </HelperText>
          <TextInput
            label="Password"
            value={variables.password}
            onChangeText={password => setVariables({...variables, password})}
            mode="outlined"
            placeholder="password"
            error={
              (variables.password && variables.password.length < 6) ||
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
              (variables.password && variables.password.length < 6) ||
              (errors.password && errors.password !== '')
            }>
            {variables.password && variables.password.length < 6
              ? 'Incorrect password'
              : errors.password}
          </HelperText>
          <TextInput
            label="Confirm password"
            value={variables.confirmPassword}
            onChangeText={confirmPassword =>
              setVariables({...variables, confirmPassword})
            }
            mode="outlined"
            placeholder="confirm password"
            error={
              (variables.password && variables.confirmPassword.length < 6) ||
              variables.confirmPassword !== variables.password ||
              (errors.confirmPassword && errors.confirmPassword !== '')
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
              (variables.password && variables.confirmPassword.length < 6) ||
              variables.confirmPassword !== variables.password ||
              (errors.confirmPassword && errors.confirmPassword !== '')
            }>
            {(variables.password && variables.confirmPassword.length < 6) ||
            variables.confirmPassword !== variables.password
              ? 'Passwords dont match'
              : errors.confirmPassword}
          </HelperText>
          <Button
            icon="account-key"
            mode="contained"
            onPress={recoveryPassUser}
            style={{width: '60%', alignSelf: 'center'}}
            disabled={
              errors.token ||
              variables.token.length < 60 ||
              variables.password.length < 6 ||
              variables.confirmPassword !== variables.password ||
              loading
            }>
            Recovery password
          </Button>
          <HelperText
            type="error"
            visible={errors.general}
            style={{alignSelf: 'center'}}>
            {errors.general}
          </HelperText>
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

export default RecoveryPass;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  form: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    marginBottom: 10,
  },
  scroll: {
    width: '100%',
    padding: 2,
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

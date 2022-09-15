/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
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

import FileManagerLogo from '../components/FileManagerLogo';
import {re_email} from '../util/regex';

import config from '../../config';

const Register = ({navigation}) => {
  const theme = useTheme();
  const [variables, setVariables] = useState({
    name: 'raul',
    email: 'raul@mtz.jovenclub.cu',
    password: '111111',
    confirmPassword: '111111',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [lastMessage, setLastMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const registerUser = async () => {
    try {
      setLoading(true);
      await axios.post(
        `${config.REACT_APP_SERVER_HOST}auth/register`,
        variables,
      );
      setLoading(false);
      setLastMessage(
        'Check your email and follow the instructions to activate your account at FileManager.',
      );
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
      {lastMessage ? (
        <>
          <View style={styles.link}>
            <FileManagerLogo
              style={{marginTop: 50, marginRight: 10}}
              height={50}
              width={50}
              stroke={theme.colors.text}
              strokeWidth=".25"
            />
            <Subheading style={{padding: 5}}>{lastMessage}</Subheading>
          </View>
          <View style={styles.link}>
            <Caption>Activate account? </Caption>
            <Button
              icon="account-check"
              mode="contained"
              onPress={() => navigation.navigate('Activate')}>
              Activate
            </Button>
          </View>
          <View style={styles.link}>
            <Caption>Already have an account? </Caption>
            <Button
              icon="login"
              mode="contained"
              onPress={() => navigation.navigate('Login')}>
              Login
            </Button>
          </View>
        </>
      ) : (
        <View style={styles.form}>
          <View style={styles.link}>
            <FileManagerLogo
              style={{marginTop: 50, marginRight: 10}}
              height={50}
              width={50}
              stroke={theme.colors.text}
              strokeWidth=".25"
            />
            <Headline>Register</Headline>
          </View>

          <ScrollView style={styles.scroll}>
            <TextInput
              label="Name"
              value={variables.name}
              onChangeText={name => setVariables({...variables, name})}
              mode="outlined"
              placeholder="Name"
              error={
                variables.name.length < 4 || (errors.name && errors.name !== '')
              }
            />
            <HelperText
              type="error"
              visible={
                variables.name.length < 4 || (errors.name && errors.name !== '')
              }>
              {variables.name.length < 4 ? 'Incorrect name' : errors.name}
            </HelperText>
            <TextInput
              label="email"
              value={variables.email}
              onChangeText={email => setVariables({...variables, email})}
              mode="outlined"
              placeholder="email"
              error={
                !re_email.test(String(variables.email).toLowerCase()) ||
                (errors.email && errors.email !== '')
              }
              keyboardType="email-address"
            />
            <HelperText
              type="error"
              visible={
                !re_email.test(String(variables.email).toLowerCase()) ||
                (errors.email && errors.email !== '')
              }>
              {!re_email.test(String(variables.email).toLowerCase())
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
                variables.password.length < 6 ||
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
                variables.password.length < 6 ||
                (errors.password && errors.password !== '')
              }>
              {variables.password.length < 6
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
                variables.confirmPassword.length < 6 ||
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
                variables.confirmPassword.length < 6 ||
                variables.confirmPassword !== variables.password ||
                (errors.confirmPassword && errors.confirmPassword !== '')
              }>
              {variables.confirmPassword.length < 6 ||
              variables.confirmPassword !== variables.password
                ? 'Passwords dont match'
                : errors.confirmPassword}
            </HelperText>
            <Button
              icon="account-plus"
              mode="contained"
              onPress={registerUser}
              style={{width: '60%', alignSelf: 'center'}}
              disabled={
                variables.nick.length < 4 ||
                !re_email.test(String(variables.email).toLowerCase()) ||
                variables.password.length < 6 ||
                variables.confirmPassword !== variables.password ||
                loading
              }>
              Register
            </Button>
            <HelperText
              type="error"
              visible={errors.general}
              style={{alignSelf: 'center'}}>
              {errors.general}
            </HelperText>
            <View style={styles.link}>
              <Caption>Already have an account? </Caption>
              <Button
                icon="login"
                mode="outlined"
                onPress={() => navigation.navigate('Login')}>
                Login
              </Button>
            </View>
            <View style={styles.link}>
              <Caption>Already registered? </Caption>
              <Button
                icon="login"
                mode="outlined"
                onPress={() => navigation.navigate('Activate')}>
                Activate
              </Button>
            </View>
            <View style={styles.bottom}></View>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default Register;

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

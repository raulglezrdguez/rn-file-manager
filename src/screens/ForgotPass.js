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

import {re_email} from '../util/regex';

import config from '../../config';
import FileManagerLogo from '../components/FileManagerLogo';

const ForgotPass = ({navigation}) => {
  const theme = useTheme();
  const [variables, setVariables] = useState({
    email: 'raul@mtz.jovenclub.cu',
    password: '111111',
    confirmPassword: '111111',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [lastMessage, setLastMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const forgotPass = async () => {
    try {
      setLoading(true);
      await axios.post(
        `${config.REACT_APP_SERVER_HOST}auth/forgotpass`,
        variables,
      );
      setLoading(false);
      setLastMessage(
        'Check your email and follow the instructions to recovery your password at FileManager',
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
          <Subheading style={{padding: 5}}>{lastMessage}</Subheading>
          <View style={styles.link}>
            <Caption>Recovery from email? </Caption>
            <Button
              icon="account-key"
              mode="contained"
              onPress={() => navigation.navigate('Recovery')}>
              Recovery
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
        <>
          <View style={styles.form}>
            <View style={styles.link}>
              <FileManagerLogo
                style={{marginTop: 50, marginRight: 10}}
                height={50}
                width={50}
                stroke={theme.colors.text}
                strokeWidth=".25"
              />
              <Headline>Forgot password</Headline>
            </View>

            <ScrollView style={styles.scroll}>
              <TextInput
                label="email"
                value={variables.email}
                onChangeText={email => setVariables({...variables, email})}
                mode="outlined"
                placeholder="email"
                error={
                  (variables.email &&
                    !re_email.test(String(variables.email).toLowerCase())) ||
                  (errors.email && errors.email !== '')
                }
                keyboardType="email-address"
              />
              <HelperText
                type="error"
                visible={
                  (variables.email &&
                    !re_email.test(String(variables.email).toLowerCase())) ||
                  (errors.email && errors.email !== '')
                }>
                {variables.email &&
                !re_email.test(String(variables.email).toLowerCase())
                  ? 'Incorrect email'
                  : errors.email}
              </HelperText>
              <TextInput
                label="New password"
                value={variables.password}
                onChangeText={password =>
                  setVariables({...variables, password})
                }
                mode="outlined"
                placeholder="new password"
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
                label="Confirm new password"
                value={variables.confirmPassword}
                onChangeText={confirmPassword =>
                  setVariables({...variables, confirmPassword})
                }
                mode="outlined"
                placeholder="confirm new password"
                error={
                  (variables.confirmPassword &&
                    variables.confirmPassword.length < 6) ||
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
                  (variables.confirmPassword &&
                    variables.confirmPassword.length < 6) ||
                  variables.confirmPassword !== variables.password ||
                  (errors.confirmPassword && errors.confirmPassword !== '')
                }>
                {(variables.confirmPassword &&
                  variables.confirmPassword.length < 6) ||
                variables.confirmPassword !== variables.password
                  ? 'Passwords dont match'
                  : errors.confirmPassword}
              </HelperText>
              <Button
                icon="account-key"
                mode="contained"
                onPress={forgotPass}
                style={{width: '60%', alignSelf: 'center'}}
                disabled={
                  !re_email.test(String(variables.email).toLowerCase()) ||
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
                <Caption>Already have an account? </Caption>
                <Button
                  icon="login"
                  mode="outlined"
                  onPress={() => navigation.navigate('Login')}>
                  Login
                </Button>
              </View>
              <View style={styles.link}>
                <Caption>Recovery from email? </Caption>
                <Button
                  icon="login"
                  mode="outlined"
                  onPress={() => navigation.navigate('RecoveryPass')}>
                  Recovery
                </Button>
              </View>
              <View style={styles.bottom}></View>
            </ScrollView>
          </View>
        </>
      )}
    </View>
  );
};

export default ForgotPass;

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

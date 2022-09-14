/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Snackbar} from 'react-native-paper';
import axios from 'axios';

import AppContext from '../context/AppContext';

import FileDetails from '../components/FileDetails';
import AddFiles from '../components/AddFiles';

import config from '../../config';

const Files = ({navigation}) => {
  const {user, files, setFiles} = useContext(AppContext);

  const [errors, setErrors] = useState({});

  const loadFiles = useCallback(async () => {
    try {
      const response = await axios.get(
        `${config.REACT_APP_SERVER_HOST}file/files`,
        {headers: {Authorization: `Bearer ${user.token}`}},
      );
      setFiles(response.data);
    } catch (error) {
      if (error.response) {
        error.response.data ? setErrors(error.response.data) : setErrors({});
      } else if (error.request) {
        setErrors({general: 'No response received'});
      } else {
        setErrors({general: error.message});
      }
    }
  }, [user.token, setFiles]);

  useEffect(() => {
    loadFiles();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <AddFiles />
        <ScrollView style={styles.scroll}>
          {files.map(f => (
            <FileDetails key={f.id} file={f} editMode={true} />
          ))}
        </ScrollView>
      </View>
      <Snackbar
        visible={errors.general}
        onDismiss={() => setErrors({...errors, general: ''})}
        action={{
          label: 'Ok',
          onPress: () => setErrors({...errors, general: ''}),
        }}>
        {errors.general}
      </Snackbar>
    </View>
  );
};

export default Files;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  form: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '95%',
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

/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Snackbar, Subheading} from 'react-native-paper';

import AppContext from '../context/AppContext';
import {dateToString} from '../util/dateFormat';

const FileDetails = ({file, editMode = false}) => {
  const {id, name, originalFilename, size, status, updatedAt, createdAt} = file;

  const {updateFile, deleteFile, downloadFile, showSnackbarMessage} =
    useContext(AppContext);

  const [edit, setEdit] = useState(false);
  const [newName, setNewName] = useState(name);
  const [errors, setErrors] = useState({});

  const changeName = async () => {
    const result = await updateFile({fileId: id, name: newName});

    if (result.general) {
      setErrors({general: result.general});
    }
  };

  const removeFile = async () => {
    const result = await deleteFile(id);
    if (result.general) {
      setErrors({general: result.general});
    }
  };

  const getFile = async () => {
    const result = await downloadFile({fileId: id, name});
    if (result.general) {
      setErrors({general: result.general});
    } else {
      setErrors({general: "Can't download file: maybe it's not zipped yet"});
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Subheading style={{padding: 5}}>File details</Subheading>
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

export default FileDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

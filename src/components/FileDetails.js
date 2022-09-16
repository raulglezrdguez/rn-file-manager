/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState} from 'react';
import {PermissionsAndroid, ScrollView, StyleSheet, View} from 'react-native';
import {
  Button,
  Caption,
  Card,
  HelperText,
  Snackbar,
  TextInput,
  useTheme,
} from 'react-native-paper';

import AppContext from '../context/AppContext';
import {dateToString} from '../util/dateFormat';

const FileDetails = ({file, editMode = false}) => {
  const theme = useTheme();
  const {id, name, originalFilename, size, status, updatedAt, createdAt} = file;

  const {updateFile, deleteFile, downloadFile} = useContext(AppContext);

  const [edit, setEdit] = useState(false);
  const [newName, setNewName] = useState(name);
  const [errors, setErrors] = useState({});

  const requestWritePermission = async () => {
    try {
      let granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'FileManager App Write Permission',
          message:
            'FileManager App needs access to write to your mobile so you can download files.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'FileManager App Read Permission',
            message:
              'FileManager App needs access to read to your mobile so you can download files.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const changeName = async () => {
    const result = await updateFile({fileId: id, name: newName});
    console.log(result);
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
    const hasPermission = await requestWritePermission();
    if (hasPermission) {
      const result = await downloadFile({fileId: id, name});
      console.log(result);
      if (result && result.general) {
        setErrors({general: result.general});
      } else {
        setErrors({general: "Can't download file: maybe it's not zipped yet"});
      }
    } else {
      setErrors({general: 'You dont have permission'});
    }
  };

  return (
    <Card style={styles.container}>
      <Card.Content>
        {edit ? (
          <View style={styles.form}>
            <ScrollView style={styles.scroll}>
              <TextInput
                label="Name"
                value={newName}
                onChangeText={text => setNewName(text)}
                mode="outlined"
                placeholder="name"
                error={
                  newName.trim().length < 4 ||
                  (errors.name && errors.name !== '')
                }
                keyboardType="default"
                style={{marginTop: 10}}
              />
              <HelperText
                type="error"
                visible={
                  newName.trim().length < 4 ||
                  (errors.name && errors.name !== '')
                }>
                {newName.trim().length < 4 ? 'Incorrect name' : errors.name}
              </HelperText>
            </ScrollView>
          </View>
        ) : (
          <Caption style={{textAlign: 'left'}}>Name: {name}</Caption>
        )}
        {file.owner && (
          <Caption style={{textAlign: 'left'}}>Owner: {file.owner}</Caption>
        )}
        <Caption style={{textAlign: 'left'}}>
          Original name: {originalFilename}
        </Caption>
        <Caption style={{textAlign: 'left'}}>Size: {size} bytes</Caption>
        <Caption style={{textAlign: 'left'}}>
          Status: {status === 0 ? 'Uploaded' : 'Compressed'}
        </Caption>
        <Caption style={{textAlign: 'left'}}>
          Created at: {dateToString(createdAt)}
        </Caption>
        <Caption style={{textAlign: 'left'}}>
          Updated at: {dateToString(updatedAt)}
        </Caption>
      </Card.Content>
      <Card.Actions>
        <View style={styles.row}>
          {edit ? (
            <>
              <Button mode="outlined" onPress={changeName}>
                Save
              </Button>
              <Button mode="outlined" onPress={() => setEdit(false)}>
                Cancel
              </Button>
            </>
          ) : (
            <>
              {editMode && (
                <>
                  <Button mode="outlined" onPress={() => setEdit(true)}>
                    Edit
                  </Button>
                  <Button
                    mode="outlined"
                    onPress={removeFile}
                    color={theme.colors.error}>
                    Delete
                  </Button>
                </>
              )}

              <Button
                mode="outlined"
                onPress={getFile}
                color={theme.colors.notification}>
                Download
              </Button>
            </>
          )}
        </View>
      </Card.Actions>

      <Snackbar
        visible={errors.general}
        onDismiss={() => setErrors({...errors, general: ''})}
        action={{
          label: 'Ok',
          onPress: () => setErrors({...errors, general: ''}),
        }}>
        {errors.general}
      </Snackbar>
    </Card>
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
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
    width: '100%',
  },
  column: {
    flexDirection: 'column',
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
});

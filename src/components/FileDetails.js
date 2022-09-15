/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState} from 'react';
import {StyleSheet, View} from 'react-native';
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
    <Card style={styles.container}>
      <Card.Content>
        {edit ? (
          <View style={styles.column}>
            <TextInput
              label="Name"
              value={newName}
              onChangeText={text => setNewName(text)}
              mode="outlined"
              placeholder="name"
              error={
                newName.trim().length < 4 || (errors.name && errors.name !== '')
              }
              keyboardType="default"
              style={{marginTop: 10}}
            />
            <HelperText
              type="error"
              visible={
                newName.trim().length < 4 || (errors.name && errors.name !== '')
              }>
              {newName.trim().length < 4 ? 'Incorrect name' : errors.name}
            </HelperText>
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

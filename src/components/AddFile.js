/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useContext, useCallback} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  Button,
  HelperText,
  Snackbar,
  Subheading,
  TextInput,
  TouchableRipple,
  useTheme,
} from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';

import UploadIcon from './UploadIcon';

import AppContext from '../context/AppContext';

const AddFiles = ({user, navigation}) => {
  const {uploadFile} = useContext(AppContext);
  const [loadingFile, setLoadingFile] = useState(false);
  const [filetoupload, setFiletoupload] = useState(null);
  const [errors, setErrors] = useState({});
  const [name, setName] = useState('');
  const theme = useTheme();

  const handleFileChange = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        allowMultiSelection: false,
      });
      setFiletoupload(response);
    } catch (err) {
      console.warn(err);
    }
  }, []);

  const submitForm = async file => {
    try {
      setLoadingFile(true);
      const result = await uploadFile({filetoupload, name: name.trim()});
      setLoadingFile(false);
      if (result && result.general) {
        setErrors({general: result.general});
      }
    } catch (error) {
      setLoadingFile(false);
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
        <Subheading style={{padding: 5}}>Upload files</Subheading>
        <ScrollView style={styles.scroll}>
          <TouchableRipple onPress={handleFileChange}>
            <UploadIcon fill={theme.colors.primary} width={50} height={50} />
          </TouchableRipple>
          <TextInput
            label="Name"
            value={name}
            onChangeText={text => setName(text)}
            mode="outlined"
            placeholder="Name"
            error={name.length < 4 || (errors.name && errors.name !== '')}
            keyboardType="default"
            style={{marginTop: 10}}
          />
          <HelperText type="error" visible={name.length < 4}>
            {name.length < 4 ? 'Short name' : ''}
          </HelperText>
          <Button
            mode="contained"
            onPress={submitForm}
            style={{width: '100%', alignSelf: 'center', marginBottom: 30}}
            disabled={name.trim().length < 4 || !filetoupload || loadingFile}>
            Upload file
          </Button>

          <View style={styles.bottom}></View>
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

export default AddFiles;

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

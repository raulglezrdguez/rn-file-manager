import React, {useReducer} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';

import jwtDecode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';

import AppContext from './AppContext';
import AppReducer from './AppReducer';

import {
  CombinedDarkTheme as darkTheme,
  CombinedDefaultTheme as lightTheme,
} from './theme';
import {
  SET_DARKMODE,
  SWITCH_DARKMODE,
  LOGIN,
  LOGOUT,
  SET_FILES,
  UPDATE_FILES,
  UPLOAD_FILE,
  DELETE_FILE,
  SET_ALL_FILES,
  SHOW_SNACKBAR_MESSAGE,
  CLOSE_SNACKBAR,
} from './types';

const initialState = {
  darkMode: true,
  user: null,
  files: [],
  allFiles: [],
  snackbarMessage: 'message',
  snackbarOpened: false,
};

const AppState = props => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const loadTheme = useCallback(async () => {
    let darkMode = await AsyncStorage.getItem('darkMode');
    darkMode = darkMode === 'true';
    dispatch({type: SET_DARKMODE, payload: darkMode});
  }, [dispatch]);
  const loadUser = useCallback(async () => {
    let user = null;
    const token = await AsyncStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const expiresAt = new Date(decodedToken.exp * 1000);

      if (new Date() > expiresAt) {
        await AsyncStorage.removeItem('token');
      } else {
        user = decodedToken;
        user.token = token;
        dispatch({type: LOGIN, payload: user});
      }
    } else {
      console.log('No token found');
    }
  }, [dispatch]);
  useEffect(() => {
    loadTheme();
    loadUser();
  }, []);

  const switchDarkMode = async () => {
    await AsyncStorage.setItem('darkMode', state.darkMode ? 'false' : 'true');
    dispatch({type: SWITCH_DARKMODE, payload: ''});
  };

  const login = async payload => {
    if (payload.token) {
      await AsyncStorage.setItem('token', payload.token);
    }
    dispatch({type: LOGIN, payload});
  };
  const logout = async () => {
    await AsyncStorage.removeItem('token');
    dispatch({type: LOGOUT, payload: ''});
  };

  const setFiles = payload => {
    dispatch({type: SET_FILES, payload});
  };
  const updateFile = async payload => {
    try {
      const result = await axios.patch(
        `${process.env.REACT_APP_SERVER_HOST}file/file`,
        payload,
        {
          headers: {Authorization: `Bearer ${state.user.token}`},
        },
      );
      dispatch({type: UPDATE_FILES, payload: {...payload, ...result.data}});

      return {general: `Filename updated to: ${result.data.name}`};
    } catch (error) {
      if (error.response) {
        return error.response.data;
      } else if (error.request) {
        return {general: 'No response received'};
      } else {
        return {general: error.message};
      }
    }
  };
  const uploadFile = async payload => {
    try {
      const formData = new FormData();
      formData.append('filetoupload', payload.filetoupload);
      formData.append('name', payload.name);

      const result = await axios.post(
        `${process.env.REACT_APP_SERVER_HOST}file/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${state.user.token}`,
          },
        },
      );
      dispatch({type: UPLOAD_FILE, payload: {...result.data}});

      return {general: `File ${result.data.name} uploaded`};
    } catch (error) {
      if (error.response) {
        return error.response.data;
      } else if (error.request) {
        return {general: 'No response received'};
      } else {
        return {general: error.message};
      }
    }
  };
  const deleteFile = async payload => {
    try {
      await axios.delete(`${process.env.REACT_APP_SERVER_HOST}file/file`, {
        headers: {Authorization: `Bearer ${state.user.token}`},
        data: {fileId: payload},
      });
      dispatch({type: DELETE_FILE, payload});

      return {general: 'File deleted'};
    } catch (error) {
      console.log(error);
      if (error.response) {
        return error.response.data;
      } else if (error.request) {
        return {general: 'No response received'};
      } else {
        return {general: error.message};
      }
    }
  };
  const downloadFile = async payload => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_HOST}file/download`,
        {
          params: {fileId: payload.fileId},
          headers: {Authorization: `Bearer ${state.user.token}`},
          responseType: 'blob',
        },
      );
      //   const href = URL.createObjectURL(response.data);

      // create "a" HTLM element with href to file & click
      // const link = document.createElement("a");
      // link.href = href;
      // link.setAttribute("download", `${payload.name}.zip`); //or any other extension
      // document.body.appendChild(link);
      // link.click();

      // clean up "a" element & remove ObjectURL
      // document.body.removeChild(link);
      // URL.revokeObjectURL(`${process.env.REACT_APP_SERVER_HOST}file/download`);

      return {general: `Downloading ${payload.name}.zip`};
    } catch (error) {
      if (error.response) {
        return error.response.data;
      } else if (error.request) {
        return {general: 'No response received'};
      } else {
        return {general: error.message};
      }
    }
  };

  const setAllFiles = payload => {
    dispatch({type: SET_ALL_FILES, payload});
  };

  const showSnackbarMessage = payload => {
    dispatch({type: SHOW_SNACKBAR_MESSAGE, payload});
  };
  const closeSnackbar = () => {
    dispatch({type: CLOSE_SNACKBAR});
  };

  const theme = state.darkMode ? darkTheme : lightTheme;

  return (
    <AppContext.Provider
      value={{
        darkMode: state.darkMode,
        switchDarkMode,
        user: state.user,
        files: state.files,
        allFiles: state.allFiles,
        setFiles,
        updateFile,
        uploadFile,
        deleteFile,
        downloadFile,
        setAllFiles,
        login,
        logout,
        snackbarMessage: state.snackbarMessage,
        snackbarOpened: state.snackbarOpened,
        showSnackbarMessage,
        closeSnackbar,
      }}>
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <NavigationContainer theme={theme}>
            {props.children}
          </NavigationContainer>
        </PaperProvider>
      </SafeAreaProvider>
    </AppContext.Provider>
  );
};

export default AppState;

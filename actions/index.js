import { v4 as generateId } from 'node-uuid';

import { firebase } from '../api';

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const FETCH_COMMENTS = 'FETCH_COMMENTS';
export const SELECT_COMMENT = 'SELECT_COMMENT';

export const RECEIVE_CHANNELS = 'RECEIVE_CHANNELS';

export const ADD_IMAGE = 'ADD_IMAGE';
export const REMOVE_IMAGE = 'REMOVE_IMAGE';
export const SELECT_IMAGE = 'SELECT_IMAGE';

export const REQUEST_IMAGE = 'REQUEST_IMAGE';
export const RECEIVE_IMAGE = 'RECEIVE_IMAGE';
export const RECEIVE_IMAGES = 'RECEIVE_IMAGES';

export const RECEIVE_REPOS = 'RECEIVE_REPOS';
export const RECEIVE_REPO = 'RECEIVE_REPO';

export const SET_FETCH_ERROR = 'SET_FETCH_ERROR';
export const SET_APP_ERROR = 'SET_APP_ERROR';

export const OPEN_DIALOG = 'OPEN_DIALOG';
export const CLOSE_DIALOG = 'CLOSE_DIALOG';

export const SET_SETTINGS = 'SET_SETTINGS';
export const UPDATE_SETTINGS = 'UPDATE_SETTINGS';
export const LOGGING_IN = 'LOGGING_IN';

export const receiveComments = (comments) => ({
  type: RECEIVE_COMMENTS,
  data: comments
});

export const selectComment = (id) => ({
  type: SELECT_COMMENT,
  id
});

export const receiveChannels = (channels) => ({
  type: RECEIVE_CHANNELS,
  data: channels
});

export const loggingIn = (logging_in) => ({
  type: LOGGING_IN,
  logging_in
});

export const addImage = (name) => ({
  type: ADD_IMAGE,
  id: generateId(),
  name
});

export const removeImage = id => ({
  type: REMOVE_IMAGE,
  id
});

export const selectImage = id => ({
  type: SELECT_IMAGE,
  id
});

export const requestImage = (id) => ({
  type: REQUEST_IMAGE,
  id
});

export const receiveImage = (id, data) => ({
  type: RECEIVE_IMAGE,
  id,
  ...data
});

export const receiveImages = (images) => ({
  type: RECEIVE_IMAGES,
  images
});

export const receiveRepos = data => ({
  type: RECEIVE_REPOS,
  data
});

export const receiveRepo = data => ({
  type: RECEIVE_REPO,
  data
});

export const setAppError = text => ({
  type: SET_APP_ERROR,
  text
});

export const setFetchError = id => ({
  type: SET_FETCH_ERROR,
  id
});

export const updateSettings = data => ({
  type: UPDATE_SETTINGS,
  data
});

export const setSettings = (data) => {
  return (dispatch, getState) => {
    if (getState().settings.logged_in === false) {
      dispatch(updateSettings(data));
      return Promise.resolve();
    }
    let settings = { ...getState().settings, ...data };
    firebase.writeDb(`users/${getState().settings.firebase_user.uid}/settings`, settings)
      .then(() => dispatch(updateSettings(data)))
      .catch((error) => dispatch(setAppError(error)));
  };
};

export const login = () => {
  return (dispatch, getState) => {
    firebase.googleLogin()
      .then((result) => {
        console.log('loginGoogleWithRedirect', result);
        if (result.credential) {
          dispatch(setSettings({ firebase_user: result.user.toJSON(), logged_in: true, checking_login: false }));
          dispatch(closeDialog());
          return Promise.resolve();
        } else {
          dispatch(setSettings({ firebase_user: null, logged_in: false, checking_login: false }));
        }
      })
      .then(() => fetchAndReceiveImages(dispatch, getState().settings.firebase_user.uid))
      .then(() => fetchAndReceiveChannels(dispatch, getState().channels))
      .then(() => fetchAndReceiveComments(dispatch, getState().comments.channel_id))
      .then(() => fetchSettings(dispatch, getState().settings.firebase_user.uid))
      .catch((error) => dispatch(setAppError(error)));
  };
};

export const checkLogin = () => {
  return (dispatch, getState) => {
    let user = firebase.getUser();
    dispatch(setSettings({ checking_login: true }));
    if (user === null) {
      firebase.googleRedirectResult()
        .then((result) => {
          console.log('googleRedirectResult', result);
          if (result.credential) {
            dispatch(setSettings({ firebase_user: result.user.toJSON(), logged_in: true, checking_login: false }));
            dispatch(closeDialog());
            return Promise.resolve();
          } else {
            dispatch(setSettings({ firebase_user: null, logged_in: false, checking_login: false }));
            return Promise.reject('You must login to use the app.');
          }
        })
        .then(() => fetchAndReceiveImages(dispatch, getState().settings.firebase_user.uid))
        .then(() => fetchAndReceiveChannels(dispatch, getState().channels))
        .then(() => fetchAndReceiveComments(dispatch, getState().comments.channel_id))
        .then(() => fetchSettings(dispatch, getState().settings.firebase_user.uid))
        .catch((error) => dispatch(setAppError(error)));
    } else {
      console.log('checkLogin found user', user);
      dispatch(setSettings({ firebase_user: user, logged_in: true, checking_login: false }));
      fetchAndReceiveImages(dispatch, user.uid);
      fetchAndReceiveComments(dispatch, getState().comments.channel_id);
      fetchAndReceiveChannels(dispatch, getState().channels);
    }
  };
};

const fetchAndReceiveImages = (dispatch, uid) => {
  return new Promise((resolve, reject) => {
    fetchPictures(uid)
      .then((images) => {
        if (images) {
          dispatch(receiveImages(images));
        } else {
          images = [];
        }
        resolve(images);
      })
      .catch((error) => dispatch(setAppError(error.code)));
  });
};

export const writeComment = (data) => {
  return new Promise((resolve, reject) => {
    console.log(`write comments ${data}`);
    firebase.writeDb('comments/0', data)
      .then(() => resolve())
      .catch((error) => reject(error));
  });
};

export const fetchAndReceiveComments = (dispatch, channel_id) => {
  return new Promise((resolve, reject) => {
    console.log(`fetch and receive comments for channel ${channel_id}`);
    fetchComments(channel_id)
      .then((comments) => {
        console.log(comments);
        dispatch(receiveComments(comments));
        resolve();
      })
      .catch((error) => {
        dispatch(setAppError(error));
        dispatch(closeDialog());
        reject(error);
      });
  });
};

export const fetchAndReceiveChannels = (dispatch) => {
  return new Promise((resolve, reject) => {
    fetchChannels()
      .then((channels) => {
        console.log(channels);
        dispatch(receiveChannels(channels));
        resolve();
      })
      .catch((error) => {
        dispatch(setAppError(error));
        dispatch(closeDialog());
        reject(error);
      });
  });
};

const fetchComments = (channel_id) => {
  return new Promise((resolve, reject) => {
    console.log(`fetch comments for channel ${channel_id}`);
    firebase.fetchDb(`comments/${channel_id}`)
      .then((comments) => resolve(comments))
      .catch((error) => reject(error));
  });
};

const fetchChannels = (channels) => {
  return new Promise((resolve, reject) => {
    firebase.fetchDb('channels')
      .then((channels) => resolve(channels))
      .catch((error) => reject(error));
  });
};

const fetchPictures = (uid) => {
  return new Promise((resolve, reject) => {
    firebase.fetchDb(`users/${uid}/images`)
      .then((images) => resolve(images))
      .catch((error) => reject(error));
  });
};

const fetchSettings = (dispatch, uid) => {
  return new Promise((resolve, reject) => {
    firebase.fetchDb(`users/${uid}/settings`)
      .then((settings) => {
        resolve(settings);
      })
      .catch((error) => reject(error));
  });
};

export const takeAndStorePicture = () => {
  return (dispatch, getState) => {
    const id = generateId();
    const uid = getState().settings.firebase_user.uid;

    takePicture()
      .then((image_data) => firebase.storeFile(id, image_data))
      .then((picture) => firebase.writeDb(`users/${uid}/images/${picture.id}`, picture))
      .then((picture) => dispatch(receiveImage(id, picture)))
      .catch((error) => {
        dispatch(setAppError(error));
        dispatch(closeDialog());
      });
  };
};

const takePicture = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.camera) {
      reject('Camera not available.');
    } else {
      navigator.camera.getPicture(
        (data) => {
          resolve(data);
        },
        (error) => {
          console.log('caught outer error getPicture');
          reject(error);
        }, {
          quality: 75,
          targetWidth: 800,
          targetHeight: 600,
          saveToPhotoAlbum: false,
          destinationType: Camera.DestinationType.DATA_URL // eslint-disable-line no-undef
        });
    }
  });
};

export const openDialog = () => ({
  type: OPEN_DIALOG
});

export const closeDialog = () => ({
  type: CLOSE_DIALOG
});

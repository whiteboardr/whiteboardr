const CONFIG = {
  apiKey: 'AIzaSyD6BDHnjY_ZfOA3rx47ZJ1YutF6UBsvp6k',
  authDomain: 'whiteboardr-bbf6a.firebaseapp.com',
  databaseURL: 'https://whiteboardr-bbf6a.firebaseio.com',
  projectId: 'whiteboardr-bbf6a',
  storageBucket: 'whiteboardr-bbf6a.appspot.com',
  messagingSenderId: '918979856934'
};
window.firebase.initializeApp(CONFIG);

export const googleLogin = () => {
  return new Promise((resolve, reject) => {
    let provider = new window.firebase.auth.GoogleAuthProvider();
    window.firebase.auth().signInWithRedirect(provider).then(() => {
      window.firebase.auth().getRedirectResult().then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error.code);
      });
    });
  });
};

export const googleRedirectResult = () => {
  return window.firebase.auth().getRedirectResult();
};

export const getUser = () => {
  let user = window.firebase.auth().currentUser;
  if (user) {
    return user.toJSON();
  } else {
    return null;
  }
};

export const storeFile = (filename, image_data) => {
  return new Promise((resolve, reject) => {
    const storage_ref = window.firebase.storage().ref();
    const upload_task = storage_ref.child(`images/${filename}`).putString(image_data, 'base64');
    upload_task.on('state_changed', (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    }, (error) => {
      let message = `storeFile(${filename}) failed: ${error.code}`;
      console.log(message);
      reject(message);
    }, () => {
      const now = new Date();
      resolve({
        id: now.toISOString().slice(0, 19).replace(/[\WT]/g, ''),
        name: now.toLocaleString(),
        url: upload_task.snapshot.downloadURL
      });
    });
  });
};

export const writeDb = (ref, data) => {
  return new Promise((resolve, reject) => {
    window.firebase.database()
      .ref(ref)
      .set(data)
      .then(() => resolve(data))
      .catch((error) => reject(error));
  });
};

export const fetchDb = (ref) => {
  return new Promise((resolve, reject) => {
    window.firebase.database()
      .ref(ref)
      .once('value')
      .then((snapshot) => {
        resolve(snapshot.val());
      })
      .catch((error) => reject(error));
  });
};

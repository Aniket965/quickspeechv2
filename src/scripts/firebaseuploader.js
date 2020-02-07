// Depends upon Uploader from storage.js


function Uploader() {
    this.service = "default";
    this.config = {};
    this.upload = function(blob, key) {
      return "notimplemented";
    };
    this.ref = null;
    this.tasks = [];
  }
  
  var FireBaseUploader = new Uploader();
  
  FireBaseUploader.service = "firebase";
  FireBaseUploader.config =  {
    apiKey: "AIzaSyAadTRY8xc67MBmFM7IgRkID3mmWGvZAdQ",
    authDomain: "quickspeech-v2.firebaseapp.com",
    databaseURL: "https://quickspeech-v2.firebaseio.com",
    projectId: "quickspeech-v2",
    storageBucket: "quickspeech-v2.appspot.com",
    messagingSenderId: "266281944320",
    appId: "1:266281944320:web:1b5b3e86392efc59b2dfe5",
    measurementId: "G-S2FC27NW9T"
  };
  
  firebase.initializeApp(FireBaseUploader.config);
  FireBaseUploader.ref = firebase.storage().ref();
  
  FireBaseUploader.tasks = {};
  
  FireBaseUploader.uploadBlob = function(blob, label, file_type) {
    const metadata = {
      contentType: file_type
    };
  
    const task = this.ref.child(label).put(blob, metadata);
    this.tasks[label] = task;
    task
      // .then(snapshot => snapshot.ref.getDownloadURL())
      .then(ev => {
        console.log("Completed:" + ev);
      })
      .catch(err => {
        console.log(err);
      });
  };
  
  FireBaseUploader.uploadWebAudioBlob = function(blob, label) {
    this.uploadBlob(blob, label, blob.type);
  };
  
  export default FireBaseUploader;
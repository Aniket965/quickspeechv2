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
  FireBaseUploader.config = {
    apiKey: "AIzaSyCtSbOzi4GNcVoQTf5NftbNiDhUrNzO0Ow",
    authDomain: "quickspeech-iiit.firebaseapp.com",
    databaseURL: "https://quickspeech-iiit.firebaseio.com",
    projectId: "quickspeech-iiit",
    storageBucket: "quickspeech-iiit.appspot.com",
    messagingSenderId: "84141281869",
    appId: "1:84141281869:web:ad181233d8a896e7"
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
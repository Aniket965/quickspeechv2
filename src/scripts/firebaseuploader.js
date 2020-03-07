// Depends upon Uploader from storage.js
import firebaseConfig from './firebase-config.json'; 

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
  FireBaseUploader.config =  firebaseConfig['result'];
  
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
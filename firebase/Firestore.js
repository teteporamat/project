import * as firebase from "firebase";
import "firebase/firestore";

class Firestore {
  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyD5e6NibZWOx8qFZnWs8dTpreK3pyfoh8s",
        authDomain: "mobile-week-08.firebaseapp.com",
        databaseURL: "https://mobile-week-08.firebaseio.com",
        projectId: "mobile-week-08",
        storageBucket: "mobile-week-08.appspot.com",
        messagingSenderId: "679841507699",
        appId: "1:679841507699:web:850b49e9499be913b7bd06",
        measurementId: "G-JLBVWHJHWR",
      });
    } else {
      console.log("firebase apps already running...");
    }
  }
  get_post_storage = async (img_name, accept, reject) => {
    console.log("func: Firestore/get_post_storage ");
    var imagesRef = firebase
      .storage()
      .ref()
      .child("posts/" + img_name);
    await imagesRef
      .getDownloadURL()
      .then((querySnapshot) => {
        // console.log(querySnapshot);
        accept(querySnapshot);
      })
      .catch((err) => {
        reject(err);
      });
    console.log("func: Firestore/get_post_storage pass");
  };

  get_post_store = async (accept, reject) => {
    console.log("func: Firestore/get_post_store");
    firebase
      .firestore()
      .collection("posts")
      .get()
      .then(function (querySnapshot) {
        accept(querySnapshot);
      })
      .catch(function (error) {
        reject(error);
      });
    console.log("func: Firestore/get_post_store pass");
  };

  get_init = async (accept, reject) => {
    console.log("func: Firestore/get_init");
    firebase
      .firestore()
      .collection("users")
      .get()
      .then(function (querySnapshot) {
        accept(querySnapshot);
      })
      .catch(function (error) {
        reject(error);
      });
    console.log("func: Firestore/get_init pass");
  };

  add_post_store = async (post, accept, reject) => {
    console.log("func: Firestore/add_post_store");
    post.date = firebase.firestore.FieldValue.serverTimestamp();
    await firebase
      .firestore()
      .collection("posts")
      .add(post)
      .then(function (docRef) {
        accept(docRef);
      })
      .catch(function (error) {
        reject(error);
      });
    console.log("func: Firestore/add_post_store pass");
  };

  add_post_storage = async (uri, file_name, accept, reject) => {
    console.log("func: Firestore/add_post_storage");
    const url = await fetch(uri);
    const blob = await url.blob();
    var ref = firebase
      .storage()
      .ref()
      .child("posts/" + file_name);
    await ref
      .put(blob)
      .then((snapshot) => {
        snapshot.ref
          .getDownloadURL()
          .then((uri) => {
            accept(uri);
          })
          .catch((err) => {
            reject(err);
          });
      })
      .catch((err) => {
        reject(err);
      });
    console.log("func: Firestore/add_post_storage pass");
  };

  listening_like = () => {
    console.log("func: Firestore/listening_like");
    console.log("func: Firestore/listening_like pass");
  };

  update_post_like = (id, count, accept, reject) => {
    console.log("func: Firestore/update_post_like");
    firebase
      .firestore()
      .collection("posts")
      .doc(id)
      .set(
        {
          like: count + 1,
        },
        { merge: true }
      )
      .then(function () {
        accept(doc);
      })
      .catch(function (err) {
        reject(err);
      });
    console.log("func: Firestore/update_post_like pass");
  };

  update_post_share = (id, count, accept, reject) => {
    console.log("func: Firestore/update_post_share");
    firebase
      .firestore()
      .collection("posts")
      .doc(id)
      .set(
        {
          share: count + 1,
        },
        { merge: true }
      )
      .then(function () {
        accept(doc);
      })
      .catch(function (err) {
        reject(err);
      });
    console.log("func: Firestore/update_post_share pass");
  };

  add_users = (user, accept, reject) => {
    console.log("func: Firestore/add_users");
    user.date = firebase.firestore.FieldValue.serverTimestamp();
    firebase
      .firestore()
      .collection("users")
      .add(user)
      .then(function (docRef) {
        accept(docRef);
      })
      .catch(function (error) {
        reject(error);
      });
    console.log("func: Firestore/add_users pass");
  };

  update_users = (id, name, accept, reject) => {
    console.log("func: Firestore/update_users");
    firebase
      .firestore()
      .collection("users")
      .doc(id)
      .set(
        {
          name: name,
        },
        { merge: true }
      )
      .then(function () {
        accept(doc);
      })
      .catch(function (err) {
        reject(err);
      });
    console.log("func: Firestore/update_users pass");
  };

  auth_first = async (email, password, accept, reject) => {
    console.log("func: Firestore/auth_first");
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        accept(user);
      })
      .catch((error) => {
        reject(error);
      });
    console.log("func: Firestore/auth_first pass");
  };
  auth = (email, password, accept, reject) => {
    console.log("func: Firestore/auth");
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        accept(user);
      })
      .catch((error) => {
        reject(error);
      });
    console.log("func: Firestore/auth pass");
  };
}

const firestore = new Firestore();
export default firestore;

// public/firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js");

const config = firebase.initializeApp({
  apiKey: "AIzaSyBLJmyhC6-cNEba9gjp8FovcrmwRJi2pgI",
  authDomain: "packnd-694ba.firebaseapp.com",
  projectId:"packnd-694ba",
  storageBucket:"packnd-694ba.firebasestorage.app",
  messagingSenderId: "783045027871",
  appId:"1:783045027871:web:0189aac850661225760d2a",
  measurementId: "G-0562F2T07J",
});


const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {

  const { title, body } = payload.notification;

  self.registration.showNotification(title, {
    body,
    icon: "/firebase-logo.png",
  });
});

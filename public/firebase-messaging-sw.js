importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyC2hJHMQO2V1Ph1yWf7zhasYz0oPfGgbro",
  authDomain: "notify-hub-pro.firebaseapp.com",
  databaseURL: "https://notify-hub-pro-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "notify-hub-pro",
  storageBucket: "notify-hub-pro.firebasestorage.app",
  messagingSenderId: "369865112650",
  appId: "1:369865112650:web:bce4a2a2225c5f92e27ab3",
  measurementId: "G-319E9W8FMC"
};

firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();


messaging.onBackgroundMessage(messaging, (payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});

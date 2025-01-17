
import { messaging, getToken, onMessage } from "./firebase-config";
import axios from "axios";  // Axios for API requests




// Request Notification Permission and Send FCM Token to Server
const requestPermission = async () => {
    
    try {

        const userid = localStorage.getItem('id');
        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
          
            return;
        }


        const token = await getToken(messaging, { vapidKey:process.env.REACT_APP_FIREBASE_VAPID_KEY  });
        
        if (token) {

            await sendTokenToServer(userid, token);
        } else {
           
        }
    } catch (error) {
        
    }
};

// Send FCM Token to Backend
const sendTokenToServer = async (userid, token) => {
    try {

        const res= await axios.post(`${process.env.REACT_APP_API_BASE_URL}/token_update`, {
            userid,
            token
        } );
        


    } catch (error) {
      
    }
};

// Listen for Incoming Messages
const listenForMessages = () => {
    onMessage(messaging, (payload) => {
        

        const { title, body, icon } = payload.notification;
        new Notification(title, {
            body,
            icon: icon || "/firebase-logo.png",
        });
    });
};

export { requestPermission, listenForMessages };







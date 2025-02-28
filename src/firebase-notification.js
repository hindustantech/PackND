import { messaging, getToken, onMessage } from "./firebase-config";
import axios from "axios";

// Request Notification Permission and Send FCM Token to Server
const requestPermission = async () => {
    try {
        const userid = localStorage.getItem("id");
        const permission = await Notification.requestPermission();

        if (permission !== "granted") {
            console.log("Notification permission denied");
            return;
        }

        // Get FCM Token
        const token = await getToken(messaging, {
            vapidKey: "BFLbI9od549I2z-vq8QaSqgpZHRhGxIEtgYqwlTVNSccoHvhLLUuMSMj1bpc4W-CwsDA9gN5iWnQI4YvWWAb6cA"
        });

        if (token) {
            localStorage.setItem("token", token);
            await sendTokenToServer(userid, token);
            // console.log("FCM Token:", token);
        } else {
            // console.log("Failed to get FCM token");
        }

        // Start listening for foreground messages
        listenForMessages();
    } catch (error) {
        console.error("Error requesting notification permission:", error);
    }
};

// Send FCM Token to Backend
export const sendTokenToServer = async (userid, token) => {
    try {
        await axios.post(`${process.env.REACT_APP_API_BASE_URL}/token_update`, {
            userid,
            token,
        });
    } catch (error) {
        console.error("Error sending token to server:", error);
    }
};

// Listen for Foreground Notifications
const listenForMessages = () => {
    onMessage(messaging, (payload) => {
        console.log("Foreground Message Received:", payload);

        if (!("Notification" in window)) {
            console.log("This browser does not support notifications.");
            return;
        }

        const { title, body, icon } = payload.notification;

        // Show notification
        new Notification(title, {
            body,
            icon: icon || "/firebase-logo.png",
        });
    });
};

export { requestPermission, listenForMessages };

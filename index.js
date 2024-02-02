import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getMessaging } from "firebase-admin/messaging";
import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(cors());

app.use(function(req, res, next) {
    res.setHeader("Content-Type", "application/json");
    next();
});

initializeApp({
  credential: applicationDefault(),
  databaseURL: "https://hamro-futsal-4e9fb-default-rtdb.firebaseio.com",
  projectId: "hamro-futsal-4e9fb",
});

app.post('/send-notification', (req, res) => {
    const message = {
        notification: {
          title: "Notification by futsal app",
          body: 'This is a Test Notification'
        },
        token:
        "en5daGZsTXm-zXK_JFxYnO:APA91bE2FzIJSko9Yx1LXq4n4XOXxxuMqZGwHxSbWOIU0MUTfN5u8sD8c2uLyLI89qvKuslJdrGWtTFk6kpQrTEotRifkRn75ebfuW1IANVE8GsqSkUhJz6ds-VACXF1zOOkMq400HxI", // Assuming the token is sent in the request body
    };
    
    getMessaging()
    .send(message)
    .then((response) => {
        res.status(200).json({
            message: "Successfully sent message",
            token: 
            "en5daGZsTXm-zXK_JFxYnO:APA91bE2FzIJSko9Yx1LXq4n4XOXxxuMqZGwHxSbWOIU0MUTfN5u8sD8c2uLyLI89qvKuslJdrGWtTFk6kpQrTEotRifkRn75ebfuW1IANVE8GsqSkUhJz6ds-VACXF1zOOkMq400HxI",
        });
        console.log("Successfully sent message:", response);
    })
    .catch((error) => {
        res.status(400).json({ error: error.message });
        console.log("Error sending message:", error);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

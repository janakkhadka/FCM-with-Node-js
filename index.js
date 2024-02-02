
import {initializeApp, applicationDefault } from 'firebase-admin/app';
import { getMessaging } from "firebase-admin/messaging";
import express, { json } from "express";
import cors from "cors";


process.env.GOOGLE_APPLICATION_CREDENTIALS;

const app = express();
app.use(express.json());

app.use(
    cors({
      origin: "*",
    })
  );
  
app.use(
    cors({
      methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    })
  );

app.use(function(req, res, next) {
    res.setHeader("Content-Type", "application/json");
    next();
  });



initializeApp({
  credential: applicationDefault(),
  databaseURL: "https://hamro-futsal-4e9fb-default-rtdb.firebaseio.com",
  projectId: "hamro-futsal-4e9fb",
});

const message = {
    notification: {
      title: "Notification by futsal app",
      body: 'This is a Test Notification'
    },
    token: 
    "en5daGZsTXm-zXK_JFxYnO:APA91bE2FzIJSko9Yx1LXq4n4XOXxxuMqZGwHxSbWOIU0MUTfN5u8sD8c2uLyLI89qvKuslJdrGWtTFk6kpQrTEotRifkRn75ebfuW1IANVE8GsqSkUhJz6ds-VACXF1zOOkMq400HxI",
  };


  getMessaging()
  .send(message)
  .then((response) => {
    res.status(200).json({
      message: "Successfully sent message",
      token: receivedToken,
    });
    console.log("Successfully sent message:", response);
  })
  .catch((error) => {
    res.status(400);
    res.send(error);
    console.log("Error sending message:", error);
  });




  app.listen(3000, function () {
    console.log("Server started on port 3000");
  });






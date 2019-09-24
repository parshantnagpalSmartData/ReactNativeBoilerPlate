/*
 * @file: PushNotification.js
 * @description: Contains all function related push notification.
 * @date: 9.Oct.2018
 * @author:Parshant Nagpal
 * */
/* eslint-disable */
import { Platform } from "react-native";
import firebase from "react-native-firebase";
// eslint-disable-next-line no-console
import type { Notification, NotificationOpen } from "react-native-firebase";
import { setFcmDeviceToken } from "../actions/user";
/*
Get the Fcm token of the device
*/
const getToken = async store => {
  const fcmToken = await firebase.messaging().getToken();
  if (fcmToken) {
    console.log("fcmToken", fcmToken);
    store.dispatch(setFcmDeviceToken(fcmToken));
  } else {
    // user doesn't have a device token yet
  }
};

/*
All Listeners related to Firebase
*/
export const listeners = () => {
  this.notificationDisplayedListener = firebase
    .notifications()
    .onNotificationDisplayed(notification => {
      console.log("onNotificationDisplayed", notification);
    });
  this.notificationListener = firebase
    .notifications()
    .onNotification(notification => {
      // When app is in forground  and push come immedialtely show (Without Touch)
      console.log("onNotification", notification);
    });
  this.notificationOpenedListener = firebase
    .notifications()
    .onNotificationOpened((notificationOpen: NotificationOpen) => {
      //when app is in background (not killed ) tapping on the push notification call that
      console.log("notificationOpen", notificationOpen);
    });
};
/*
when app is killed or not in memory push noptification come then cick on the push notification will call that function
*/
const getInitialNotification = async () => {
  const notificationOpen: NotificationOpen = await firebase
    .notifications()
    .getInitialNotification();
  if (notificationOpen) {
    //When the app is killed and tapping on the push will call this function
    console.log("getInitialNotification", notificationOpen);
  }
};
/**
 * Checking the app has permission for using firebase in ios
 */
const checkPermission = async store => {
  const enabled = await firebase.messaging().hasPermission();
  if (enabled) {
    trigerAllEvents(store);
  } else {
    requestpermission(store);
  }
};
/**
 * Requesting the app permission for firebase in ios
 */
const requestpermission = async store => {
  try {
    const enabled = await firebase.messaging().requestPermission();
    if (enabled) {
      trigerAllEvents();
    } else {
      requestpermission();
    }
  } catch (error) {
    // User has rejected permissions
  }
};

const trigerAllEvents = store => {
  getToken(store);
  getInitialNotification();
  listeners();
};
/*
Remove All Listeners
*/
export const removeListeners = () => {
  this.notificationDisplayedListener();
  this.notificationListener();
  this.notificationOpenedListener();
};
/**
 It loads the fcm
 */
export const pushNotifificationInit = async store => {
  if (Platform.OS === "ios") {
    checkPermission(store);
  } else {
    trigerAllEvents(store);
  }
};

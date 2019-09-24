/*
 * @file: RestClient.js
 * @description: Rest Client
 * @date: 14.12.2017
 * @author: Suraj Sanwal
 * */
/* eslint-disable */

"use strict";

import Connection from "../config/Connection";
import { NetInfo, Alert, Platform } from "react-native";
import Constants from "../constants";
class RestClient {
  static isConnected() {
    let context = this;
    return new Promise(function(fulfill, reject) {
      // if (Platform.OS === "android") {
      //   fulfill(true);
      // }
      NetInfo.isConnected.fetch().then(isConnected => {
        console.log("isConnectedisConnected", isConnected);
        if (isConnected) fulfill(isConnected);
        else {
          reject(isConnected);
        }
      });
    });
  }
  static restCall(url, params, token = null, type = "POST") {
    let context = this;
    console.log(type, " call", url, params, token);
    return new Promise(function(fulfill, reject) {
      context
        .isConnected()
        .then(() => {
          fetch(url, {
            method: type,
            timeout: 1000 * 1 * 60,
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              // "Cache-Control": "no-cache",
              Authorization: token
            },
            body: JSON.stringify(params)
          })
            .then(response => {
              console.log("responseresponse", response);
              return response.text();
            })
            .then(responseText => {
              console.log("POST responseText*****", responseText);
              if (responseText) {
                fulfill(JSON.parse(responseText));
              } else {
                fulfill(null);
              }
            })
            .catch(error => {
              fulfill({
                message: Constants.AppConstants.Error.internetConnectivity
              });
              console.warn("eroro", error);
            });
        })
        .catch(error => {
          console.log("eroro ********* ", error);
          fulfill({
            message: "Please check your internet connectivity."
          });
        });
    });
  }
  static getCall(url, token = null) {
    let context = this;
    console.log("get call", url, token);
    return new Promise(function(fulfill, reject) {
      context
        .isConnected()
        .then(() => {
          fetch(url, {
            method: "GET",
            timeout: 1000 * 1 * 60,
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              // "Cache-Control": "no-cache",
              Authorization: token
            }
          })
            .then(response => {
              if (response._bodyInit == "") {
                return response._bodyInit;
              }
              return response.text();
            })
            .then(responseText => {
              console.log("responseTextresponseText", responseText);
              // fulfill(responseText);
              if (responseText) {
                fulfill(JSON.parse(responseText));
              } else {
                fulfill(responseText);
              }
            })
            .catch(error => {
              fulfill({
                message: Constants.AppConstants.Error.internetConnectivity
              });
              console.warn("eroro", error);
            });
        })
        .catch(error => {
          console.log("eroro ********* ", error);
          fulfill({
            message: "Please check your internet connectivity."
          });
        });
    });
  }
  static delCall(url, body, token = null) {
    let context = this;
    console.log("delete call", url, token);
    return new Promise(function(fulfill, reject) {
      context
        .isConnected()
        .then(() => {
          fetch(url, {
            method: "Delete",
            timeout: 1000 * 1 * 60,
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              // "Cache-Control": "no-cache",
              Authorization: token
            },
            body
          })
            .then(response => {
              return response.text();
            })
            .then(responseText => {
              console.log("Del responseText*****", responseText);
              fulfill(JSON.parse(responseText));
            })
            .catch(error => {
              fulfill({
                message: Constants.AppConstants.Error.internetConnectivity
              });
              console.warn("eroro", error);
            });
        })
        .catch(error => {
          console.log("eroro ********* ", error);
          fulfill({
            message: "Please check your internet connectivity."
          });
        });
    });
  }
  static post(url, params, deviceToken = null, deviceType = null) {
    let context = this;
    console.log("login details->", url, params, deviceToken, deviceType);
    return new Promise(function(fulfill, reject) {
      context
        .isConnected()
        .then(() => {
          console.log("url=> ", url, " requestObject=> ", params);
          fetch(url, {
            method: "POST",
            timeout: 1000 * 1 * 60,
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              // "Cache-Control": "no-cache",
              "device-type": deviceType,
              "device-token": deviceToken
            },
            body: JSON.stringify(params)
          })
            .then(response => {
              return response.text();
            })
            .then(responseText => {
              console.log("POST responseText*****", responseText);
              fulfill(JSON.parse(responseText));
            })
            .catch(error => {
              //   debugger;
              fulfill({
                message: Constants.AppConstants.Error.internetConnectivity
              });
              console.warn("eroro", error);
            });
        })
        .catch(error => {
          console.log("eroro ********* ", error);
          fulfill({
            message: "Please check your internet connectivity."
          });
        });
    });
  }
}

export default RestClient;

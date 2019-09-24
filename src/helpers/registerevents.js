/*
 * @file: registerevets.js
 * @description: this file will be used to regiseter all events required in the app
 * @author: Suraj Sanwal
 * */
/* eslint-disable */
import { NetInfo, BackHandler, Platform } from "react-native";
import { handleBackPress } from "../utilities/BackButtonHandling";
import { Navigation } from "react-native-navigation";
import _ from "lodash";
import Event from "../utilities/Events";
import { selectTab } from "../actions/app";
var sideMenu = false;

var Events = {
  RegisterNetEvents: () => {
    let handleFirstConnectivityChange = () => {
      NetInfo.isConnected.removeEventListener(
        "connectionChange",
        handleFirstConnectivityChange
      );
    };
    NetInfo.isConnected.addEventListener(
      "connectionChange",
      handleFirstConnectivityChange
    );
    NetInfo.isConnected.fetch().then(res => {
      console.log("connectionChange====>", res);
    });
  },

  RegisterComponentDidAppearListener: store => {
    Navigation.events().registerComponentDidAppearListener(
      ({ componentId, componentName }) => {
        console.log("componentNamecomponentName", componentName, componentId);
        if (
          componentName == "Posimations" ||
          componentName == "Journal" ||
          componentName == "Dashboard" ||
          componentName == "OozChallenge" ||
          componentName == "Bot"
        ) {
          store.dispatch(selectTab(componentId));
        }
        if (componentName == "Posimations") {
          Event.emit("PosimationsGetAll");
        } else if (componentName == "Journal") {
          Event.emit("getJournal");
        } else if (componentName == "Profile") {
          Event.emit("fetchProfileImages");
        } else if (componentName == "OozChallenge") {
          Event.emit("setOozChallenge");
        } else if (componentName == "Dashboard") {
          Event.emit("callDashboard");
        }
        if (Platform.OS === "android") {
          let { backHandlingScreens } = store.getState().app;

          var index = _.findIndex(
            backHandlingScreens,
            screen => screen === componentName
          );
          if (index !== -1) {
            BackHandler.addEventListener("hardwareBackPress", handleBackPress);
          } else {
            BackHandler.removeEventListener(
              "hardwareBackPress",
              handleBackPress
            );
          }
        }
      }
    );
    Navigation.events().registerComponentDidDisappearListener(
      ({ componentId, componentName }) => {
        if (componentId == "ooz") {
          Event.emit("clearOozData");
        } else if (componentName == "TotalCompletedOozChallange") {
          Event.emit("clearTotalCompletedOozChallange");
        } else if (componentId == "posimations") {
          Event.emit("clearPosimationData");
        } else if (componentId == "journal") {
          Event.emit("clearJournalData");
        } else if (componentId == "dashboard") {
          Event.emit("clearDashboardData");
        }

        if (sideMenu) {
          Navigation.mergeOptions(componentId, {
            sideMenu: {
              right: {
                visible: false
              }
            }
          });
          sideMenu = false;
        }
        if (componentId === "sideDrawer") {
          sideMenu = true;
        }

        // }
      }
    );
  }
};
module.exports = Events;

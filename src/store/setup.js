/**
 * Name :Suraj Sanwal
 * Description: Contains all redux store configuration of app
 * date: 7 Seopt 2018
 */
import {applyMiddleware, createStore, combineReducers, compose} from "redux";
import thunk from "redux-thunk";
import SplashScreen from "react-native-splash-screen";
import {Platform} from "react-native";
import * as reducers from "./../reducers";
import {persistStore, persistReducer} from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";
import {createLogger} from "redux-logger";
import promise from "./promise";
import array from "./array";
import whitelist from "./whitelist";
import {goToAuth, goHome} from "../config/navigation";
import {pushNotifificationInit} from "../helpers/pushnotification";

export const storeObj = {};
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist,
};
// import startApp from '../config/navigators'
export default function setup() {
  const isDev = global.isDebuggingInChrome || __DEV__; // eslint-disable-line

  const logger = createLogger();

  const middleware = [applyMiddleware(...[thunk, promise, array, logger])];

  if (isDev) {
    middleware.push(
      applyMiddleware(require("redux-immutable-state-invariant").default()),
    );
  }
  const reducer = combineReducers(reducers);

  const persistedReducer = persistReducer(persistConfig, reducer);

  const store = createStore(persistedReducer, {}, compose(...middleware));

  // Attach the store to the Chrome debug window
  // if (global.isDebuggingInChrome) {
  //   // eslint-disable-line
  //   window.store = store;
  // }
  persistStore(store, null, () => {
    // console.log("newstore", store.getState().app.root);
    if (store.getState().user.isLoggedIn) {
      goHome();
    } else {
      goToAuth();
    }
    if (Platform.OS == "android") {
      SplashScreen.hide();
    }
    pushNotifificationInit(store);

    // on app loading the persit store loads and we have route from here
    // startApp(store.getState().app.root);
  });
  storeObj.store = store;
  return store;
}

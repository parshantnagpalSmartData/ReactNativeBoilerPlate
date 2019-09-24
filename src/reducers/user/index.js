/*
AuthorName : Suraj Sanwal
FileName: reducer.js
Description: Contains the reducer regarding the user
Date : 11 Sept 2018  
*/

import * as Types from "../../actionTypes";
const initialState = {
  isLoggedIn: false,
  userData: null,
  botImage: null,
  botSwitch: false,
  botName: "Ajivar_dev",
  prevSlotName: null,
  recursionValue: null,
  botChatImage: null,
  fcmDeviceToken: null,
  sentBackToServer: {},
  loginData: null,
  botChatImageUrl: null,
  guideDescription: "",
  GuideName: ""
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case Types.LOGIN_SUCCESS:
      return {
        ...state,
        userData: action.payload,
        isLoggedIn: true
      };
    case Types.LOGIN:
      return { ...state, isLoggedIn: true };
    case Types.LOGIN_USER:
      return { ...state, loginData: action.payload };


    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
        userData: null,
        fcmDeviceToken: null,
      };
    default:
      return state;
  }
};

export default user;

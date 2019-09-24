/*
AuthorName : Suraj Sanwal
FileName: reducer.js
Description: Contains the reducer regarding the user
Date : 11 Sept 2018  
*/

import * as Types from "../../actionTypes";
const initialState = {
  instiutionLoader: false,
  loginLoader: false,
  signupLoader: false,
  posimationLoader: false,
  posimationDelLoader: false
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case Types.LOGIN_REQUEST:
      return {
        ...state,
        loginLoader: true
      };
    case Types.LOGIN:
      return {
        ...state,
        loginLoader: false
      };
    case Types.LOGIN_REQUEST_FAIL:
      return {
        ...state,
        loginLoader: false
      };
    case Types.REGISTER_REQUEST:
      return {
        ...state,
        signupLoader: true
      };
    case Types.REGISTER_REQUEST_SUCCESS:
      return {
        ...state,
        signupLoader: false
      };
    case Types.REGISTER_REQUEST_FAIL:
      return {
        ...state,
        signupLoader: false
      };
    case Types.LOGOUT_REQUEST:
      return {
        ...state,
        loginLoader: true
      };
    case Types.LOGOUT:
      return {
        ...state,
        loginLoader: false
      };

 

    case "RESET":
      return { initialState };
    default:
      return state;
  }
};

export default user;

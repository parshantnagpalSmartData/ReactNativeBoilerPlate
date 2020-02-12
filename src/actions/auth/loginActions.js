import * as types from "../../actionTypes";

import {goHome, goToAuth} from "../../config/navigation";

export const isIntroScreensWatched = () => {
  return dispatch => {
    dispatch({type: types.IS_INTROSCREEN_WATHCED});
  };
};
//eslint-disable-next-line
export const loginUser = (username, password, componentId) => {
  return dispatch => {
    dispatch({type: types.LOGIN});
    goHome();
  };
};

export const registerUser = (user, componentId) => {
  //eslint-disable-line
  return dispatch => {
    dispatch({type: types.LOGIN});
    goHome();
  };
};

export const logOut = () => {
  return dispatch => {
    goToAuth("SignUp");
    dispatch({
      type: types.LOGOUT,
    });
    dispatch({
      type: "RESET",
    });
  };
};

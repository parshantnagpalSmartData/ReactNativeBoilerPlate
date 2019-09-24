import * as types from "../../actionTypes";
import * as AppActions from "../index";
// import { Alert } from "react-native";
import { goHome, goToAuth } from "../../config/navigation";

import RestClient from "../../helpers/RestClient";
// import { getCallingCode } from "../../helpers/country";
// import { Navigation } from "react-native-navigation";
// import { handleLoader } from "../app";
import Constants from "../../constants";

export const loginUser = (username, password, componentId) => {
  return dispatch => {
        dispatch({ type: types.LOGIN });
        goHome();
  };
};

// // export const confirmPassword = (
// //   email,
// //   verificationCode,
// //   password,
// //   componentId
// // ) => {
// //   return dispatch => {
// //     RestClient.isConnected()
// //       .then(() => {
// //         dispatch(handleLoader(true));
// //         dispatch({ type: "CONFIRM_PASSWORD_REQUEST" });

// //         Auth.forgotPasswordSubmit(email, verificationCode, password)
// //           .then(res => {
// //             dispatch(handleLoader(false));
// //             dispatch({ type: "CONFIRM_PASSWORD_SUCCESS", payload: res });
// //             console.log("Response from frogot=>>>", res);
// //             // alert("Your Password has been updated");
// //             // dispatch(resetTo("SignIn",componentId))
// //             dispatch(AppActions.cognitoLogin(email, password, componentId));
// //             // dispatch(popToRoot(componentId));
// //           })
// //           .catch(e => {
// //             console.log(e);
// //             dispatch(handleLoader(false));
// //             dispatch({ type: "CONFIRM_PASSWORD_FAIL" });
// //             alert(e.message);
// //           });
// //       })
// //       .catch(() => alert(Constants.AppConstants.Error.internetConnectivity));
// //   };
// // };

// // export const changePassword = (oldPassword, nawPasswords, componentId) => {
// //   return dispatch => {
// //     RestClient.isConnected()
// //       .then(async () => {
// //         console.log("Get=>>>>");
// //         dispatch(handleLoader(true));
// //         dispatch({ type: "CHANGE_PASSWORD_REQUEST" });
// //         const currentUser = await Auth.currentUserPoolUser();
// //         console.log("current User", currentUser);
// //         await Auth.changePassword(currentUser, oldPassword, nawPasswords)
// //           .then(res => {
// //             dispatch(handleLoader(false));
// //             dispatch({ type: "CHANGE_PASSWORD_SUCCESS", payload: res });
// //             alert(res);
// //             console.log("Response from frogot=>>>", res);
// //           })
// //           .catch(e => {
// //             console.log(e);

// //             dispatch(handleLoader(false));
// //             dispatch({ type: "CHANGE_PASSWORD_FAIL" });
// //             alert(e.message);
// //           });
// //       })
// //       .catch(() => alert(Constants.AppConstants.Error.internetConnectivity));
// //   };
// // };

// // export const forgotPassword = (email, componentId) => {
// //   return dispatch => {
// //     RestClient.isConnected()
// //       .then(() => {
// //         dispatch(handleLoader(true));
// //         dispatch({ type: "FORGOT_PASSWORD_REQUEST" });

// //         Auth.forgotPassword(email)
// //           .then(res => {
// //             dispatch(handleLoader(false));
// //             dispatch({ type: "FORGOT_PASSWORD_SUCCESS", payload: res });
// //             console.log("Response from frogot=>>>", res);
// //             Navigation.push(componentId, {
// //               component: {
// //                 name: "EnterOtpScreen",
// //                 passProps: { email }
// //               }
// //             });
// //           })
// //           .catch(e => {
// //             console.log(e);
// //             // Navigation.push(componentId, {
// //             //   component: {
// //             //     name: "ConfirmPassword",
// //             //     passProps:{email}
// //             //   }
// //             // });
// //             dispatch(handleLoader(false));
// //             dispatch({ type: "FORGOT_PASSWORD_FAIL" });
// //             alert(e.message);
// //           });
// //       })
// //       .catch(() => alert(Constants.AppConstants.Error.internetConnectivity));
// //   };
// // };

export const registerUser = (user, componentId) => {
  return dispatch => {
        dispatch({ type: types.LOGIN });
        goHome();
  };
};
// export const getProfile = cb => {
//   return dispatch => {
//     RestClient.isConnected()
//       .then(async res => {
//         dispatch(handleLoader(true));
//         let currentUserData = await Auth.currentAuthenticatedUser({
//           bypassCache: true
//         });
//         dispatch(handleLoader(false));

//         if (cb) {
//           cb(currentUserData);
//         }
//       })
//       .catch(e => {});
//   };
// };

// export const editProfile = (user, cb) => {
//   return dispatch => {
//     RestClient.isConnected()
//       .then(async res => {
//         dispatch(handleLoader(true));
//         let userData = {},
//           data = { firstName: user.firstName },
//           method = "PUT";

//         userData.family_name = user.lastName;
//         userData.name = user.firstName;
//         if (user.phone) {
//           userData.phone_number = getCallingCode() + user.phone;
//         }
//         if (user.picture) {
//           userData.profile = user.picture;
//         }

//         let currentUserData = await Auth.currentAuthenticatedUser({
//           bypassCache: true
//         });

//         let result = await Auth.updateUserAttributes(currentUserData, userData);
//         let currentUserData2 = await Auth.currentAuthenticatedUser({
//           bypassCache: true
//         });

//         RestClient.restCall(
//           (Environment == "Staging"
//             ? "https://o9trlkysbe.execute-api.eu-west-1.amazonaws.com/userProfileDev/userProfile?username="
//             : "https://xke9gofcna.execute-api.us-east-1.amazonaws.com/userProfileProd/userProfile?username=") +
//             user.username +
//             "&methodType=EDIT_USER_PROFILE",
//           data,
//           "",
//           method
//         )
//           .then(res => {
//             if (res) {
//               dispatch(handleLoader(false));
//               if (cb) {
//                 cb(currentUserData);
//               }
//             }
//           })
//           .catch(e => {
//             dispatch(handleLoader(false));
//             console.warn(e); // eslint-disable-line
//           });

//         console.log("resultresultresultresult", currentUserData2);
//       })
//       .catch(e => {
//         console.log("here<==>erro", e);
//         dispatch(handleLoader(false));
//         alert(Constants.AppConstants.Error.internetConnectivity);
//       });
//   };
// };
// export const resendCode = (username, cb) => {
//   return (dispatch, getState) => {
//     console.log("here==>");
//     RestClient.isConnected()
//       .then(res => {
//         console.log("here<==>", res);
//         dispatch({ type: types.REGISTER_REQUEST });
//         // let {
//         //   userData: {
//         //     user: { username }
//         //   }
//         // } = getState().user;
//         dispatch(handleLoader(true));
//         Auth.resendSignUp(username)
//           .then(res => {
//             dispatch(handleLoader(false));
//             if (cb) {
//               cb(true);
//             }
//           })
//           .catch(e => {
//             dispatch(handleLoader(false));
//             console.log(e);
//             alert(e.message);
//           });
//       })
//       .catch(e => {
//         console.log("here<==>erro", e);

//         alert(Constants.AppConstants.Error.internetConnectivity);
//       });
//   };
// };

// export const signup = (userData, componentId) => {
//   return dispatch => {
//     dispatch(
//       AppActions.pushToParticularScreen(componentId, "Institution", {
//         userData
//       })
//     );
//   };
// };

// export const verifyUser = (varificationCode, password, usernameEmail) => {
//   return (dispatch, getState) => {
//     RestClient.isConnected()
//       .then(() => {
//         dispatch({ type: types.LOGIN_REQUEST });
//         // if(!usernameEmail){
//         //   let {
//         //     userData: {
//         //       user: { username }
//         //     }
//         //   } = getState().user;
//         //   usernameEmail = username;
//         // }

//         Auth.confirmSignUp(usernameEmail, varificationCode)
//           .then(res => {
//             if (res === "SUCCESS") {
//               dispatch(AppActions.cognitoLogin(usernameEmail, password));
//             }
//           })
//           .catch(e => {
//             dispatch({ type: types.LOGIN_REQUEST_FAIL });
//             alert(e.message);
//           });
//       })
//       .catch(error => {
//         alert(Constants.AppConstants.Error.internetConnectivity);
//       });
//   };
// };

// export const getInstitutions = () => {
//   return dispatch => {
//     dispatch({ type: types.GET_INSTITUTIONS });
//     RestClient.getCall(
//       Environment == "Staging"
//         ? "https://kq7ikzm0kf.execute-api.eu-west-1.amazonaws.com/dev/"
//         : "https://wiyljz1aib.execute-api.us-east-1.amazonaws.com/getInstitutionProd/getInstitutions"
//     )
//       .then(res => {
//         console.log("response fo getInstitutions", res);
//         dispatch({ type: types.INSTITUTIONS, payload: res });
//       })
//       .catch(e => {
//         dispatch({ type: types.INSTITUTIONS_FAIL, payload: e });
//         alert(e.message);
//       });
//   };
// };

// // export const forgotPassword = (data, componentId) => {
// //   return (dispatch, getState) => {
// //     dispatch({ type: types.FORGOTPASS_REQUEST });
// //     fetch(`${SERVER_URL}users/forgotPassword`, {
// //       method: "POST",
// //       headers: {
// //         Accept: "application/json",
// //         "Content-Type": "application/json"
// //       },
// //       body: JSON.stringify(data)
// //     })
// //       .then(response => {
// //         if (response.status === 200) {
// //           dispatch({ type: types.FORGOTPASS_SUCCESS });
// //           Navigation.push(componentId, {
// //             component: {
// //               name: "DetailsSent",
// //               options: {
// //                 statusBar: {
// //                   style: "light"
// //                 },
// //                 topBar: {
// //                   visible: false,
// //                   drawBehind: true
// //                 }
// //               }
// //             }
// //           });
// //         } else {
// //           dispatch({ type: types.FORGOTPASS_FAIL });
// //           Alert.alert(
// //             "Forgot password",
// //             "Sorry. We cannot find any account associated with this email."
// //           );
// //         }
// //       })
// //       .catch(err => {
// //         apiError();
// //         dispatch({ type: types.FORGOTPASS_FAIL });
// //       });
// //   };
// // };

export const logOut = () => {
  return dispatch => {
            goToAuth();
              dispatch({
                type: types.LOGOUT
              });
              dispatch({
                type: "RESET"
              });
       
       

  };
};

// export const uploadImage = (data, cb) => {
//   return (dispatch, getState) => {
//     let {
//       userData: { username }
//     } = getState().user;
//     let imgData = { user_avatar: data };
//     dispatch(handleLoader(true));
//     fetch(
//       Environment == "Staging"
//         ? `https://o9trlkysbe.execute-api.eu-west-1.amazonaws.com/userProfileDev/userProfile?username=${username}&methodType=IMAGE_UPLOAD`
//         : `https://xke9gofcna.execute-api.us-east-1.amazonaws.com/userProfileProd/userProfile?username=${username}&methodType=IMAGE_UPLOAD`,
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(imgData)
//       }
//     )
//       .then(resp => resp.text())
//       .then(response => {
//         response = JSON.parse(response);
//         console.log("Response from upload image api=?>>", response);
//         if (response.statusCode === 200) {
//           dispatch(handleLoader(false));
//           dispatch({ type: "UPLOAD_USER_IMAGE_SUCCESS" });
//           if (cb) {
//             cb(response.objectUrl);
//           }
//         } else {
//           dispatch(handleLoader(false));
//           dispatch({ type: "UPLOAD_USER_IMAGE_FAIL" });
//         }
//       })
//       .catch(err => {
//         // eslint-disable-next-line no-console
//         console.log(err);
//         // apiError();
//         dispatch(handleLoader(false));
//       });
//   };
// };

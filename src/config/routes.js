/*
 * @file: routes.js
 * @description: Contains all routes registered.
 * @date: 9.Oct.2018
 * @author: Suraj Sanwal
 * */
import React from "react";
import {Navigation} from "react-native-navigation";
import {View, Image} from "react-native";
import {Provider} from "react-redux";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import SideMenu from "../components/common/SideMenu";
//Screens
import AppIntro from "../container/introScreens";
import Loading from "../components/common/Loading";
import Loader from "../container/AppContainer";
import SignIn from "../container/auth/SignIn";
import SignUp from "../container/auth/SignUp";
import ForgotPassword from "../container/auth/ForgotPassword";
import ChangePassword from "../container/auth/ChangePassword";
import ConfirmPassword from "../container/auth/ConfirmPassword";
import EnterOtpScreen from "../container/auth/EnterOtpScreen";

import EditProfile from "../container/auth/EditProfile";

// import EmailVerification from "../container/auth/EmailVarification";

//Dashboard Imports

import Tab1 from "../container/dashboard/tabs/Tab1";
import Tab2 from "../container/dashboard/tabs/Tab2";
import Tab3 from "../container/dashboard/tabs/Tab3";
import Tab4 from "../container/dashboard/tabs/Tab4";
import Tab5 from "../container/dashboard/tabs/Tab5";

import Screen1 from "../container/dashboard/Screens/Screen1";

// import Profile from "../container/dashboard/Profile";

import WebView from "../container/dashboard/WebView";

import {tabSelect} from "../actions/app";

// import ToastNotification from "../components/common/ToastNotification";

import background from "../assets/iOS/App_Background.png";

/* eslint-disable */
/**
 * HOC for wrapping toast and loader
 */

const WrapScreen = (ReduxScreen, store, headerProps) => props => (
  <Provider store={store}>
    <View style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          position: "absolute",
          top: 0,
          height: "100%",
          width: "100%",
        }}>
        <Image source={background} style={{height: "100%", width: "100%"}} />
      </View>
      <View style={{flex: 1, zIndex: 99}}>
        {!headerProps.disableHeader ? (
          <Header
            title={headerProps.title}
            hideBack={headerProps.hideBack}
            hideDrawer={headerProps.hideDrawer}
            color={headerProps.color || "#fff"}
            rightIcon={headerProps.rightIcon}
            onRightPress={headerProps.onRightPress}
            rightText={headerProps.rightText}
            headerText={headerProps.headerText}
            onBackPress={() => Navigation.pop(props.componentId)}
            searchBox={headerProps.searchBox}
            onChangeSearchText={headerProps.onChangeSearchText}
            searchText={headerProps.searchText}
            searchPlaceHolder={headerProps.searchPlaceHolder}
            auth={headerProps.auth}
            onDrawerPress={() =>
              Navigation.mergeOptions(props.componentId, {
                sideMenu: {
                  right: {
                    visible: true,
                  },
                },
              })
            }
          />
        ) : null}

        <ReduxScreen {...props} />
        {/* <ToastNotification /> */}
        <Loading />
        {headerProps.enableTabs ? (
          <Footer
            backgroundColor={"#537591"}
            title={headerProps.title}
            hideBack={headerProps.hideBack}
            hideDrawer={headerProps.hideDrawer}
            color={headerProps.color || "#fff"}
            rightIcon={headerProps.rightIcon}
            onRightPress={headerProps.onRightPress}
            rightText={headerProps.rightText}
            headerText={headerProps.headerText}
            onBackPress={() => Navigation.pop(props.componentId)}
            searchBox={headerProps.searchBox}
            onChangeSearchText={headerProps.onChangeSearchText}
            searchText={headerProps.searchText}
            searchPlaceHolder={headerProps.searchPlaceHolder}
            auth={headerProps.auth}
            selected={headerProps.selected}
            componentId={props.componentId}
            onTabPress={switchToWhich => {
              store.dispatch(tabSelect(props.componentId, switchToWhich));

              // Navigation.mergeOptions(props.componentId, {
              //   bottomTabs: {
              //     currentTabIndex: switchToWhich
              //   }
              // })
            }}
          />
        ) : null}
      </View>
    </View>
  </Provider>
);

/* eslint-enable */

export const registerScreens = store => {
  Navigation.registerComponent(
    "AppIntro",
    () => WrapScreen(AppIntro, store, {disableHeader: true}),
    () => AppIntro,
  );
  // Loader Stack
  Navigation.registerComponent(
    "Loader",
    () => WrapScreen(Loader, store),
    () => Loader,
  );
  // Auth stack
  Navigation.registerComponent(
    "SignIn",
    () =>
      WrapScreen(SignIn, store, {
        disableHeader: false,
        auth: true,
        hideDrawer: true,
        hideBack: true,
        title: "Sign In",
      }),
    () => SignIn,
  );
  Navigation.registerComponent(
    "SignUp",
    () =>
      WrapScreen(SignUp, store, {
        disableHeader: false,
        auth: true,
        hideDrawer: true,
        hideBack: true,
        title: "Sign Up",
      }),
    () => SignUp,
  );
  Navigation.registerComponent(
    "ForgotPassword",
    () =>
      WrapScreen(ForgotPassword, store, {
        disableHeader: false,
        auth: true,
        hideDrawer: true,
        title: "Forgot Password",
      }),
    () => ForgotPassword,
  );
  Navigation.registerComponent(
    "EnterOtpScreen",
    () =>
      WrapScreen(EnterOtpScreen, store, {
        disableHeader: false,
        auth: true,
        hideDrawer: true,
        title: "Enter OtpScreen",
      }),
    () => EnterOtpScreen,
  );

  Navigation.registerComponent(
    "ChangePassword",
    () =>
      WrapScreen(ChangePassword, store, {
        disableHeader: false,
        auth: true,
        hideDrawer: true,
        title: "Change Password",
      }),
    () => ChangePassword,
  );
  Navigation.registerComponent(
    "ConfirmPassword",
    () =>
      WrapScreen(ConfirmPassword, store, {
        disableHeader: false,
        auth: true,
        hideDrawer: true,
        title: "Confirm Password",
      }),
    () => ConfirmPassword,
  );

  Navigation.registerComponent(
    "EditProfile",
    () =>
      WrapScreen(EditProfile, store, {
        disableHeader: false,
        auth: true,
        hideDrawer: true,
        title: "Edit Profile",
      }),
    () => EditProfile,
  );

  Navigation.registerComponentWithRedux(
    "SideMenu",
    () => SideMenu,
    Provider,
    store,
  );

  // Navigation.registerComponent(
  //   'EmailVerification',
  //   () =>
  //     WrapScreen(EmailVerification, store, {
  //       disableHeader: false,
  //       hideDrawer: true,
  //     }),
  //   () => EmailVerification,
  // );

  // Dashboard Stack
  Navigation.registerComponent(
    "Tab1",
    () =>
      WrapScreen(Tab1, store, {
        title: "Home",
        enableTabs: true,
        selected: 0,
      }),
    () => Tab1,
  );
  Navigation.registerComponent(
    "Tab2",
    () =>
      WrapScreen(Tab2, store, {
        title: "Posimations",
        enableTabs: true,
        selected: 1,
      }),
    () => Tab2,
  );
  Navigation.registerComponent(
    "Tab3",
    () =>
      WrapScreen(Tab3, store, {
        title: "Ajivar",
        enableTabs: true,
        selected: 2,
      }),
    () => Tab3,
  );
  Navigation.registerComponent(
    "Tab4",
    () =>
      WrapScreen(Tab4, store, {
        title: "Tab1",
        enableTabs: true,
        selected: 3,
      }),
    () => Tab4,
  );
  // Navigation.registerComponent(
  //   "Profile",
  //   () =>
  //     WrapScreen(Profile, store, {
  //       title: "Profile",
  //       hideDrawer: true,
  //       hideBack: false
  //     }),
  //   () => Profile
  // );

  Navigation.registerComponent(
    "Tab5",
    () =>
      WrapScreen(Tab5, store, {
        title: "Tab5",
        enableTabs: true,
        selected: 4,
      }),
    () => Tab5,
  );
  Navigation.registerComponent(
    "Screen1",
    () =>
      WrapScreen(Screen1, store, {
        title: "Screen1",
        hideDrawer: true,
        hideBack: false,
      }),
    () => Screen1,
  );

  Navigation.registerComponent(
    "WebView",
    () =>
      WrapScreen(WebView, store, {
        title: "WebView",
        hideDrawer: true,
        hideBack: false,
      }),
    () => WebView,
  );
};

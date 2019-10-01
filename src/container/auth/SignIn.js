/*
 * @file: SignIn.js
 * @description: Contains the SignIn Container.
 * @date: 9.Oct.2018
 * @author: Suraj Sanwal
 * */
import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Keyboard,
} from "react-native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import _ from "lodash";

import Constants from "../../constants";
import * as AppAction from "../../actions";
import FloatingInput from "../../components/common/FloatingInput";
import {moderateScale} from "../../helpers/ResponsiveFonts";
import AuthButton from "../../components/common/AuthButton";
import Icon from "../../components/common/Icon";
import Regex from "../../helpers/Regex";

class SignInCustom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      hidePassword: true,
      emailError: "",
      passwordError: "",
    };
    this.signUp = this.signUp.bind(this);
  }

  showPassword = () => {
    this.setState({
      hidePassword: !this.state.hidePassword,
    });
  };

  signIn = () => {
    Keyboard.dismiss();
    const {email, password} = this.state;
    if (_.isEmpty(email.trim())) {
      this.setState({
        emailError: "Email is required",
      });
      return;
    }

    if (!Regex.validateEmail(email.trim())) {
      this.setState({
        emailError: "Invalid Email format",
      });
      return;
    }

    if (_.isEmpty(password.trim())) {
      this.setState({
        passwordError: "Password is required",
      });
      return;
    }
    let emailValue = email.toLowerCase();
    this.props.AppAction.loginUser(
      emailValue,
      password,
      this.props.componentId,
    );
  };
  signUp() {
    this.props.AppAction.pushToParticularScreen(
      this.props.componentId,
      "SignUp",
    );
  }

  forgotPassword = () => {
    this.props.AppAction.pushToParticularScreen(
      this.props.componentId,
      "ForgotPassword",
    );
  };
  focusNext(next) {
    this[next].focus();
  }

  render() {
    let {
      loader: {loginLoader},
    } = this.props;
    let {hidePassword, email, password, emailError, passwordError} = this.state;
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView
          style={styles.scrollStyle}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={"handled"}
          contentContainerStyle={
            Dimensions.get("window").height > 800
              ? {flex: 1, marginTop: moderateScale(40)}
              : {}
          }>
          <View style={styles.signInView}>
            <Text style={styles.signInText}>Welcome</Text>
          </View>
          <View style={styles.paddingInputText}>
            <View style={styles.signInSubContainerView}>
              <Text style={styles.signInInSubContainerText}>
                {Constants.Strings.signIn.subHeading}
              </Text>
            </View>
            <FloatingInput
              ref={ref => (this.email = ref)}
              inputWrapper={styles.inputWrapper}
              label={"UserName"}
              value={email}
              onChangeText={email => {
                this.setState({email, emailError: ""});
              }}
              onSubmitEditing={() => {
                this.focusNext("password");
              }}
              autoCapitalize={"none"}
              keyboardType={"email-address"}
              returnKey={"next"}
              error={emailError}
            />
            <FloatingInput
              ref={ref => (this.password = ref)}
              inputWrapper={styles.inputWrapper}
              label={"Password"}
              value={password}
              onChangeText={password => {
                this.setState({password, passwordError: ""});
              }}
              icon={
                <Icon name={!hidePassword ? "eye" : "eye-slash"} size={20} />
              }
              secureTextEntry={hidePassword}
              onIconPress={this.showPassword}
              returnKey={"done"}
              error={passwordError}
              onSubmitEditing={() => {
                this.signIn();
              }}
            />
            <View style={styles.forgotView}>
              <TouchableOpacity
                style={styles.forgotButton}
                onPress={() => {
                  this.forgotPassword();
                }}>
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.stylesAuthContainer}>
            <AuthButton
              buttonName={!loginLoader ? "Sign In" : "Signing In..."}
              disabled={loginLoader}
              textStyle={styles.textStyle}
              buttonStyle={styles.signUpButtonStyle}
              gradientStyle={styles.gradientStyle}
              onPress={() => this.signIn()}
            />
          </View>
          <View style={styles.signUpView}>
            <TouchableOpacity
              style={styles.signUpButton}
              onPress={() => this.signUp()}>
              <Text style={styles.signUpText}>
                {Constants.Strings.signUp.signUpButton}
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  app: state.app,
  loader: state.loader,
});
const mapDispatchToProps = dispatch => ({
  AppAction: bindActionCreators(AppAction, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignInCustom);

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Constants.Colors.AuthYellow},
  scrollStyle: {
    flex: 1,
  },
  signUpButtonStyle: {
    backgroundColor: "red",
    width: moderateScale(140),
    height: moderateScale(40),
  },

  gradientStyle: {
    borderRadius: moderateScale(20),
  },
  textStyle: {
    textAlign: "center",
    fontFamily: "Charter",
    fontWeight: "bold",
    fontSize: moderateScale(18),
  },
  paddingInputText: {
    paddingHorizontal: moderateScale(20),
  },
  stylesAuthContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: moderateScale(35),
  },

  forgotView: {justifyContent: "flex-start", alignItems: "flex-start"},
  signUpView: {
    backgroundColor: "white",
    width: Constants.BaseStyle.DEVICE_WIDTH - moderateScale(2),
    borderColor: Constants.Colors.Gray,
    borderWidth: moderateScale(1),
    paddingVertical: moderateScale(5),
    marginVertical: moderateScale(35),
    marginHorizontal: moderateScale(1),
  },
  inputWrapper: {
    borderBottomWidth: moderateScale(1),
    borderBottomColor: Constants.Colors.Gray,
    color: Constants.Colors.SignInBlack,
    // fontFamily: "Charter",
    height: moderateScale(48),
  },
  signUpButton: {
    // margin: moderateScale(0),
    // padding: moderateScale(20)
  },

  signUpText: {
    fontSize: moderateScale(21),
    color: "gray",
    textAlign: "center",
  },

  forgotButton: {
    paddingTop: moderateScale(5),
    paddingBottom: moderateScale(20),
  },
  signInView: {
    justifyContent: "center",
    alignItems: "center",
    padding: moderateScale(48),
  },

  signInText: {
    fontSize: moderateScale(30),
    color: Constants.Colors.Black,
    // fontFamily: Platform.OS == "ios" ? "Cochin-Bold" : "CochinBold"
    // fontWeight: Platform.OS == "ios" ? "bold" : "normal",
    // fontFamily: "Cochin-Bold"
  },
  signInInSubContainerText: {
    color: "gray",
    fontFamily: "Charter",
    textAlign: "center",
    fontSize: moderateScale(20),
  },

  signInSubContainerView: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingBottom: moderateScale(15),
  },
  forgotText: {
    color: Constants.Colors.Gray,
    fontFamily: "Charter",
    fontSize: moderateScale(18),
  },
});

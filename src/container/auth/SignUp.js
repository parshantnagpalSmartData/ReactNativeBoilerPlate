/*
 * @file: SignIn.js
 * @description: Contains the SignIn Container.
 * @date: 9.Oct.2018
 * @author: Suraj Sanwal
 * */
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Platform,
  Dimensions,
  ScrollView
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import _ from "lodash";

import Constants from "../../constants";
import * as AppAction from "../../actions";
import FloatingInput from "../../components/common/FloatingInput";

import { moderateScale } from "../../helpers/ResponsiveFonts";
import AuthButton from "../../components/common/AuthButton";
import Icon from "../../components/common/Icon";
import Regex from "../../helpers/Regex";
//const { height, width } = Dimensions.get("window");
const WINDOW_WIDTH = Dimensions.get("window").width;
const WINDOW_HEIGHT = Dimensions.get("window").height;
class SignUpCustom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      hidePassword: true,
      emailError: "",
      passwordError: "",
      firstNameError: "",
      lastNameError: "",
      phoneError: "",
      termsModal: false
    };
  }

  showPassword = () => {
    this.setState({
      hidePassword: !this.state.hidePassword
    });
  };

  SignUp = () => {
    const { firstName, lastName, phone, email, password } = this.state;
    if (_.isEmpty(firstName.trim())) {
      this.setState({
        firstNameError: "First name is required"
      });
      return;
    }
    if (_.isEmpty(lastName.trim())) {
      this.setState({
        lastNameError: "Last name is required"
      });
      return;
    }
    // if (_.isEmpty(phone.trim())) {
    //   this.setState({
    //     phoneError: "Phone number is required"
    //   });
    //   return;
    // }
    // if (!Regex.validateMobile(phone && phone.trim())) {
    //   this.setState({
    //     phoneError: "Invalid Phone number "
    //   });
    //   return;
    // }
    // if (phone.length !== 10) {
    //   this.setState({
    //     phoneError: "Please enter 10 digit number"
    //   });
    //   return;
    // }

    if (_.isEmpty(email.trim())) {
      this.setState({
        emailError: "Email is required"
      });
      return;
    }

    if (!Regex.validateEmail(email.trim())) {
      this.setState({
        emailError: "Invalid Email format"
      });
      return;
    }

    if (_.isEmpty(password.trim())) {
      this.setState({
        passwordError: "Password is required"
      });
      return;
    }
    let emailValue = email.toLowerCase();

    this.props.AppAction.registerUser(
      {
        firstName,
        lastName,
        phone,
        email: emailValue,
        password
      },
      this.props.componentId
    );
  };

  focusNext(next) {
    this[next].focus();
  }

  render() {
    let {
      hidePassword,
      firstName,
      lastName,
      phone,
      email,
      password,
      emailError,
      passwordError,
      phoneError,
      firstNameError,
      lastNameError
    } = this.state;
    let {
      loader: { signupLoader }
    } = this.props;
    return (
      <View style={styles.container}>
        <Modal
          style={{
            backgroundColor: "green"
          }}
          animationType="slide"
          transparent={true}
          visible={this.state.termsModal}
        >
          <View
            style={{
              backgroundColor: Constants.Colors.AuthYellow,
              flex: 1,
              justifyContent: "center",

              alignItems: "center"
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                width: WINDOW_WIDTH / 1.1,
                height: WINDOW_HEIGHT / 1.5,
                justifyContent: "center",
                alignItems: "center",
                padding: 20,
                borderRadius: 20
              }}
            >
              <ScrollView>
                <View>
                  <Text>privacy and policy</Text>
                </View>
              </ScrollView>
              <TouchableOpacity
                onPress={() => this.setState({ termsModal: false })}
              >
                <View
                  style={{
                    margin: 10,
                    backgroundColor: Constants.Colors.NavyBlue,
                    width: WINDOW_WIDTH / 2.5,
                    padding: 15,
                    alignItems: "center",
                    borderRadius: 20
                  }}
                >
                  <Text style={{ color: "white" }}>Close</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps={"handled"}
          style={styles.scrollStyle}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            Dimensions.get("window").height > 800
              ? { flex: 1, marginTop: moderateScale(40) }
              : {}
          }
        >
          <View style={styles.signInView}>
            <Text style={styles.signInText}>Sign up now</Text>
          </View>
          <View style={styles.paddingInputText}>
            <View style={styles.nameContainer}>
              <FloatingInput
                container={[styles.nameField, styles.marginRightName]}
                inputWrapper={styles.inputWrapper}
                ref={ref => (this.firstName = ref)}
                label={"First Name"}
                value={firstName}
                onChangeText={firstName => {
                  this.setState({ firstName, firstNameError: "" });
                }}
                onSubmitEditing={() => {
                  this.focusNext("lastName");
                }}
                returnKey={"next"}
                error={firstNameError}
              />
              <FloatingInput
                container={[styles.nameField, styles.marginLeftName]}
                inputWrapper={styles.inputWrapper}
                ref={ref => (this.lastName = ref)}
                label={"Last Name"}
                value={lastName}
                onChangeText={lastName => {
                  this.setState({ lastName, lastNameError: "" });
                }}
                onSubmitEditing={() => {
                  this.focusNext("phone");
                }}
                returnKey={"next"}
                error={lastNameError}
              />
            </View>
            <FloatingInput
              ref={ref => (this.phone = ref)}
              inputWrapper={styles.inputWrapper}
              label={"Phone Number"}
              value={phone}
              onChangeText={phone => {
                this.setState({ phone, phoneError: "" });
              }}
              onSubmitEditing={() => {
                this.focusNext("email");
              }}
              returnKey={"next"}
              error={phoneError}
              keyboardType={"phone-pad"}
            />
            <FloatingInput
              ref={ref => (this.email = ref)}
              inputWrapper={styles.inputWrapper}
              label={"E-mail"}
              autoCapitalize={"none"}
              value={email}
              onChangeText={email => {
                this.setState({ email, emailError: "" });
              }}
              onSubmitEditing={() => {
                this.focusNext("password");
              }}
              keyboardType={"email-address"}
              returnKey={"next"}
              error={emailError}
            />
            <FloatingInput
              ref={ref => (this.password = ref)}
              inputWrapper={styles.inputWrapper}
              label={"Password"}
              autoCapitalize={"none"}
              value={password}
              onChangeText={password => {
                this.setState({ password, passwordError: "" });
              }}
              icon={
                <Icon name={!hidePassword ? "eye" : "eye-slash"} size={20} />
              }
              secureTextEntry={hidePassword}
              onIconPress={this.showPassword}
              returnKey={"done"}
              onSubmitEditing={() => {
                this.SignUp();
              }}
              error={passwordError}
            />
          </View>
          <View style={{ padding: moderateScale(10) }} />

          <View style={styles.forgotView}>
            <Text style={styles.forgotTextBlack}>
              {"By signing up you agree to"}{" "}
              {/* <Text style={styles.forgotText}>Ajivar</Text> {"'s"} */}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => this.setState({ termsModal: true })}
              >
                <Text style={styles.forgotText}>Terms of Service</Text>
              </TouchableOpacity>
              <Text style={styles.forgotTextBlack}>and</Text>
              <Text style={styles.forgotText}>Privacy Policy</Text>
            </View>
          </View>
          <View style={styles.stylesAuthContainer}>
            <AuthButton
              buttonName={!signupLoader ? "Sign Up" : "Signing Up..."}
              disabled={signupLoader}
              buttonStyle={styles.signUpButtonStyle}
              textStyle={styles.textStyle}
              paddingTop={true}
              gradientStyle={styles.gradientStyle}
              onPress={this.SignUp}
            />
          </View>
          <View style={styles.signUpView}>
            <TouchableOpacity
              style={styles.signUpButton}
              onPress={() =>
                this.props.AppAction.pushToParticularScreen(
                  this.props.componentId,
                  "SignIn"
                )
              }
            >
              <Text style={styles.signUpText}>
                Already have an account - Sign in here
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
  loader: state.loader
});
const mapDispatchToProps = dispatch => ({
  AppAction: bindActionCreators(AppAction, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpCustom);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Constants.Colors.AuthYellow },
  scrollStyle: {
    flex: 1
  },
  signUpButtonStyle: {
    backgroundColor : 'red',
    width: moderateScale(140),
    height: moderateScale(40)
  },

  gradientStyle: {
    borderRadius: moderateScale(20)
  },
  textStyle: {
    textAlign: "center",
    fontFamily: "Charter",
    fontWeight: "bold",
    fontSize: moderateScale(18)
  },
  paddingInputText: {
    paddingHorizontal: moderateScale(20)
  },
  forgotView: {
    justifyContent: "center",
    alignItems: "center",

    marginTop: moderateScale(10),
    marginHorizontal: moderateScale(20)
  },
  inputWrapper: {
    borderBottomWidth: moderateScale(1),
    borderBottomColor: Constants.Colors.Gray,
    fontFamily: "Charter",
    fontWeight: "normal",
    height: moderateScale(45)
  },
  stylesAuthContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: moderateScale(10)
  },
  nameField: {
    width: Constants.BaseStyle.DEVICE_WIDTH * 0.43
  },

  marginRightName: { marginRight: Constants.BaseStyle.DEVICE_WIDTH * 0.02 },

  marginLeftName: { marginLeft: Constants.BaseStyle.DEVICE_WIDTH * 0.02 },

  nameContainer: {
    flexDirection: "row"
  },
  signUpView: {
    backgroundColor: "white",
    width: Constants.BaseStyle.DEVICE_WIDTH - moderateScale(2),
    borderColor: Constants.Colors.Gray,
    borderWidth: moderateScale(1),
    paddingVertical: moderateScale(4),
    marginTop: moderateScale(25),
    marginHorizontal: moderateScale(1)
  },

  signUpButton: {
    // margin: moderateScale(5),
    // padding: moderateScale(20)
  },

  signUpText: {
    fontSize: Constants.BaseStyle.isIphoneX
      ? moderateScale(21)
      : moderateScale(19),
    color: "gray",
    // fontFamily: "Charter",
    textAlign: "center"
  },

  forgotButton: {
    paddingTop: moderateScale(5),
    paddingBottom: moderateScale(20)
  },

  signInText: {
    fontSize: moderateScale(28),
    color: Constants.Colors.Black,
    // fontWeight: Platform.OS == "ios" ? "bold" : "bold",
    // fontFamily: "Cochin",
    // fontFamily: Platform.OS == "ios" ? "Cochin-Bold" : "CochinBold"
    //PT Serif
  },
  signInView: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: moderateScale(20)
  },
  forgotText: {
    color: Constants.Colors.Black,
    fontSize: Constants.BaseStyle.isIphoneX
      ? moderateScale(17)
      : moderateScale(15),
    // fontFamily: "Charter",

    fontWeight: "bold"
  },
  forgotTextBlack: {
    fontSize: Constants.BaseStyle.isIphoneX
      ? moderateScale(17)
      : moderateScale(15),
    paddingHorizontal: Constants.BaseStyle.isIphoneX
      ? moderateScale(5)
      : moderateScale(2),
    // fontFamily: "Charter"
    // fontWeight: "normal"
  }
});

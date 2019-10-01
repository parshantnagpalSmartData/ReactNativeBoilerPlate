/*
 * @file: SignIn.js
 * @description: Contains the SignIn Container.
 * @date: 9.Oct.2018
 * @author: Suraj Sanwal
 * */
import React, {Component} from "react";
import {connect} from "react-redux";
// import { bindActionCreators } from "redux";
import {View, Text, StyleSheet, Platform} from "react-native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import Icon from "../../components/common/Icon";
import Constants from "../../constants";
import * as AppAction from "../../actions";
import FloatingInput from "../../components/common/FloatingInput";

import {moderateScale} from "../../helpers/ResponsiveFonts";
import AuthButton from "../../components/common/AuthButton";

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   email: this.props.email?this.props.email:"",
      //   emailError: "",
      oldPassword: "",
      password: "",
      confirmPassword: "",
      hideOldPassword: true,
      hideNewPassword: true,
      hideConfirmPassword: true,
    };
  }

  componentDidMount = () => {
    //   console.log("Email from forgot password,",this.props.email);
  };

  showPassword = index => {
    switch (index) {
      case 0:
        this.setState({
          hideOldPassword: !this.state.hideOldPassword,
        });
        break;
      case 1:
        this.setState({
          hideNewPassword: !this.state.hideNewPassword,
        });
        break;
      case 2:
        this.setState({
          hideConfirmPassword: !this.state.hideConfirmPassword,
        });
        break;
    }
  };

  changePassword = () => {
    const {confirmPassword, password, oldPassword} = this.state;

    if (!confirmPassword && !password && !oldPassword) {
      return;
      // alert("Password not matched.");
    }
    if (confirmPassword != password) {
      alert("Password not matched.");
      return;
    }
    // alert("Under Development");
    this.props.changePassword(oldPassword, password);
  };

  focusNext(next) {
    this[next].focus();
  }
  backPress = () => {
    this.props.AppAction.pop(this.props.componentId);
  };
  render() {
    let {
      confirmPassword,
      password,
      oldPassword,
      hideOldPassword,
      hideNewPassword,
      hideConfirmPassword,
    } = this.state;
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps={"handled"}
          style={styles.scrollStyle}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flex: 1}}>
          <View style={styles.signInView}>
            <Text style={styles.signInText}>Change Password</Text>
          </View>
          <View style={styles.forgotView}>
            <Text style={styles.forgotTextBlack}>
              Please enter your old password and new password.
            </Text>
          </View>
          <View style={{flex: 1}}>
            <FloatingInput
              ref={ref => (this.email = ref)}
              inputWrapper={styles.inputWrapper}
              label={"Old password"}
              value={oldPassword}
              onChangeText={oldPassword => {
                this.setState({oldPassword});
              }}
              icon={
                <Icon name={!hideOldPassword ? "eye" : "eye-slash"} size={20} />
              }
              keyboardType={"default"}
              secureTextEntry={hideOldPassword}
              onIconPress={() => this.showPassword(0)}
              returnKey={"next"}
            />
            <FloatingInput
              ref={ref => (this.email = ref)}
              inputWrapper={styles.inputWrapper}
              label={"New Password"}
              value={password}
              onChangeText={password => {
                this.setState({password});
              }}
              icon={
                <Icon name={!hideNewPassword ? "eye" : "eye-slash"} size={20} />
              }
              keyboardType={"default"}
              secureTextEntry={hideNewPassword}
              onIconPress={() => this.showPassword(1)}
              returnKey={"next"}
            />
            <FloatingInput
              ref={ref => (this.email = ref)}
              inputWrapper={styles.inputWrapper}
              label={"Confirm Password"}
              value={confirmPassword}
              onChangeText={confirmPassword => {
                this.setState({confirmPassword});
              }}
              icon={
                <Icon
                  name={!hideConfirmPassword ? "eye" : "eye-slash"}
                  size={20}
                />
              }
              keyboardType={"default"}
              secureTextEntry={hideConfirmPassword}
              onIconPress={() => this.showPassword(2)}
              returnKey={"next"}
            />
            <AuthButton
              buttonName={"Reset Password"}
              textStyle={styles.textStyle}
              buttonStyle={styles.signUpButtonStyle}
              gradientStyle={styles.gradientStyle}
              onPress={this.changePassword}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  app: state.app,
});
const mapDispatchToProps = dispatch => {
  return {
    changePassword: (old, newPass) =>
      dispatch(AppAction.changePassword(old, newPass)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChangePassword);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(15),
    backgroundColor: Constants.Colors.AuthYellow,
  },
  scrollStyle: {
    flex: 1,
  },
  signUpButtonStyle: {
    width: moderateScale(160),
    alignSelf: "center",
    marginTop: moderateScale(30),
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
    fontFamily: "Charter",
    height: moderateScale(48),
  },
  signUpButton: {
    // margin: moderateScale(0),
    // padding: moderateScale(20)
  },

  signUpText: {
    fontSize: moderateScale(21),
    color: "gray",
    fontFamily: "Cochin",
    textAlign: "center",
  },

  forgotButton: {
    paddingTop: moderateScale(5),
    paddingBottom: moderateScale(20),
  },
  signInView: {
    justifyContent: "center",
    alignItems: "center",
    padding: moderateScale(30),
  },

  signInText: {
    fontSize: moderateScale(30),
    color: Constants.Colors.Black,
    fontWeight: Platform.OS == "ios" ? "bold" : "normal",
    fontFamily: "Cochin-Bold",
  },
  signInInSubContainerText: {
    color: "gray",
    fontFamily: "Charter",
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
    fontSize: moderateScale(20),
    textAlign: "center",
  },
  forgotTextBlack: {
    fontSize: moderateScale(18),
    paddingHorizontal: moderateScale(5),
    fontFamily: "Charter",
    textAlign: "center",
  },
});

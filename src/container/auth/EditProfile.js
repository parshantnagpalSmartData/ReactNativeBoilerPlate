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
  Image,
  Alert,
  TextInput,
  TouchableOpacity,
  Platform
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import _ from "lodash";

import ImagePicker from "react-native-image-picker";

import Constants from "../../constants";
import * as AppAction from "../../actions";

import { moderateScale } from "../../helpers/ResponsiveFonts";
import AuthButton from "../../components/common/AuthButton";
// import Icon from "../../components/common/Icon";

class EditProfile extends Component {
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
      imageMain: "",
      imgUrl: null,
      profileShow: false
    };
    this.setProfile = this.setProfile.bind(this);
    this.editProfile = this.editProfile.bind(this);
  }
  componentDidMount() {
    let context = this;
    this.props.AppAction.getProfile(res => {
      context.setProfile(res, null);
    });
  }

  selectPhotoTapped = () => {
    let context = this;
    const options = {
      quality: 0.3,
      maxWidth: 800,
      maxHeight: 800,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, response => {
      // eslint-disable-next-line no-empty
      if (response.didCancel) {
      } else if (response.error) {
        // eslint-disable-next-line no-empty
      } else if (response.customButton) {
      } else {
        context.setState(
          {
            imageMain: "data:" + response.type + ";base64," + response.data,
            imgUrl: response.uri
          },
          () => {
            context.props.AppAction.uploadImage(
              context.state.imageMain,
              res => {
                context.setState({ imgUrl: res });
              }
            );
          }
        );
      }
    });
  };

  setProfile(res, cb) {
    let context = this,
      {
        attributes: { family_name, name, phone_number, profile, email }
      } = res,
      phoneNumber = phone_number ? phone_number.slice(-10) : "";

    context.setState(
      {
        email,
        firstName: name,
        lastName: family_name,
        phone: phoneNumber,
        imgUrl: profile,
        profileShow: true
      },
      () => {
        if (cb) {
          cb();
        }
      }
    );
  }

  showPassword = () => {
    this.setState({
      hidePassword: !this.state.hidePassword
    });
  };

  editProfile() {
    let { firstName, lastName, phone, imgUrl } = this.state,
      {
        user: {
          userData: { username }
        }
      } = this.props;
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

    this.props.AppAction.editProfile(
      {
        firstName,
        lastName,
        phone,
        picture: imgUrl,
        username
      },
      () => {
        // context.setProfile(res, () => {
        Alert.alert(
          "Update Profile",
          "Profile Updated Successfully",
          [
            {
              text: "OK",
              onPress: () => {
                this.props.AppAction.pop(this.props.componentId);
              }
            }
          ],
          { cancelable: false }
        );
        // });
      }
    );
  }

  focusNext(next) {
    this[next].focus();
  }

  renderProfileImage() {
    let { profileShow } = this.state;
    return (
      <TouchableOpacity
        // onPress={() => this.actionSheet.show()}
        onPress={() => this.selectPhotoTapped()}
        style={styles.image_container}
      >
        {profileShow && (
          <Image
            source={
              this.state.imgUrl
                ? {
                    uri: this.state.imgUrl
                  }
                : require("../../assets/images/ajivarLogo/tabcenter.png")
            }
            style={{
              width: moderateScale(70),
              height: moderateScale(70),
              borderRadius: moderateScale(70) / 2,
              alignContent: "center"
            }}
          />
        )}
      </TouchableOpacity>
    );
  }

  backPress = () => {
    this.props.AppAction.pop(this.props.componentId);
  };

  render() {
    let {
      firstName,
      lastName,
      phone,
      email,
      phoneError,
      firstNameError,
      lastNameError
    } = this.state;
    let {
      loader: { signupLoader }
    } = this.props;
    return (
      <View style={[styles.container]}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps={"handled"}
          style={styles.scrollStyle}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.signInView}>
            <Text style={styles.signInText}>Edit Profile</Text>
          </View>

          {this.renderProfileImage()}
          <View style={styles.paddingInputText}>
            {/* <View style={styles.nameContainer}>
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
                this.editProfile();
              }}
              returnKey={"next"}
              error={phoneError}
            /> */}
            <View style={{ paddingVertical: moderateScale(8) }}>
              <Text style={styles.textInputHeader}>Email</Text>
              <TextInput
                value={email}
                editable={false}
                style={styles.textInputRoundStyle}
              />
            </View>
            <View style={{ paddingVertical: moderateScale(8) }}>
              <Text style={styles.textInputHeader}>First Name</Text>
              <TextInput
                ref={ref => (this.firstName = ref)}
                value={firstName}
                onChangeText={firstName => {
                  this.setState({ firstName, firstNameError: "" });
                }}
                onSubmitEditing={() => {
                  this.focusNext("lastName");
                }}
                returnKey={"next"}
                error={firstNameError}
                style={styles.textInputRoundStyle}
              />
            </View>

            <View style={{ paddingVertical: moderateScale(8) }}>
              <Text style={styles.textInputHeader}>Last Name</Text>
              <TextInput
                ref={ref => (this.lastName = ref)}
                value={lastName}
                onChangeText={lastName => {
                  this.setState({ lastName, lastNameError: "" });
                }}
                onSubmitEditing={() => {
                  this.focusNext("phone");
                }}
                returnKey={"next"}
                error={lastNameError}
                style={styles.textInputRoundStyle}
              />
            </View>

            <View style={{ paddingVertical: moderateScale(8) }}>
              <Text style={styles.textInputHeader}>Phone Number</Text>
              <TextInput
                ref={ref => (this.phone = ref)}
                value={phone}
                onChangeText={phone => {
                  this.setState({ phone, phoneError: "" });
                }}
                onSubmitEditing={() => {
                  this.editProfile();
                }}
                returnKey={"next"}
                error={phoneError}
                style={styles.textInputRoundStyle}
              />
            </View>
          </View>
          <View style={{ padding: moderateScale(10) }} />
          <View style={styles.stylesAuthContainer}>
            <AuthButton
              // buttonName={!signupLoader ? "Sign Up" : "Signing Up..."}
              buttonName={"Update Profile"}
              disabled={signupLoader}
              buttonStyle={styles.signUpButtonStyle}
              textStyle={styles.textStyle}
              paddingTop={true}
              gradientStyle={styles.gradientStyle}
              onPress={() => this.editProfile()}
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
  loader: state.loader
});
const mapDispatchToProps = dispatch => ({
  AppAction: bindActionCreators(AppAction, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfile);
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Constants.Colors.AuthYellow },
  scrollStyle: {
    flex: 1
  },
  image_container: {
    height: moderateScale(70),
    width: moderateScale(70),
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center"
  },
  signUpButtonStyle: {
    width: moderateScale(160),
    height: moderateScale(40),
    marginTop: moderateScale(10),
    alignSelf: "center"
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
    marginTop: moderateScale(15),
    padding: moderateScale(15)
  },
  inputWrapper: {
    borderBottomWidth: moderateScale(1),
    borderBottomColor: Constants.Colors.Gray,
    fontFamily: "Charter",
    fontWeight: "normal",
    height: moderateScale(50)
  },
  stylesAuthContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: moderateScale(15)
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
    marginTop: moderateScale(35),
    marginHorizontal: moderateScale(1)
  },

  signUpButton: {
    // margin: moderateScale(5),
    // padding: moderateScale(20)
  },

  signUpText: {
    fontSize: moderateScale(21),
    color: "gray",
    fontFamily: "Cochin",
    textAlign: "center"
  },

  forgotButton: {
    paddingTop: moderateScale(5),
    paddingBottom: moderateScale(20)
  },

  signInText: {
    fontSize: moderateScale(30),
    color: Constants.Colors.Black,
    fontWeight: Platform.OS == "ios" ? "bold" : "normal",
    fontFamily: "Cochin-Bold"
  },
  signInView: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: moderateScale(25)
  },
  forgotText: {
    color: Constants.Colors.Black,
    fontSize: moderateScale(20),
    fontFamily: "Helvetica",
    fontWeight: "bold"
  },
  forgotTextBlack: {
    fontSize: moderateScale(19),
    paddingHorizontal: moderateScale(5),
    fontFamily: "Helvetica",
    fontWeight: "normal"
  },
  textInputHeader: {
    fontSize: moderateScale(14),
    color: "#1D2226",
    fontFamily: "Cochin",
    padding: moderateScale(5)
  },
  textInputRoundStyle: {
    height: moderateScale(40),
    borderWidth: 1,
    borderRadius: moderateScale(15),
    paddingHorizontal: moderateScale(8),
    borderColor: Constants.Colors.buttonColor,
    fontSize: moderateScale(16),
    color: "#1D2226",
    fontFamily: "Cochin-Bold",
    backgroundColor: "#FFFFFF"
  }
});

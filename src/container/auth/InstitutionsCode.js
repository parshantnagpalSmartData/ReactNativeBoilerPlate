import React, { Component } from "react";
import { View, Text, StyleSheet, Platform, Keyboard } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _ from "lodash";
import * as AppAction from "../../actions";
import { moderateScale } from "../../helpers/ResponsiveFonts";
import AuthButton from "../../components/common/AuthButton";
import Constants from "../../constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FloatingInput from "../../components/common/FloatingInput";
class InstitutionsCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
      codeError: ""
    };
  }

  componentDidMount() {}
  backPress = () => {
    this.props.AppAction.pop(this.props.componentId);
  };
  register = () => {
    Keyboard.dismiss();
    let { userData } = { ...this.props };
    let { AppAction, componentId } = this.props;
    let { code } = this.state;
    if (_.isEmpty(code.trim())) {
      this.setState({
        codeError: "Please enter code"
      });
      return;
    }

    userData.InstitutionsCode = code;
    AppAction.cognitoRegister(userData, componentId);
  };

  render() {
    let { code, codeError } = this.state;
    let {
      userData: { institutions },
      loader: { signupLoader }
    } = this.props;
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView
          extraHeight={Platform.OS === "ios" ? 280 : 200}
          enableOnAndroid={true}
          scrollEnabled={false}
          enableAutomaticScroll={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={"handled"}
        >
          <View>
            <View style={styles.welcomeView}>
              <Text style={styles.welcomeText} numberOfLines={1}>
                {Constants.Strings.Institution.InstitutionCode}
              </Text>
            </View>

            <View style={styles.centerView}>
              <Text style={styles.centerText} numberOfLines={2}>
                Please enter the code given by
              </Text>
              <Text style={styles.centerText} numberOfLines={2}>
                {institutions.institutionName}
              </Text>
            </View>
          </View>
          <View style={styles.marginHorizontal}>
            <FloatingInput
              label={"Confirmation Code"}
              inputWrapper={styles.inputWrapper}
              value={code}
              onChangeText={code => this.setState({ code, codeError: "" })}
              onSubmitEditing={() => {
                this.register();
              }}
              returnKey={"done"}
              error={codeError}
            />
          </View>
          <View style={styles.stylesAuthContainer}>
            <AuthButton
              buttonName={!signupLoader ? "Confirm" : "Confirming..."}
              disabled={signupLoader}
              textStyle={styles.textStyle}
              buttonStyle={styles.signUpButtonStyle}
              gradientStyle={styles.gradientStyle}
              onPress={() => this.register()}
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
)(InstitutionsCode);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: moderateScale(20),
    backgroundColor: Constants.Colors.AuthYellow
    // justifyContent: "space-between"
  },

  welcomeView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: moderateScale(25),
    marginHorizontal: moderateScale(13)
  },
  welcomeText: {
    fontSize: moderateScale(30),
    color: Constants.Colors.Black,
    // fontWeight: Platform.OS == "ios" ? "bold" : "normal",
    fontFamily: Platform.OS == "ios" ? "Cochin-Bold" : "CochinBold"

    // fontFamily: "Cochin-Bold"
  },
  centerView: {
    justifyContent: "center",
    marginTop: moderateScale(30),
    alignItems: "center"
  },
  inputWrapper: {
    borderWidth: 1,
    borderColor: Constants.Colors.Gray,
    margin: moderateScale(13),
    height: moderateScale(50),
    backgroundColor: Constants.Colors.White,
    paddingLeft: moderateScale(10)
  },
  centerText: {
    fontSize: moderateScale(16),
    textAlign: "center",
    paddingHorizontal: moderateScale(30)
  },
  marginHorizontal: {
    paddingHorizontal: moderateScale(20)
  },
  signUpButtonStyle: {
    width: moderateScale(200),
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
  bottomText: {
    fontSize: moderateScale(18),
    paddingVertical: moderateScale(5),
    textAlign: "center"
  },

  stylesAuthContainer: {
    marginTop: moderateScale(10),
    justifyContent: "center",
    alignItems: "center"
  }
});

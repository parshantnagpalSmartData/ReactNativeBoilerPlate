/*
Name : Suraj Sanwal 
File Name : FloatingInput.js
Description : Contains the header for auth screens.
Date : 12 Sept 2018
*/

import React, {Component} from "react";
import {
  View,
  TextInput,
  // Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Platform,
} from "react-native";
import PropsTypes from "prop-types";
import Constants from "../../constants";
import {moderateScale} from "../../helpers/ResponsiveFonts";
import Icon from "./Icon";

import ErrorToast from "./ErrorToast";

class FloatingInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
      value: this.props.value,
    };
  }

  UNSAFE_componentWillReceiveProps(prevProps, nextProps) {
    if (prevProps.error !== nextProps.error) {
      this.toolTip && this.toolTip.openModal();
    }
  }

  handleFocus = () => {
    this.toolTip && this.toolTip.hideModal();
    this.setState({isFocused: true});
  };
  handleBlur = () => {
    this.toolTip && this.toolTip.hideModal();
    this.setState({isFocused: false});
  };
  focus() {
    this.inputBox.focus();
  }

  render() {
    const {
      label,
      value,
      value1,
      editable,
      onCancel,
      onUpdate,
      loading,
      returnKey,
      icon,
      onIconPress,
      secureTextEntry,
      onChangeText,
      onSubmitEditing,
      container,
      error,
      inputWrapper,
      autoFocus,
      keyboardType,
      ...props
    } = this.props;
    const {isFocused} = this.state;
    // const labelStyle = {
    //   fontFamily: "Helvetica",
    //   //position: "absolute",
    //   left: 0,
    //   top:
    //     !error && !isFocused && !value ? moderateScale(20) : moderateScale(0),
    //   fontSize: !isFocused && !value ? moderateScale(17) : moderateScale(17),
    //   color: !error ? Constants.Colors.GreyShadeLight : Constants.Colors.Red
    //   // paddingVertical: isFocused ? moderateScale(5) : 0
    // };

    return (
      <View style={[Styles.container, container]}>
        {/* {error || value || isFocused ? (
          <Text style={labelStyle}>{label}</Text>
        ) : null} */}
        <View
          style={[
            Styles.inputWrapper,
            {
              borderColor: error
                ? Constants.Colors.Red
                : Constants.Colors.Primary,
            },
            inputWrapper,
          ]}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
            <TextInput
              ref={ref => (this.inputBox = ref || "inputbox")}
              style={[
                Styles.inputStyle,
                {
                  color: editable
                    ? Constants.Colors.Primary
                    : Constants.Colors.Placehoder,
                },
              ]}
              autoFocus={autoFocus}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              value={value}
              editable={editable}
              returnKeyType={returnKey}
              placeholder={!isFocused ? label : null}
              secureTextEntry={secureTextEntry}
              onChangeText={onChangeText}
              keyboardType={keyboardType}
              onSubmitEditing={onSubmitEditing}
              {...props}
            />
            {error ? (
              <Icon
                innerref={ref => (this.errorIcon = ref)}
                name="exclamation-circle"
                color={Constants.Colors.Red}
                size={25}
              />
            ) : null}
            {error ? <ErrorToast error={error} /> : null}
            {!error && icon ? (
              <TouchableOpacity style={Styles.pad5} onPress={onIconPress}>
                {icon}
              </TouchableOpacity>
            ) : null}
          </View>
          {value1 !== value && editable ? (
            <View style={{flexDirection: "row"}}>
              <TouchableOpacity style={Styles.pad5} onPress={onCancel}>
                <View style={Styles.cancelImg}>
                  <Image
                    source={Constants.Images.Common.Cancel}
                    resizeMode={"contain"}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={Styles.pad5} onPress={onUpdate}>
                <View style={Styles.submitImg}>
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Image
                      source={Constants.Images.Common.Accept}
                      resizeMode={"contain"}
                    />
                  )}
                </View>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  container: {
    paddingVertical: moderateScale(10),
  },
  inputStyle: {
    flex: 1,
    fontSize: moderateScale(17),
    fontFamily: "Helvetica",
    ...Platform.select({
      ios: {
        height: moderateScale(30),
      },
    }),
  },
  inputWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    // borderWidth: 1,
    // borderColor: Constants.Colors.Secondary,
    // borderRadius: moderateScale(10),
    // paddingHorizontal: moderateScale(20)
  },
  cancelImg: {
    backgroundColor: "#A9AFAF",
    width: 30,
    height: 30,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  submitImg: {
    backgroundColor: "#F6CF65",
    width: 30,
    height: 30,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  pad5: {padding: 5},
});

/*
PropsTypes defined for Button 
*/
FloatingInput.propsTypes = {
  container: PropsTypes.object,
  inputWrapper: PropsTypes.object,
  autoFocus: PropsTypes.bool,
  keyboardType: PropsTypes.string,
};
/*
Default props from Button 
*/
FloatingInput.defaultProps = {
  container: {},
  inputWrapper: {},
  autoFocus: false,
  keyboardType: "default",
};

export default FloatingInput;

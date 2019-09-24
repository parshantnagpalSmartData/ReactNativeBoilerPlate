import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Platform,
  ActivityIndicator,
  ScrollView,
  Alert
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as AppAction from "../../actions";
import { moderateScale } from "../../helpers/ResponsiveFonts";
import AuthButton from "../../components/common/AuthButton";
import Constants from "../../constants";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
class Institutions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: ""
    };
  }

  componentDidMount() {
    this.props.AppAction.getInstitutions();
  }

  submitInstitute = () => {
    let { selected } = this.state;
    if (!selected) {
      Alert.alert(
        "Alert ",
        "Please Select Institution",
        [{ text: "OK", onPress: () => {} }],
        { cancelable: false }
      );
      return;
    }
    let { AppAction, componentId } = this.props;
    let { userData } = { ...this.props };
    userData.institutions = selected;
    AppAction.pushToParticularScreen(componentId, "InstitutionCode", {
      userData
    });
  };
  backPress = () => {
    this.props.AppAction.pop(this.props.componentId);
  };
  itemPress = item => {
    let name = item.institutionName;
    this.setState({ selected: item }, () => {
      if (name === "Other") {
        this.inputbox && this.inputbox.focus();
      }
    });
  };
  renderItem = ({ item, index }) => {
    let { selected, otherName } = this.state;
    let isSelected = item.idInstitutions === selected.idInstitutions;
    return (
      <TouchableOpacity
        onPress={() => this.itemPress(item)}
        style={{
          height: moderateScale(30),
          padding: moderateScale(5),
          backgroundColor: isSelected ? "#b1dbe3" : Constants.Colors.White,
          borderColor: isSelected ? Constants.Colors.Gray : null,
          borderWidth: isSelected ? moderateScale(1.5) : null
        }}
        key={index}
      >
        {isSelected && item.institutionName === "Other" ? (
          <TextInput
            ref={ref => (this.inputbox = ref || "inputbox")}
            placeholder={"Type other institution..."}
            value={otherName}
            onChangeText={otherName => this.setState({ otherName })}
          />
        ) : (
          <Text
            style={{
              fontSize: moderateScale(16),

              fontFamily: "Cochin",
              color: Constants.Colors.Black
            }}
          >
            {item.institutionName}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  render() {
    let {
      signUp: { institutions },
      loader: { instiutionLoader }
    } = this.props;

    if (instiutionLoader) {
      return (
        <View
          style={[
            styles.container,
            { justifyContent: "center", alignItems: "center" }
          ]}
        >
          <ActivityIndicator size={"large"} color={Constants.Colors.Primary} />
        </View>
      );
    } else {
      return (
        <ScrollView style={styles.container} nestedScrollEnabled>
          <View
            // extraHeight={280}
            // enableOnAndroid={true}
            // scrollEnabled={true}
            // enableAutomaticScroll={true}
            // showsHorizontalScrollIndicator={false}
            // showsVerticalScrollIndicator={false}
            // keyboardShouldPersistTaps={"handled"}
            style={{ paddingBottom: moderateScale(50) }}
          >
            <View style={{}}>
              <View style={styles.welcomeView}>
                <Text style={styles.welcomeText} numberOfLines={1}>
                  Organization
                </Text>
              </View>
              <View style={styles.centerView}>
                <Text style={styles.centerText} numberOfLines={3}>
                  Please select your Ajivar home base
                </Text>
              </View>
            </View>
            <View
              style={{
                borderColor: Constants.Colors.Gray,
                borderWidth: 1,
                margin: moderateScale(20),
                // borderRadius: moderateScale(10),
                height:
                  Platform.OS === "ios"
                    ? Constants.BaseStyle.DEVICE_HEIGHT * 0.4
                    : Constants.BaseStyle.DEVICE_HEIGHT * 0.4,
                maxHeight:
                  Platform.OS === "ios"
                    ? Constants.BaseStyle.DEVICE_HEIGHT * 0.4
                    : Constants.BaseStyle.DEVICE_HEIGHT * 0.4
              }}
            >
              <FlatList
                nestedScrollEnabled
                data={institutions.length !== 0 ? institutions : []}
                renderItem={this.renderItem}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                extraData={this.state.selected}
              />
            </View>
            <View style={styles.stylesAuthContainer}>
              <AuthButton
                buttonName={"Continue"}
                textStyle={styles.textStyle}
                buttonStyle={styles.signUpButtonStyle}
                gradientStyle={styles.gradientStyle}
                onPress={() => this.submitInstitute()}
              />
            </View>
          </View>
        </ScrollView>
      );
    }
  }
}

const mapStateToProps = state => ({
  user: state.user,
  app: state.app,
  signUp: state.signUp,
  loader: state.loader
});
const mapDispatchToProps = dispatch => ({
  AppAction: bindActionCreators(AppAction, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Institutions);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: moderateScale(20),
    backgroundColor: Constants.Colors.AuthYellow
    // justifyContent: "space-between"
  },

  stylesAuthContainer: { justifyContent: "center", alignItems: "center" },
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
  },
  centerView: {
    justifyContent: "center",
    marginTop: moderateScale(30),
    alignItems: "center"
  },
  signUpButtonStyle: {
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
  }
});

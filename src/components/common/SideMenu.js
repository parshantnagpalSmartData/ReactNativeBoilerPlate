import React, {Component} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
  Linking,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import * as appActions from "../../actions";
import Constants from "../../constants";
// import SafeView from "../../components/common/SafeView";
import {moderateScale} from "../../helpers/ResponsiveFonts";

// import ajivarLogo from "../../assets/images/logo/logo.png";

class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: false,
    };
  }

  componentDidMount() {
    this.pushToParticularScreen = this.pushToParticularScreen.bind(this);
    this.toggleSettings = this.toggleSettings.bind(this);
  }
  /*
    closes the toggle
    */
  closeToggle() {
    this.props.appActions.mergeOptions(this.props.componentId, false);
  }
  pushToParticularScreen(screenName, enable, params = {}) {
    let {selectedtab} = this.props.app;
    this.closeToggle();
    console.log("selectedtabselectedtab", selectedtab);
    // this.props.appActions.tabSelect("BottomTabsId", 3);
    setTimeout(
      () => {
        this.props.appActions.pushToParticularScreenBottomTabs(
          selectedtab,
          screenName,
          params,
          enable,
        );
      },
      Platform.OS == "ios" ? 0 : 200,
    );
  }

  onLogoutPress() {
    this.closeToggle();
    this.props.appActions.logOut();
  }
  toggleSettings() {
    let {settings} = this.state;
    this.setState({settings: !settings});
  }
  socialIconClick = url => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        // console.log("Don't know how to open URI: " + url);
      }
    });
  };
  render() {
    let {settings} = this.state,
      {AjivarGuideEnable} = this.props,
      menu = [
        {
          title: Constants.Strings.SideMenu.Resources,
          // icon: Constants.Images.SideMenu.Forward,
          enable: true,
          marginTop: false,
          onPress: () => {},
        },
        {
          title: "Settings",
          icon: settings ? "angle-up" : "angle-down",
          enable: true,
          marginTop: false,
          onPress: () => {
            this.toggleSettings();
          },
          subMenu: [
            {
              title: Constants.Strings.SideMenu.Settings.EditMyProfile,
              onPress: () => {
                this.pushToParticularScreen("EditProfile", false);
              },
            },
            {
              title: Constants.Strings.SideMenu.Settings.ChangeMyPassword,
              onPress: () =>
                this.pushToParticularScreen("ChangePassword", false),
            },
            {
              title: Constants.Strings.SideMenu.Settings.Logout,
              onPress: () => {
                this.onLogoutPress();
              },
            },
          ],
        },
        // {
        //   title: Constants.Strings.SideMenu.Home,
        //   onPress: () => this.pushToParticularScreen("Journal", false)
        // },
        {
          title: Constants.Strings.SideMenu.Screen1,
          enable: true,
          marginTop: true,
          onPress: () => this.pushToParticularScreen("Screen1", false),
        },
        {
          title: Constants.Strings.SideMenu.Screen2,
          enable: AjivarGuideEnable,
          marginTop: true,
          onPress: () => this.pushToParticularScreen("Profile", false),
        },
        {
          title: Constants.Strings.SideMenu.Faq,
          enable: true,
          marginTop: true,
          onPress: () =>
            this.pushToParticularScreen("WebView", false, {
              uri: Constants.Url.FAQs,
            }),
        },
        {
          title: Constants.Strings.SideMenu.privacyPolicy,
          enable: true,
          marginTop: false,
          onPress: () =>
            this.pushToParticularScreen("WebView", false, {
              uri: Constants.Url.privacyPolicy,
            }),
        },
        {
          title: Constants.Strings.SideMenu.TermsofService,
          enable: true,
          marginTop: false,
          onPress: () =>
            this.pushToParticularScreen("WebView", false, {
              uri: Constants.Url.termsofService,
            }),
        },
      ];

    return (
      <ScrollView style={Styles.sideMenuContainer} scrollEnabled>
        {/* <SafeView /> */}

        {/* <TouchableOpacity
          style={[Styles.menuBtn, Styles.menuButton3]}
          onPress={() => {}}
        >
          <Text style={[Styles.menuText]}>
            {Constants.Strings.SideMenu.Resources}
          </Text>
        </TouchableOpacity> */}

        <View style={Styles.sideMenuSubContainer}>
          {menu.map((item, index) => {
            return (
              <View key={index}>
                <TouchableOpacity
                  style={[
                    Styles.menuBtn,
                    Styles.menuButton2,
                    {
                      borderBottomWidth:
                        item.title == "Settings" && settings ? 0 : 1,
                    },
                    index === 0 && Styles.menuButton3,
                    !item.enable && Styles.disabledItem,
                    {marginTop: item.marginTop ? 20 : 0},
                  ]}
                  onPress={() => item.onPress()}
                  disabled={!item.enable}
                  opacity={!item.enable ? 1 : 0}>
                  <Text style={[Styles.menuText]}>{item.title}</Text>
                  {/* {item.icon && (
                    <Image
                      source={item.icon}
                      style={Styles.sidemenuUpDownImage}
                    />
                  )} */}
                  {item.icon && (
                    <Icon
                      name={item.icon}
                      color={"black"}
                      size={Constants.BaseStyle.DEVICE_HEIGHT > 800 ? 30 : 25}
                    />
                  )}
                </TouchableOpacity>
                {settings &&
                  item &&
                  item.subMenu &&
                  item.subMenu.map((subItem, subIndex) => {
                    return (
                      <TouchableOpacity
                        style={[
                          Styles.menuBtn,
                          Styles.menuButtonSetting,
                          {
                            borderBottomWidth:
                              subIndex == item.subMenu.length - 1 ? 1 : 0,
                          },
                        ]}
                        onPress={() => subItem.onPress()}
                        key={subIndex}>
                        <Text
                          style={[
                            Styles.menuText,
                            Styles.subMenuText,
                            Styles.menuSubText,
                          ]}>
                          {subItem.title}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
              </View>
            );
          })}
        </View>
        <View
          style={{
            flex: 1,
            marginLeft:
              Platform.OS == "android"
                ? Constants.BaseStyle.DEVICE_WIDTH * 0.3
                : Constants.BaseStyle.DEVICE_HEIGHT > 800
                ? Constants.BaseStyle.DEVICE_WIDTH * 0.22
                : Constants.BaseStyle.DEVICE_WIDTH * 0.3,
            justifyContent: "center",
            paddingVertical: settings
              ? Constants.BaseStyle.DEVICE_HEIGHT > 800
                ? moderateScale(30)
                : 0
              : moderateScale(50),
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              paddingVertical: moderateScale(10),
            }}>
            <TouchableOpacity
              onPress={() => {
                this.socialIconClick("https://www.facebook.com/");
              }}
              style={{paddingHorizontal: moderateScale(5)}}>
              <Image
                style={{
                  width:
                    Constants.BaseStyle.DEVICE_HEIGHT > 800
                      ? moderateScale(40)
                      : moderateScale(27),
                  height:
                    Constants.BaseStyle.DEVICE_HEIGHT > 800
                      ? moderateScale(40)
                      : moderateScale(27),
                }}
                source={Constants.Images.facebook}
              />
              {/* <Icon name="facebook-square" color="blue" size={35} /> */}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.socialIconClick("https://www.instagram.com/");
              }}
              style={{paddingHorizontal: moderateScale(5)}}>
              <Image
                style={{
                  width:
                    Constants.BaseStyle.DEVICE_HEIGHT > 800
                      ? moderateScale(40)
                      : moderateScale(27),
                  height:
                    Constants.BaseStyle.DEVICE_HEIGHT > 800
                      ? moderateScale(40)
                      : moderateScale(27),
                }}
                source={Constants.Images.instagram}
              />
            </TouchableOpacity>
          </View>
          <View style={Styles.appVersionCont}>
            <Text style={Styles.appVersionText}>
              {Constants.Strings.SideMenu.VersionCode +
                Constants.AppConstants.AppVersion}
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  appActions: bindActionCreators(appActions, dispatch),
});
function mapStateToProps(state) {
  return {
    user: state.user,
    app: state.app,
    AjivarGuideEnable: state.app.AjivarGuideEnable,
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SideMenu);

const Styles = StyleSheet.create({
  // Side menu Component
  sideMenuContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: Constants.Colors.White,
  },
  sideMenuImageContainer: {
    marginTop: Platform.OS == "ios" ? moderateScale(20) : 0,
    paddingHorizontal: moderateScale(30),
    paddingVertical: moderateScale(10),
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  profileImg: {
    height: Constants.BaseStyle.DEVICE_WIDTH * 0.3,
    width: Constants.BaseStyle.DEVICE_WIDTH * 0.3,
    borderColor: Constants.Colors.Primary,
    //borderWidth: 1,
    borderRadius: moderateScale(100),
    backgroundColor: Constants.Colors.White,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  imgAvatar: {
    height: Constants.BaseStyle.DEVICE_WIDTH * 0.3,
    width: Constants.BaseStyle.DEVICE_WIDTH * 0.3,
  },
  userInfo: {
    padding: moderateScale(5),
  },
  userName: {
    // ...Constants.Fonts.TitilliumWebBold,
    fontSize: moderateScale(22),
    color: Constants.Colors.Primary,
  },
  userEmail: {
    // ...Constants.Fonts.TitilliumWebRegular,
    fontSize: moderateScale(17),
    color: Constants.Colors.gray,
  },
  sideMenuSubContainer: {
    // paddingHorizontal: moderateScale(30),
    // paddingVertical: moderateScale(10),
    backgroundColor: Constants.Colors.White,
  },
  menuBtn: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#FFF1CD",
  },
  menuButton2: {
    borderColor: Constants.Colors.fadeBorder,
    borderWidth: 1,
    paddingVertical: 10,
  },
  menuButtonSetting: {
    borderBottomColor: Constants.Colors.fadeBorder,
    borderLeftWidth: 1,
  },
  menuButton3: {
    backgroundColor: Constants.Colors.Transparent,
    borderColor: Constants.Colors.fadeBorder,
    borderBottomWidth: 1,
    paddingVertical: 10,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  menuText: {
    // ...Constants.Fonts.TitilliumWebRegular,
    fontSize:
      Constants.BaseStyle.DEVICE_HEIGHT > 800
        ? moderateScale(22)
        : moderateScale(18),
    color: Constants.Colors.menuItemTxt,
    paddingHorizontal: moderateScale(30),
    paddingVertical:
      Constants.BaseStyle.DEVICE_HEIGHT > 800
        ? moderateScale(8)
        : moderateScale(0),
    fontWeight: "500",
    //  textAlign : 'center',
    fontFamily: "Cochin",
  },
  subMenuText: {
    paddingVertical: moderateScale(3),
  },
  menuSubText: {
    fontSize: moderateScale(20),
    fontWeight: "normal",
  },
  buttonStyle: {},
  gradientStyle: {borderRadius: 0},
  activeStatus: {
    borderColor: Constants.Colors.placehoder,
    borderWidth: 0.4,
    paddingHorizontal: moderateScale(30),
  },
  shuttleName: {
    // ...Constants.Fonts.TitilliumWebSemiBold,
    fontSize: moderateScale(21),
    color: Constants.Colors.Primary,
  },
  shuttleProvider: {
    // ...Constants.Fonts.TitilliumWebRegular,
    fontSize: moderateScale(17),
    color: Constants.Colors.placehoder,
  },
  suttleStatusBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: moderateScale(15),
  },
  activeBtn: {
    width: moderateScale(100),
    backgroundColor: Constants.Colors.Yellow,
    height: moderateScale(36),
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: moderateScale(3),
  },
  checkBtn: {
    backgroundColor: Constants.Colors.White,
    justifyContent: "center",
    alignItems: "center",
    padding: moderateScale(6),
    margin: moderateScale(3),
    borderRadius: moderateScale(3),
  },
  activeText: {
    // ...Constants.Fonts.TitilliumWebSemiBold,
    fontSize: moderateScale(18),
    color: Constants.Colors.White,
    marginHorizontal: moderateScale(5),
  },
  sidemenuUpDownImage: {
    height: moderateScale(20),
    width: moderateScale(20),
  },
  disabledItem: {
    opacity: 0.5,
  },
  appVersionText: {
    fontSize: moderateScale(14),
    fontFamily: "Cochin",
  },
  appVersionCont: {
    flex: 1,
  },
});

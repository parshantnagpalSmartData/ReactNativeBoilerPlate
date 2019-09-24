import React from "react";
import { View, StyleSheet, FlatList, Text, Image } from "react-native";
import { connect } from "react-redux";
import * as AppAction from "../../actions";
import { moderateScale } from "../../helpers/ResponsiveFonts";
import VideoPlayerCustom from "../../components/common/VideoPlayerCustom";
import Constants from "../../constants";

class VideoLibrary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoData: null
    };
  }

  componentDidMount = () => {
    let { getVideos } = this.props;
    getVideos(res => {
      if (res.VideoLibrary) {
        this.setState({ videoData: res.VideoLibrary });
      }
    });
  };
  onRefresh = () => {
    let { getVideos } = this.props;
    getVideos(res => {
      if (res.VideoLibrary) {
        this.setState({ videoData: res.VideoLibrary });
      }
    });
  };

  _renderSubItem = ({ item, index }) => {
    return (
      <View style={styles.videoItem}>
        <VideoPlayerCustom
          key={index}
          hideStatusBar={() => {}}
          hideCloseButton={() => {}}
          url={item.videoLink}
          thumbnailLinks={item.thumbnailLinks}
          defaultMuted={false}
          playing={false}
          posterImage={true}
        />
      </View>
    );
  };

  _renderItem = ({ item }) => {
    return (
      <View style={styles.video}>
        <Text style={styles.videoTitleText}>{item.name}</Text>
        <FlatList
          data={item.data}
          extrData={item}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderSubItem}
        />
      </View>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imagContainer}>
          <Image
            source={Constants.Images.myVideoLibrary.VideoLibrary}
            resizeMode={"contain"}
            style={styles.headerLogo}
          />
          <View style={styles.line} />
        </View>
        <FlatList
          data={this.state.videoData}
          extrData={this.state}
          keyExtractor={this._keyExtractor}
          onRefresh={this.onRefresh}
          refreshing={false}
          ListEmptyComponent={
            <View style={styles.centerTextContaioner}>
              <Text style={styles.centerText}>No Saved Video.</Text>
            </View>
          }
          renderItem={this._renderItem}
          contentContainerStyle={{ paddingBottom: moderateScale(20) }}
        />
      </View>
    );
  }
}

function mapStateToProps() {
  return {};
}

const mapDispatchToProps = dispatch => {
  return {
    getVideos: cb => dispatch(AppAction.getVideos(cb))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoLibrary);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF1CD"
  },
  centerTextContaioner: {
    height: Constants.BaseStyle.DEVICE_HEIGHT * 0.8,
    justifyContent: "center",
    alignItems: "center"
  },
  headerLogo: {
    height: Constants.BaseStyle.DEVICE_WIDTH * 0.2,
    width: Constants.BaseStyle.DEVICE_WIDTH * 0.8
  },
  line: {
    width: Constants.BaseStyle.DEVICE_WIDTH * 0.5,
    height: moderateScale(1),
    backgroundColor: Constants.Colors.Black,
    marginBottom: Constants.BaseStyle.isIphoneX()
      ? moderateScale(20)
      : moderateScale(5)
  },
  centerText: {
    fontSize: moderateScale(13),
    paddingVertical: moderateScale(5),
    fontFamily: "Helvetica",
    color: Constants.Colors.GreyShadeLight,
    textAlign: "justify"
  },
  video: {
    marginBottom: moderateScale(10)
  },
  videoTitleText: {
    // ...Constants.Fonts.TitilliumWebRegular,
    fontSize: moderateScale(20),
    color: Constants.Colors.menuItemTxt,
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(5),
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    fontWeight: "500",
    //  textAlign : 'center',
    fontFamily: "Cochin"
  },
  imagContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: moderateScale(5)
  },
  videoItem: {
    marginVertical: moderateScale(10)
  }
});

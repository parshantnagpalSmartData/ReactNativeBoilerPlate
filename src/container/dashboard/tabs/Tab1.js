/*
 * @file: Bot.js
 * @date: 18.Feb.2019
 * @author: Amit Singh Phartiyal
 * */
import React from "react";
import {
  View,
  StyleSheet
} from "react-native";

import { connect } from "react-redux";
import { Navigation } from "react-native-navigation";

class Tab1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    Navigation.mergeOptions(this.props.componentId, {
      bottomTabs: {
        visible: false,
        ...Platform.select({ android: { drawBehind: false } })
      },
    });

  }
  render() {
    return (<View style={styles.container}></View>)
  }
}
function mapStateToProps(state) {
  return {

  };
}
const mapDispatchToProps = dispatch => {
  return {
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tab1);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

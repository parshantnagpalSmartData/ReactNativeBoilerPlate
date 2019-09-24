/*
 * @file: Home.js
 * @description: Contains the Ooz Challenge Container.
 * @date: 2.May.2019
 * @author: Parshant Nagpal
 * */

import React from "react";
import {
  View,
  StyleSheet
} from "react-native";

import { connect } from "react-redux";


class Tab4 extends React.Component {
   render() {
      return (
        <View>
        </View>
      );
  }
}

const styles = StyleSheet.create({

});

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
)(Tab4);

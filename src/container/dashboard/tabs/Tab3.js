import React from "react";
import {View, StyleSheet} from "react-native";
import {connect} from "react-redux";

class Tab3 extends React.Component {
  render() {
    return <View style={styles.container}></View>;
  }
}
// function mapStateToProps(state) {
//   return {};
// }
// const mapDispatchToProps = dispatch => {
//   return {};
// };

export default connect(
  null,
  null,
)(Tab3);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

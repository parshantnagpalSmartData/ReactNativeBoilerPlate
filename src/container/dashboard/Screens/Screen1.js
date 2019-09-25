import React from "react";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";


class Screen1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
  }


  render() {
    return (
      <View style={styles.container}>
        
      </View>
    );
  }
}

function mapStateToProps() {
  return {};
}

const mapDispatchToProps = dispatch => {
  return {
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Screen1);

const styles = StyleSheet.create({
  
});

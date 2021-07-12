import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { RED } from '../Colors';
import AppStyles from '../AppStyles';

export default class TabText extends React.Component {
  constructor(props) {
    super(props);
    //this.state = {isSelected: this.props.isSelected};
    this.onPress = this.onPress.bind(this);
  }


  render() {
    return (
      <TouchableOpacity
        style={AppStyles.marginTop2}
        onPress={() => {
          if (!this.props.isSelected) {
            //if not selected then selected otherwise skip it
            this.onPress();
          }
        }}>
        <Text
          style={
            this.props.isSelected
              ? styles.textDefaultStyle
              : styles.textSelectionStyle
          }>
          {this.props.children}
        </Text>
        <View style={this.props.isSelected ? styles.tabLine : null} />
      </TouchableOpacity>
    );
  }

  updateSelection(update) {
    this.setState({ isSelected: update });
  }

  onPress = () => {
    //this.setState({isSelected: !this.props.isSelected}, () => {
    this.props.onPress(!this.props.isSelected);
    //});
  };
}

const styles = StyleSheet.create({
  textDefaultStyle: {
    color: '#1070d4',
    paddingHorizontal: 5,
  },
  textSelectionStyle: {
    color: '#000000',
    paddingHorizontal: 5,
  },
  tabLine: {
    borderColor: RED,
    borderWidth: 1,
    marginTop: 3,
  },
});

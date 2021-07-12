import React from 'react';
import {Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import AppStyles from '../AppStyles';
import {RED} from '../Colors';
import {IMAGE_SUBMIT} from '../Images';

class Button extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.isDisabled !== this.props.isDisabled ||
      nextProps.children !== this.props.children
    ) {
      return true;
    }
    return false;
  }

  render() {
    const {isDisabled = false, children, onPress, additionalStyle} = this.props;
    return children ? (
      <TouchableOpacity
        style={[styles.button, additionalStyle]}
        onPress={onPress}
        disabled={isDisabled}
        activeOpacity={isDisabled ? 1 : 0.7}>
        <Text style={styles.buttonText}>{children}</Text>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        style={[AppStyles.alignSelfCenter, additionalStyle]}
        onPress={onPress}
        disabled={isDisabled}
        activeOpacity={isDisabled ? 1 : 0.7}>
        <Image style={AppStyles.imageSubmitStyle} source={IMAGE_SUBMIT} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: RED,
    paddingVertical: 7,
    paddingBottom: 7,
    borderRadius: 7,
    opacity: 0.9,
  },
  buttonText: {
    fontSize: 12,
    alignSelf: 'center',
    color: '#ffffff',
  },
});

export default Button;

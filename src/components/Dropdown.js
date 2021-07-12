import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import {IMAGE_EXPAND, IMAGE_COLLAPSE} from '../Images';
import {GREY1, GREY2, GREY5} from '../Colors';
import AppStyles from '../AppStyles';

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listOpen: false,
      headerTitle: this.props.title,
    };
    this.close = this.close.bind(this);
  }

  close() {
    this.setState({
      listOpen: false,
    });
  }

  selectItem(item) {
    this.setState({
      headerTitle: item,
      listOpen: false,
    });
  }

  toggleList() {
    this.setState(prevState => ({
      listOpen: !prevState.listOpen,
    }));
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.listOpen === this.state.listOpen) {
      return false;
    }
    return true;
  }

  render() {
    const {list} = this.props;
    const {listOpen, headerTitle} = this.state;
    return (
      <View style={[AppStyles.marginTop5]}>
        <TouchableOpacity style={styles.row} onPress={() => this.toggleList()}>
          <Text style={styles.dropDownText}>{headerTitle}</Text>
          <Image style={styles.dropdownStateImage} source={IMAGE_EXPAND} />
        </TouchableOpacity>
        {listOpen && (
          <FlatList
            style={styles.overlay}
            data={list}
            renderItem={({item, index}) => (
              <TouchableOpacity onPress={() => {
                this.selectItem(item)
                this.props.onPress(item)
                }}>
                <View style={styles.separatorRow}>
                  <Text
                    style={[
                      AppStyles.textGrey3,
                      AppStyles.textH4,
                      AppStyles.alignSelfCenter,
                    ]}>
                    {item}
                  </Text>
                  {index === 0 ? (
                    <Image
                      style={[
                        styles.dropdownStateImage,
                        AppStyles.alignSelfCenter,
                        AppStyles.marginEnd3,
                      ]}
                      source={IMAGE_COLLAPSE}
                    />
                  ) : null}
                </View>
                <View style={styles.horizontalLine} />
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    height: 36,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '3%',
    paddingVertical: '2%',
    borderRadius: 10,
    backgroundColor: GREY1,
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    zIndex: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: GREY1,
    width: '100%',
    height: '340%',
  },
  separatorRow: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingStart: '5%',
  },
  dropDownText: {
    color: GREY5,
  },
  dropdownStateImage: {
    width: 26,
    height: 20,
  },
  horizontalLine: {
    borderBottomWidth: 1,
    borderBottomColor: GREY2,
    backgroundColor: GREY1,
    marginStart: '4%',
    marginEnd: '8%',
  },
});

export default Dropdown;

import { StyleSheet } from 'react-native';
import Dimensions from 'Dimensions';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  buttonWrapper: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#ede661',
    height: 55,
    width: width - (width / 10),
    position: 'relative',
    overflow: 'hidden',
  },
  iconWrapper: {
    width: 30,
    height: 30,
    borderRadius: 5,
    position: 'relative',
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    borderWidth: 3,
    borderColor: '#5e0977',
  },
  disabledGradient: {
    borderColor: '#696969',
  },
  buttonDisabled: {
    borderWidth: 2,
    borderColor: '#a9a9a9',
  }
});

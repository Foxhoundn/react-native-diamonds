import { StyleSheet } from 'react-native';
import Dimensions from 'Dimensions';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  buttonWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    backgroundColor: '#9859D4',
    borderBottomWidth: 3,
    borderBottomColor: '#612796',
    height: 40,
    width: width - (width / 10),
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    textShadowColor: '#612796',
    textShadowOffset: {
      width: -1,
      height: -1,
    },
    textShadowRadius: 1,
  },
  buttonDisabled: {
    backgroundColor: '#a9a9a9',
    borderBottomWidth: 3,
    borderBottomColor: '#696969',
  },
});

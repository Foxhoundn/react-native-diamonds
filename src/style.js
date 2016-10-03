import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  flex: {
    flex: 1,
  },
  flexCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topbarLeftElement: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 20,
  },
  topbarRightElement: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 20,
  },
  topbarTitle: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topbarTitleText: {
    fontSize: 28,
  },
  menuButton: {
    marginBottom: 25,
  },
  menuButtonText: {
    fontSize: 23,
  },
  fade: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  }
});

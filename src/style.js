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
  menuButton: {
    marginBottom: 25,
  },
  menuButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  }
});

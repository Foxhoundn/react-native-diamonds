import { StyleSheet } from 'react-native';
import Dimensions from 'Dimensions';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  board: {
    paddingVertical: 10,
  },
  overText: {
    fontSize: 45,
    marginBottom: 40,
  },
  scoreWrapper: {
    width: width - (width / 10),
    height: 55,
    marginBottom: 30,
    borderWidth: 2,
    borderColor: '#a9a9a9',
  },
  highScoreWrapper: {
    borderColor: '#19F86D',
  },
  scoreGradient: {
    height: 50,
    flexDirection: 'row',
    borderWidth: 3,
    borderColor: '#696969',
  },
  highScoreGradient: {
    borderColor: '#32B82C',
  },
  scoreText: {
    flex: 1,
    fontSize: 20,
  },
  highScoreText: {
    fontSize: 33,
    color: '#5AE725',
    marginBottom: 50,
    textShadowColor: '#FFFF87',
    textShadowOffset: {
      width: 0,
      height: -1,
    },
    textShadowRadius: 3,
  },
  streakWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 50,
  },
  streakText: {
    fontSize: 45,
    color: '#fff',
  },
  multiplierText: {
    color: 'orange',
  }
});

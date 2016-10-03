import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  fieldImage: {
    width: 35,
    height: 35,
  },
  fieldImageSelected: {
    width: 45,
    height: 45,
    borderWidth: 3,
    borderColor: '#fff',
    borderRadius: 35,
  },
  field: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    borderWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
    borderRightColor: 'rgba(255, 255, 255, 0.2)',
    borderLeftColor: 'rgba(255, 255, 255, 0.8)',
    borderTopColor: 'rgba(255, 255, 255, 0.8)',
    marginHorizontal: 4,
    marginVertical: 3,
  },
});

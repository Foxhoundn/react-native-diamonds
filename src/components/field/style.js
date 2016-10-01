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
  },
  selectedField: {
    borderColor: 'yellow',
  }
});

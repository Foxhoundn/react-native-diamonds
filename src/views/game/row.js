/* @flow */
import React from 'react';
import { View } from 'react-native';

import styles from './style';
import Field from '../../containers/field';

type Props = {
  diamonds: Array<Object>,
}

const Row: Function = ({ row, rowIndex, ...rest }: Props): React.Element<any> => (
  <View style={styles.row}>
    {row.map((field, index) => (
      <Field
        field={field}
        key={`field_${rowIndex}_${index}`}
        {...rest}
      />
    ))}
  </View>
);

export default Row;

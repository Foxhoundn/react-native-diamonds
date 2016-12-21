/* @flow */
import React from 'react';
import { View } from 'react-native';

import styles from './style';
import Field from '../../containers/field';

type Props = {
  diamonds: Array<Object>,
  row: Array<Object>,
  rowIndex: number,
  selected: Object,
}

const Row: Function = ({ row, rowIndex, selected, ...rest }: Props): React.Element<any> => (
  <View style={styles.row}>
    {row.map((field, index) => (
      <Field
        field={field}
        position={field.field}
        row={field.row}
        color={field.color}
        key={`field_${rowIndex}_${index}`}
        active={!!selected && field.field === selected.field && field.row === selected.row}
        {...rest}
      />
    ))}
  </View>
);

export default Row;

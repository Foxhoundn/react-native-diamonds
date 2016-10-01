/* @flow */
import React from 'react';
import Button from '../button';
import styles from './style';

type Props = {
  children: string,
  onPress: Function,
  wrapperStyle?: Object,
  textStyle?: Object,
};

const SmallButton: Function = (props: Props): React.Element<any> => (
  <Button
    {...props}
    wrapperStyle={styles.buttonWrapper}
    textStyle={styles.buttonText}
  />
);

export default SmallButton;

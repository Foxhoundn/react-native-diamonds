/* @flow */
import React from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';

import Button from '../../components/button';
import SmallButton from '../../components/small_button';
import * as app from '../../store/app/actions';

type Props = {
  onPress: Function,
  playSound: Function,
  disabled: boolean,
  small: boolean,
}

const ButtonContainer: Function = ({
  onPress,
  playSound,
  disabled,
  small,
  ...rest
}: Props): React.Element<any> => {
  const handlePress: Function = () => {
    if (!disabled) {
      playSound('button');
      onPress();
    } else {
      playSound('error');
    }
  };

  if (small) {
    return (
      <SmallButton
        onPress={handlePress}
        disabled={disabled}
        {...rest}
      />
    );
  }

  return (
    <Button
      onPress={handlePress}
      disabled={disabled}
      {...rest}
    />
  );
};

export default compose(
  connect(
    () => ({}),
    {
      playSound: app.playSound,
    }
  )
)(ButtonContainer);

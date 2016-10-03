/* @flow */
import React from 'react';

import globalStyles from '../../style';
import Button from '../../containers/button';

type Props = {
  onPress: Function,
  setting: string,
  value: boolean
}

const SettingsButton: Function = ({ onPress, setting, value }: Props): React.Element<any> => {
  const handlePress: Function = () => {
    onPress(setting, !value);
  };

  return (
    <Button
      onPress={handlePress}
      wrapperStyle={globalStyles.menuButton}
      textStyle={globalStyles.menuButtonText}
    >
      { value ? 'ON' : 'OFF' }
    </Button>
  )
};

export default SettingsButton;

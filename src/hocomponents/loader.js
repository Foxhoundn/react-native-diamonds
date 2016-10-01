import React, { Component } from 'react';
import { View, Text } from 'react-native';
import wrapDisplayName from 'recompose/wrapDisplayName';

export default (
  loadingProp: string,
): Function => (Comp: React.Element<any>): React.Element<any> => {
  class WrappedComponent extends Component {
    render() {
      if (this.props[loadingProp]) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text> Loading ...</Text>
          </View>
        )
      }

      return (
        <Comp {...this.props} />
      )
    }
  }

  WrappedComponent.displayName = wrapDisplayName(Comp, 'loader');

  return WrappedComponent;
}

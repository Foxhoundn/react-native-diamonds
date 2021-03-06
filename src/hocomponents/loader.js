import React, { Component } from 'react';
import wrapDisplayName from 'recompose/wrapDisplayName';

import Background from '../components/background';
import Text from '../components/text';

export default (
  loadingProp: string,
): Function => (Comp: React.Element<any>): React.Element<any> => {
  class WrappedComponent extends Component {
    render() {
      if (this.props[loadingProp]) {
        return (
          <Background>
            <Text> Loading ...</Text>
          </Background>
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

import React, { Component } from 'react';
import wrapDisplayName from 'recompose/wrapDisplayName';

export default (
  condition: Function,
): Function => (Comp: React.Element<any>): React.Element<any> => {
  class WrappedComponent extends Component {
    render() {
      if (!condition(this.props)) return null;

      return (
        <Comp {...this.props} />
      )
    }
  }

  WrappedComponent.displayName = wrapDisplayName(Comp, 'showIf');

  return WrappedComponent;
}

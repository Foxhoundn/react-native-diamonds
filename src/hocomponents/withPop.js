/* @flow */
import React, { Component } from 'react';
import wrapDisplayName from 'recompose/wrapDisplayName';

export default (): Function => (Comp: React.Element<any>): React.Element<any> => {
  class WrappedComponent extends Component {
    handleGoBack: Function = () => {
      this.props.navigator.pop();
    };

    render() {
      return (
        <Comp {...this.props} goBack={this.handleGoBack} />
      )
    }
  }

  WrappedComponent.displayName = wrapDisplayName(Comp, 'withPop');

  return WrappedComponent;
}

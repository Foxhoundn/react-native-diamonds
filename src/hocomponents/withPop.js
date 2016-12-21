/* @flow */
import React, { Component } from 'react';
import wrapDisplayName from 'recompose/wrapDisplayName';

export default (top: boolean): Function => (Comp: React.Element<any>): React.Element<any> => {
  class WrappedComponent extends Component {
    handleGoBack: Function = () => {
      if (top) {
        this.props.navigator.popToTop();
      } else {
        this.props.navigator.pop();
      }
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

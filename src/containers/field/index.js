/* @flow */
import React from 'react';
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import pure from 'recompose/onlyUpdateForKeys';

import Field from '../../components/field';

export default compose(
  pure([
    'position',
    'row',
    'color',
    'active',
  ]),
  withHandlers({
    onPress: ({
      selectField,
      field,
    }) => (): void => {
      selectField(field);
    },
  })
)(Field);

/* @flow */
import React from 'react';
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import mapProps from 'recompose/mapProps';
import lifecycle from 'recompose/lifecycle';

import Field from '../../components/field';

export default compose(
  lifecycle({
    shouldComponentUpdate(nextProps) {
    const { props } = this;
      const { selected } = nextProps;

      if (props.field.color !== nextProps.field.color) {
      return true;
    }

    if (selected !== props.selected) {
      if (selected && selected.row === props.field.row && selected.field === props.field.field) {
        return true;
      }

      if (!selected && props.selected.row === props.field.row && props.selected.field === props.field.field) {
        return true;
      }
    }

    return false;
    },
  }),
  mapProps(({ field, selected, ...rest }) => ({
    active: selected && field.field === selected.field && field.row === selected.row,
    field,
    ...rest,
  })),
  withHandlers({
    onPress: ({
      selectField,
      field,
    }) => (): void => {
      selectField(field);
    },
  }),
)(Field);

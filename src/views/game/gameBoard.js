/* @flow */
import React from 'react';
import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import isEqual from 'lodash/isEqual';

import Section from '../../components/section';
import Row from './row';
import styles from './style';

type Props = {
  board: Array<Array<Object>>,
  selected: Object,
  selectField: Function,
}

const GameBoard: Function = ({ board, selected, selectField }: Props): React.Element<any> => (
  <Section
    customStyle={styles.board}
  >
    {board.map((row, index) => (
      <Row
        key={`row_${index}`}
        rowIndex={index}
        row={row}
        selected={selected}
        selectField={selectField}
      />
    ))}
  </Section>
);

export default compose(
  lifecycle({
    shouldComponentUpdate(nextProps) {
      const { board, selected } = this.props;

      return !isEqual(board, nextProps.board) || !isEqual(selected, nextProps.selected);
    }
  })
)(GameBoard);

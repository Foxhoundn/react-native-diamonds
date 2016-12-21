/* @flow */
import sample from 'lodash/sample';

import getBlanks from './getBlanks';
import { COLOURS } from '../../constants/game';

const fillBlanks: Function = (board: Array<Array<Object>>, gameType: string): Array<*> => {
  let newBoard = [];
  let currentField;

  board.forEach((boardRow, rowIndex) => {
    newBoard.push([]);
    boardRow.forEach(({ field, row, color }, fieldIndex) => {
      currentField = board[rowIndex].find(d => d.field === field);

      if (color === 'transparent') {
        if (row === 1) {
          newBoard[rowIndex].push({
            field: currentField.field,
            row: currentField.row,
            color: sample(COLOURS[gameType]),
          });
        } else {
          const top = newBoard[rowIndex - 1].find(d => d.field === field);

          newBoard[rowIndex].push({
            field: currentField.field,
            row: currentField.row,
            color: top.color,
          });

          newBoard[rowIndex - 1][fieldIndex] = {
            field: top.field,
            row: top.row,
            color: 'transparent',
          }
        }
      } else {
        newBoard[rowIndex].push({
          field: currentField.field,
          row: currentField.row,
          color: currentField.color,
        })
      }
    });
  });

  if (getBlanks(newBoard) !== 0) {
    newBoard = fillBlanks(newBoard, gameType);
  }

  return newBoard;
};

export default fillBlanks;

/* @flow */
import { Vibration } from 'react-native';

const removeHits: Function = (board: Array<Array<Object>>, hits: Array<Object>) => {
  const newBoard = board.slice().reduce((brd, coll) => {
    const boardRow = coll.slice().reduce((rw, field) => {
      const match = hits.find(hit => hit.row === field.row && hit.field === field.field);

      if (match) {
        Vibration.vibrate();

        return [...rw, { ...field, ...{ color: 'transparent' } }];
      }

      return [...rw, field];
    }, []);

    return [...brd, boardRow];
  }, []);

  return newBoard;
};

export default removeHits;

const getBlanks: Function = (board: Array<Array<Object>>): number => {
  let count = 0;

  board.forEach(boardRow => {
    boardRow.forEach(boardField => {
      if (boardField.color && boardField.color === 'transparent') {
        count = count + 1;
      }
    });
  });

  return count;
};

export default getBlanks;

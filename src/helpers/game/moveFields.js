/* @flow */
const moveFields: Function = (
  board: Array<Array<Object>>,
  selected: Object,
  target: Object,
): Array<Array<Object>> => {
  const newBoard = board.reduce((brd, row) => {
    const newBrd = brd;
    const r = row.reduce((rw, field) => {
      const newRow = rw;

      if (field.row === selected.row && field.field === selected.field) {
        newRow.push({
          ...field,
          ...{ color: target.color }
        });
      } else if (field.row === target.row && field.field === target.field) {
        newRow.push({
          ...field,
          ...{ color: selected.color }
        });
      } else {
        newRow.push(field);
      }

      return newRow;
    }, []);

    newBrd.push(r);

    return newBrd;
  }, []);

  return newBoard;
};

export default moveFields;

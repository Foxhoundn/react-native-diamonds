/* @flow */
const isNeighbour: Function = (
  selected: Object,
  target: Object
): boolean => {
  if (
    target.row === selected.row&&
    (target.field === (selected.field + 1) || target.field === (selected.field - 1))
  ) {
    return true;
  }

  return !!(
    target.field === selected.field &&
    (target.row === (selected.row + 1) || target.row === (selected.row - 1))
  );
};

export default isNeighbour;

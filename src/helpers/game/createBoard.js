import _ from 'lodash';
import { COLOURS } from '../../constants/game'

const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const colors = COLOURS;
const max = 3;

const check = (color, row, field, count, sofar) => {
  const top = row - 1 === 0 ? false : row - 1;
  const left = field - 1 === 0 ? false : field - 1;
  const right = field + 1 > 7 ? false : field + 1;

  if (count === max) {
    return max;
  }

  // We are on the first row
  if (!top) {
    let c = count;

    if (left) {
      const leftField = _.find(sofar, { row, field: left });

      if (color === leftField.color) {
        c = check(color, row, leftField.field, count + 1, sofar);

        if (c === max) {
          return max;
        }
      }
    }

    if (right) {
      const rightField = _.find(sofar, {row, field: right});

      if (rightField && color === rightField.color) {
        return check(color, row, rightField.field, c + 1, sofar);
      } else {
        return count;
      }
    }

    return c;
  } else {
    const topField = _.find(sofar, { row: top, field });
    let c = count;

    if (color === topField.color) {
      c = check(color, top, field, count + 1, sofar);

      if (c === max) {
        return max;
      }
    }

    if (right) {
      const rightField = _.find(sofar, {row, field: right});

      if (rightField && color === rightField.color) {
        c = check(color, row, rightField.field, c + 1, sofar);

        if (c === max) {
          return max;
        }
      }
    }

    if (left) {
      const leftField = _.find(sofar, {row, field: left});

      if (color === leftField.color) {
        return check(color, row, leftField.field, c + 1, sofar);
      } else {
        return c;
      }
    } else {
      return c;
    }
  }
};

const clrSelector = (color, cls, count, row, field, sofar) => {
  if (count < max) {
    return color;
  } else {
    const clrs = _.pull(cls, color);
    const clr = _.sample(clrs);
    const cnt = check(clr, row, field, 1, sofar);
    return clrSelector(clr, clrs, cnt);
  }
};

const getColor = (r, field, sofar) => {
  if (r === 1 && (field === 1 || field === 2)) {
    return _.sample(colors);
  } else {
    let clrs = colors.slice();
    let color = _.sample(clrs);
    let count = check(color, r, field, 1, sofar);
    const clr = clrSelector(color, clrs, count, r, field, sofar);
    return clr;
  }
};


const createBoard = () => {
  let mapped = rows.map(row => {
    const r = [];

    for (let i = 1; i <= 7; i++) {
      r.push({
        row,
        field: i,
      });
    }

    return r;
  });

  const newMap = [];

  return mapped.map(row => {
    const r = row.reduce((n, field) => {
      const nA = n.slice();
      const color = getColor(field.row, field.field, newMap);

      nA.push(Object.assign({}, field, {color}));
      newMap.push(Object.assign({}, field, {color}));

      return nA;
    }, []);

    return r;
  })
};

export default createBoard;

import find from 'lodash/find';
import remove from 'lodash/remove';
import defaults from 'lodash/defaults';

const checkForHits = (board) => {
  let hits = [];
  const flattenedData = [];

  board.forEach(row => {
    row.forEach(field => {
      flattenedData.push(field);
    });
  });

  const check = (f, set) => {
    const { field, row, color } = f;
    const left = find(flattenedData, { row, field: field - 1 });
    const right = find(flattenedData, { row, field: field + 1 });
    const top = find(flattenedData, { row: row - 1, field });
    const bottom = find(flattenedData, { row: row + 1, field });

    if (top && top.color === color) {
      if (!find(hits, { row: top.row, field: top.field })) {
        hits.push({
          set,
          row: top.row,
          field: top.field,
          color: top.color,
        });

        check(top, set);
      }
    }

    if (left && left.color === color) {
      if (!find(hits, { row: left.row, field: left.field })) {
        hits.push({
          set,
          row: left.row,
          field: left.field,
          color: left.color,
        });

        check(left, set);
      }
    }

    if (right && right.color === color) {
      if (!find(hits, { row: right.row, field: right.field })) {
        hits.push({
          set,
          row: right.row,
          field: right.field,
          color: right.color,
        });

        check(right, set);
      }
    }

    if (bottom && bottom.color === color) {
      if (!find(hits, { row: bottom.row, field: bottom.field })) {
        hits.push({
          set,
          row: bottom.row,
          field: bottom.field,
          color: bottom.color,
        });

        check(bottom, set);
      }
    }

    return true;
  };

  let i = 1;

  board.forEach(row => {
    row.forEach(field => {
      if (field.color !== 'transparent') {
        check(field, i);
      }
      i = i + 1
    });

    remove(hits, hit => {
      const set = hits.filter(h => h.set === hit.set);

      if (set.length < 3) {
        return true;
      }

      if (set.length === 3) {
        const rows = set.map(s => {
          return s.row;
        });

        const fields = set.map(s => {
          return s.field;
        });

        if (rows.every(r => r === rows[0]) || fields.every(f => f === fields[0])) {
          return false;
        }

        return true;
      }

      return false;
    });
  });

  return hits.length === 0 ? null : hits;
};

export default checkForHits;



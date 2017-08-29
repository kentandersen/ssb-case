import { getFreshExports } from './service';
import { getState, dispatch, subscribe } from './store/store';

import Table from './table/table';

const rootEl = document.querySelector('main');

const { freshFishExport, sortBy, sortOrder } = getState();

const table = new Table({
  rows: freshFishExport,
  sortBy, sortOrder
});

rootEl.appendChild(table.el);

function update(getState) {
  const { freshFishExport, sortBy, sortOrder } = getState();
  table.setProps({
    rows: freshFishExport,
    sortBy, sortOrder
  });
}

subscribe(update);

getFreshExports().then(payload => dispatch({
  type: 'POPULATE',
  payload
}));

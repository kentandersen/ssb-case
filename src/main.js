import { getFreshExports } from './service';
import table from './table/table';
import { getState, dispatch, subscribe } from './store/store';

const rootEl = document.querySelector('main');

function render(getState) {
  const { freshFishExport } = getState();
  rootEl.innerHTML = table({
    rows: freshFishExport
  });
}

render(getState);
subscribe(render);

getFreshExports().then(payload => dispatch({
  type: 'POPULATE',
  payload
}));

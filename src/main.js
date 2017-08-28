import { getFreshExports } from './service';
import table from './table/table';

function render(data) {
  document.querySelector('main').innerHTML = table(data);
}


getFreshExports().then(render);

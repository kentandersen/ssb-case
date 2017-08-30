import delegate from 'delegate';
import { dispatch } from '../store/store';

function getSortOrder(currentSortBy, sortBy, sortOrder) {
  if(currentSortBy === sortBy) {
    return sortOrder === 'ACENDING' ? 'DECENDING' : 'ACENDING';
  } else {
    return 'ACENDING';
  }
}

const defaultProps = {
  sortOrder: 'ACENDING',
  rows: []
};


class Table {
  constructor(props = defaultProps) {
    this.props = props;
    this.el = document.createElement('table');

    this.updateEl();
    this.bindEvents();
  }

  bindEvents() {
    delegate(this.el, 'thead button', 'click', this.handleHeaderClick.bind(this));
  }

  setProps(props) {
    Object.assign(this.props, props);
    this.updateEl();
  }

  updateEl() {
    const html = this.render();
    this.el.innerHTML = html;
  }

  handleHeaderClick({target}) {
    const { sortBy, sortOrder } = this.props;
    const { key:newSortBy } = target.dataset;
    dispatch({
      type: 'SORT',
      payload: {
        sortBy: newSortBy,
        sortOrder: getSortOrder(sortBy, newSortBy, sortOrder)
      }
    });
  }

  renderRow({week, weightInKg, pricePrKg}) {
    return `
      <tr>
        <td>${week.replace('U', ' Uke ')}</td>
        <td class="text-right">${weightInKg.toLocaleString('nb')}</td>
        <td class="text-right">${pricePrKg.toLocaleString('nb')}</td>
      </tr>
    `;
  }

  render() {
    const { rows, sortBy, sortOrder } = this.props;
    const sortByClassName = `sort-by-${sortOrder.toLowerCase()}`;
    const sortByAria = `aria-sort="${sortOrder.toLowerCase()}"`;
    return `
      <thead>
        <tr>
          <th ${sortBy === 'week' ? sortByAria : ''}>
            <button
              data-key="week"
              class="${sortBy === 'week' ? sortByClassName : ''}"
            >
              <span class="visually-hidden">Sorter etter</span> Uke
            </button>
          </th>
          <th ${sortBy === 'weightInKg' ? sortByAria : ''}>
            <button
              data-key="weightInKg"
              class="${sortBy === 'weightInKg' ? sortByClassName : ''}"
            >
              <span class="visually-hidden">Sorter etter</span> Vekt (tonn)
            </button>
          </th>
          <th ${sortBy === 'pricePrKg' ? sortByAria : ''}>
            <button
              data-key="pricePrKg"
              class="${sortBy === 'pricePrKg' ? sortByClassName : ''}"
            >
              <span class="visually-hidden">Sorter etter</span> Kilopris (kr)
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        ${rows.map(this.renderRow).join('')}
      </tbody>
    `;
  }
}

export default Table;

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
        <td>${week}</td>
        <td class="text-right">${weightInKg.toLocaleString('nb')}</td>
        <td class="text-right">${pricePrKg.toLocaleString('nb')}</td>
      </tr>
    `;
  }

  render() {
    const { rows, sortBy, sortOrder } = this.props;
    return `
      <thead>
        <tr>
          <th>
            <button
              data-key="week"
              class="${sortBy === 'week' ? `sort-by-${sortOrder.toLowerCase()}` : ''}"
            >
              Uke
            </button>
          </th>
          <th>
            <button
              data-key="weightInKg"
              class="${sortBy === 'weightInKg' ? `sort-by-${sortOrder.toLowerCase()}` : ''}"
            >
              Vekt (tonn)
            </button>
          </th>
          <th>
            <button
              data-key="pricePrKg"
              class="${sortBy === 'pricePrKg' ? `sort-by-${sortOrder.toLowerCase()}` : ''}"
            >
              Kilopris (kr)
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

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
        <td>${weightInKg}</td>
        <td>${pricePrKg}</td>
      </tr>
    `;
  }

  render() {
    const { rows } = this.props;
    return `
      <thead>
        <tr>
          <th>
            <button data-key="week">Uke</button>
          </th>
          <th>
            <button data-key="weightInKg">Vekt (tonn)</button>
          </th>
          <th>
            <button data-key="pricePrKg">Kilopris (kr)</button>
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

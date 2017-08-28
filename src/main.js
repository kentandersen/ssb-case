import { getFreshExports } from './service';

function renderRow({week, pricePrKg, weight}) {
  return `
    <tr>
      <td>${week}</td>
      <td>${weight}</td>
      <td>${pricePrKg}</td>
    </tr>
  `;
}


function render(data) {
  const html = `
    <table>
      <thead>
        <tr>
          <th>Uke</th>
          <th>Vekt (tonn)</th>
          <th>Kilopris (kr)</th>
        </tr>
      </thead>
      <tbody>
        ${data.map(renderRow).join('')}
      </tbody>
    </table>
  `;

  document.querySelector('main').innerHTML = html;
}


getFreshExports().then(render);

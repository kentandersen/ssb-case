function renderRow({week, pricePrKg, weight}) {
  return `
    <tr>
      <td>${week}</td>
      <td>${weight}</td>
      <td>${pricePrKg}</td>
    </tr>
  `;
}


export default function render(data) {
  return `
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
}

function renderRow({week, weightInKg, pricePrKg}) {
  return `
    <tr>
      <td>${week}</td>
      <td>${weightInKg}</td>
      <td>${pricePrKg}</td>
    </tr>
  `;
}


export default function render({rows}) {
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
        ${rows.map(renderRow).join('')}
      </tbody>
    </table>
  `;
}

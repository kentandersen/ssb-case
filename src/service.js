import JSONstat from 'jsonstat';

// Eksport av oppalen laks, etter varegruppe, tid og statistikkvariabel siste to uker
const url = 'http://data.ssb.no/api/v0/dataset/1120.json?lang=no';

// Eksport av oppalen laks, etter varegruppe, tid og statistikkvariabel fra 2000
// const url = 'http://data.ssb.no/api/v0/dataset/1122.json?lang=no'


function parse(data) {
  const stat = JSONstat(data);
  const dataset = stat.Dataset(0);

  const returnArray = [];
  for (var i = 0; dataset.Dimension(1).Category(i); i++) {
    returnArray.push({
      week: dataset.Dimension(1).Category(i).label,
      weightInKg: dataset.Data([0, i, 0]).value,
      pricePrKg: dataset.Data([0, i, 1]).value
    });
  }

  return returnArray;
}

export function getFreshExports() {

  return fetch(url)
    .then(res => res.json())
    .then(parse);
}

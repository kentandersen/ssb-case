export default function(arr, sortBy, sortOrder) {
  const returnArray = [...arr];

  return returnArray.sort((a, b) => {
    if(sortOrder === 'ACENDING') {
      return a[sortBy] - b[sortBy];
    } else {
      return b[sortBy] - a[sortBy];
    }
  });
}

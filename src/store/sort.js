function compareAcending(sortBy) {
  return (a, b) => {
    const aa = a[sortBy];
    const bb = b[sortBy];

    return typeof aa === 'string' ? aa.localeCompare(bb) : aa - bb;
  }
}

function compareDecending(sortBy) {
  return (a, b) => {
    const aa = a[sortBy];
    const bb = b[sortBy];

    return typeof aa === 'string' ? bb.localeCompare(aa) : bb - aa;
  }
}

export default function(arr, sortBy, sortOrder) {
  const returnArray = [...arr];
  return returnArray.sort(sortOrder === 'ACENDING' ? compareAcending(sortBy) : compareDecending(sortBy));
}

import sort from './sort';

const initialState = {
  sortBy: 'weightInKg',
  sortOrder: 'ACENDING',
  freshFishExport: []
};

function populateTable(state, { payload }) {
  return Object.assign({}, state, {
    freshFishExport: sort(payload, state.sortBy, state.sortOrder)
  });
}

function sortTable(state, { payload }) {
  return Object.assign({}, state, {
    freshFishExport: sort(state.freshFishExport, payload.sortBy, payload.sortOrder)
  });
}

export default function reducer(state = initialState, action) {
   switch (action.type) {
     case 'POPULATE':
      return populateTable(state, action);

     case 'SORT':
       return sortTable(state, action);
     default:
      return state;
   }
 }

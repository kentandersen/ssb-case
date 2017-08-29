const initialState = {
  sortBy: '',
  sortOrder: 'ACENDING',
  freshFishExport: []
};

function populateTable(state, { payload }) {
  return Object.assign({}, state, { freshFishExport: payload });
}

function sortTable(state, { payload }) {
  return Object.assign({}, state);
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

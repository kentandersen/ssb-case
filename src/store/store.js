import reducer from './reducer';


let state = reducer(undefined, { type: 'INIT'});
const subscribers = [];

export function subscribe(fn) {
  subscribers.push(fn);
}

export function getState() {
  return state;
}

export function dispatch(action) {

  if(!action.type) {
    console.error('Action must have type');
  }

  state = reducer(state, action);
  subscribers.forEach(fn => fn(getState));
}

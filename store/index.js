import {createStore} from 'redux';

const counterReducer = (state = { isLogged: null, email: null, name: null }, action) => {
  if (action.type === "LOGGED") {
    return {
      isLogged: true,
      email: action.email,
      name: action.name
    };
  }
  if (action.type === "NOT_LOGGED") {
    return {
      isLogged: false,
      email: null,
      name: null
    };
  }
  return state;
};

const store = createStore(counterReducer);

export default store;

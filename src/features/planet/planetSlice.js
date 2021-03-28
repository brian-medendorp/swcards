import { createSlice } from '@reduxjs/toolkit';
import { handleErrors } from './../../app/http'

export const planetSlice = createSlice({
  name: 'planet',
  initialState: {
    items: []
  },
  reducers: {
    addPlanets: (state, action) => {
      state.items = state.items.concat(action.payload);
    },
    emptyPlanets: state => {
      state.items = [null]; // planets numbered sequentially starting from 1, so array index 0 should be blank
    }
  },
});

export const { addPlanets, emptyPlanets } = planetSlice.actions;

// Asynchronously fecth the lisf of planets from the API using "thunk"
export const fetchPlanets = items => dispatch => {
  dispatch(emptyPlanets()); // prevent duplictaes from hot-loading

  // internal function to handle getting next page results
  // NOTE: there's probably a much better solution for this behavior, but this works for now
  function fetchNext(url) {
    return fetch(url)
      .then(handleErrors)
      .then(response => response.json())
      .then(json => {
        dispatch(addPlanets(json.results));
        if (json.next) {
          fetchNext(json.next)
        }
      })
      .catch(error => console.log('Failed to fetch Planets ('+url+'): ', error))
  }

  return fetchNext("https://swapi.dev/api/planets");
};

export default planetSlice.reducer;

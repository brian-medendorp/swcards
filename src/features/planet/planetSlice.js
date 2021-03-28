import { createSlice } from '@reduxjs/toolkit';

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

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const fetchPlanets = items => dispatch => {
  dispatch(emptyPlanets()); // prevent duplictaes from hot-loading

  // internal function to handle getting next page results
  // NOTE: there's probably a much better solution for this behavior, but this works for now
  function fetchNext(url) {
    //console.log("fetchNext", url);
    return fetch(url)
      // TODO: add error handling
      .then(response => response.json())
      .then(json => {
        dispatch(addPlanets(json.results));
        if (json.next) {
          fetchNext(json.next)
        }
    });
  }

  return fetchNext("https://swapi.dev/api/planets");
};

// helper function to get the id from the URL
// NOTE: probably a better place to put this, and could make it more generic
export const extractId = url => {
  // url should be of form: http://swapi.dev/api/planets/2/
  var tokens = String(url).split('/');
  return Number.parseInt(tokens[5]);
}

export default planetSlice.reducer;

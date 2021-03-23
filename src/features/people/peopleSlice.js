import { createSlice } from '@reduxjs/toolkit';

export const peopleSlice = createSlice({
  name: 'people',
  initialState: {
    //value: 0,
    items: [],
    loading: false,
    error: null
  },
  reducers: {
    //increment: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
    //  state.value += 1;
    //},
    //decrement: state => {
    //  state.value -= 1;
    //},
    //incrementByAmount: (state, action) => {
    //  state.value += action.payload;
    //},
    fetchPeoplePending: state => {
      state.loading = true;
    },
    fetchPeopleFinished: state => {
      state.loading = false;
    },
    fetchPeopleError: (state, action) => {
      state.items = [];
      state.error = action.error;
      state.loading = false;
    },
    addPeople: (state, action) => {
      state.items = state.items.concat(action.payload);
    },
    emptyPeople: state => {
      state.items = [];
    }
  },
});

export const { fetchPeoplePending, fetchPeopleFinished, fetchPeopleError, addPeople, emptyPeople } = peopleSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const fetchPeople = items => dispatch => {
  dispatch(emptyPeople()); // prevent duplictaes from hot-loading
  dispatch(fetchPeoplePending());

  // internal function to handle getting next page results
  // NOTE: there's probably a much better solution for this behavior, but this works for now
  function fetchNext(url) {
    //console.log("fetchNext", url);
    return fetch(url)
      // TODO: add error handling
      .then(response => response.json())
      .then(json => {
        dispatch(addPeople(json.results));
        if (json.next) {
          fetchNext(json.next)
        } else {
          dispatch(fetchPeopleFinished());
        }
    });
  }

  return fetchNext("https://swapi.dev/api/people");
};

export default peopleSlice.reducer;

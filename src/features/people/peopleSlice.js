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
    fetchPeopleSuccess: (state, action) => {
      state.items = action.payload;
      state.loading = false;
    },
    fetchPeopleError: (state, action) => {
      state.items = [];
      state.error = action.error;
      state.loading = false;
    }
  },
});

export const { fetchPeoplePending, fetchPeopleSuccess, fetchPeopleError } = peopleSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const fetchPeople = items => dispatch => {
  dispatch(fetchPeoplePending());
  return fetch("https://swapi.dev/api/people")
    // TODO: add error handling
    .then(response => response.json())
    .then(json => {
      dispatch(fetchPeopleSuccess(json.results))
  });
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
//export const selectCount = state => state.counter.value;

export default peopleSlice.reducer;

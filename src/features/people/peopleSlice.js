import { createSlice } from '@reduxjs/toolkit';

export const peopleSlice = createSlice({
  name: 'people',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {
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

// Asynchronously fecth the lisf ot people from the API using "thunk"
export const fetchPeople = items => dispatch => {
  dispatch(emptyPeople()); // prevent duplictaes from hot-loading
  dispatch(fetchPeoplePending());

  // internal function to handle getting next page results
  // NOTE: there's probably a much better solution for this behavior, but this works for now
  function fetchNext(url) {
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

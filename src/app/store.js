import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import peopleReducer from '../features/people/peopleSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    people: peopleReducer,
  },
});

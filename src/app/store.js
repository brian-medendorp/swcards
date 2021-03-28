import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import peopleReducer from '../features/people/peopleSlice';
import planetReducer from '../features/planet/planetSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    people: peopleReducer,
    planet: planetReducer
  },
});

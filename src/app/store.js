import { configureStore } from '@reduxjs/toolkit';
import peopleReducer from '../features/people/peopleSlice';
import planetReducer from '../features/planet/planetSlice';

export default configureStore({
  reducer: {
    people: peopleReducer,
    planet: planetReducer
  },
});

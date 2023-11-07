import { configureStore } from "@reduxjs/toolkit";
import profileRducer from './profileSlice';

export default configureStore ( {
    reducer: {
        profile: profileRducer,
    },
});
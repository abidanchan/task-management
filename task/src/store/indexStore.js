import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
const store = configureStore({
  reducer: {
    auth: authReducer, // Auth reducer added here
    // Define your reducers here
  },
  // Other store configuration goes here
});

export default store;

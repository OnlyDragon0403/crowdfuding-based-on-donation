import { configureStore } from '@reduxjs/toolkit'    
// automatically added the thunk middleware
// It automatically added more middleware to check for common mistakes like accidentally mutating the state
// It automatically set up the Redux DevTools Extension connection

import tronReducer from './slices/tron'
import filtersReducer from './slices/filter'

export default configureStore({
  reducer: {
    tron: tronReducer,
    filters: filtersReducer
  }
})

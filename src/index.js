import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import messageReducer from './reducers/messageReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import allUsersReducer from './reducers/allUsersReducer'

const rootReducer = combineReducers({
  message: messageReducer,
  blogs: blogReducer,
  user: userReducer,
  allUsers: allUsersReducer
})
const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(ReduxThunk)
  )
)

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root'))
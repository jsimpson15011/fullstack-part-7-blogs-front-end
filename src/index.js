import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import{ Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import messageReducer from './reducers/messageReducer'

const rootReducer = combineReducers({
  message: messageReducer
})
const store = createStore(
  rootReducer,
  applyMiddleware(ReduxThunk)
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'))
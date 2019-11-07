import userService from '../services/users'

export const getAllUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'GET_ALL_USERS',
      data: {
        users
      }
    })
  }
}

const allUsersReducer = (state = [], action) => {
  switch (action.type) {
  case 'GET_ALL_USERS':
    return action.data.users
  default:
    return state
  }
}

export default allUsersReducer
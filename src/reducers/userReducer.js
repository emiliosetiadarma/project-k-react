import { Map } from 'immutable'
import {
  EDIT_BEGIN,
  EDIT_SUCCESS,
  EDIT_FAILURE,
  GET_BEGIN,
  GET_SUCCESS,
  GET_FAILURE,
} from './../actions/userActions'

const initialState = Map({
  user: null,
  createLoading: false,
  createError: false,
  editLoading: false,
  editError: false,
  getLoading: false,
  getError: false,
  removeLoading: false,
  removeError: false,
})

export default function userReducer(state=initialState, action) {
  switch(action.type) {
  case EDIT_BEGIN:
    return state.merge({
      editLoading: true
    })

  case EDIT_SUCCESS:
    return state.merge({
      editLoading: false,
      user: action.payload
    })

  case EDIT_FAILURE:
    return state.merge({
      editLoading: false
    })

  case GET_BEGIN:
    return state.merge({
      getLoading: true
    })

  case GET_SUCCESS:
    return state.merge({
      getLoading: false,
      user: action.payload
    })

  case GET_FAILURE:
    return state.merge({
      getLoading: false
    })

  default:
    return state
  }
}

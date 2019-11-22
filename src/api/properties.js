import axios from 'axios'

import { BACKEND_BASE_URL as BASE_URL } from './../constants'
import {
  createBegin,
  createSuccess,
  createFailure,
  editBegin,
  editSuccess,
  editFailure,
  getBegin,
  getSuccess,
  getFailure,
  removeBegin,
  removeSuccess,
  removeFailure,
} from './../actions/propertyActions'

export function create(data) {
  return dispatch => {
    dispatch(createBegin())

    return axios.post(`${BASE_URL}/api/v1/properties`, data).then(
      res => dispatch(createSuccess(res.data)),
      err => dispatch(createFailure(err))
    )
  }
}

export function edit(data) {
  return dispatch => {
    dispatch(editBegin())

    return axios.put(`${BASE_URL}/api/v1/properties/${data.id}`, data).then(
      res => dispatch(editSuccess(res.data)),
      err => dispatch(editFailure(err))
    )
  }
}

export function get(data) {
  return dispatch => {
    dispatch(getBegin())

    return axios.get(`${BASE_URL}/api/v1/properties/${data}`).then(
      res => dispatch(getSuccess(res.data)),
      err => dispatch(getFailure(err))
    )
  }
}

export function remove(data) {
  return dispatch => {
    dispatch(removeBegin())

    return axios.post(`${BASE_URL}/api/v1/properties`, data).then(
      res => dispatch(removeSuccess(res.data)),
      err => dispatch(removeFailure(err))
    )
  }
}
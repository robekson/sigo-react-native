import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  funcionarioRequest: ['funcionarioId'],
  funcionarioAllRequest: ['options'],
  funcionarioUpdateRequest: ['funcionario'],
  funcionarioSearchRequest: ['query'],
  funcionarioDeleteRequest: ['funcionarioId'],

  funcionarioSuccess: ['funcionario'],
  funcionarioAllSuccess: ['funcionarios', 'headers'],
  funcionarioUpdateSuccess: ['funcionario'],
  funcionarioSearchSuccess: ['funcionarios'],
  funcionarioDeleteSuccess: [],

  funcionarioFailure: ['error'],
  funcionarioAllFailure: ['error'],
  funcionarioUpdateFailure: ['error'],
  funcionarioSearchFailure: ['error'],
  funcionarioDeleteFailure: ['error'],

  funcionarioReset: [],
})

export const FuncionarioTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  searching: null,
  deleting: null,
  funcionario: null,
  funcionarios: [],
  errorOne: null,
  errorAll: null,
  errorUpdating: null,
  errorSearching: null,
  errorDeleting: null,
})

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) =>
  state.merge({
    fetchingOne: true,
    errorOne: false,
    funcionario: null,
  })

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    errorAll: false,
  })

// request to update from an api
export const updateRequest = (state) =>
  state.merge({
    updating: true,
  })
// request to search from an api
export const searchRequest = (state) =>
  state.merge({
    searching: true,
  })
// request to delete from an api
export const deleteRequest = (state) =>
  state.merge({
    deleting: true,
  })

// successful api lookup for single entity
export const success = (state, action) => {
  const { funcionario } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    funcionario,
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { funcionarios } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    funcionarios,
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { funcionario } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    funcionario,
  })
}
// successful api search
export const searchSuccess = (state, action) => {
  const { funcionarios } = action
  return state.merge({
    searching: false,
    errorSearching: null,
    funcionarios,
  })
}
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    funcionario: null,
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    funcionario: null,
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    funcionarios: [],
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    funcionario: state.funcionario,
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    funcionario: state.funcionario,
  })
}
// Something went wrong searching the entities.
export const searchFailure = (state, action) => {
  const { error } = action
  return state.merge({
    searching: false,
    errorSearching: error,
    funcionarios: [],
  })
}

export const reset = (state) => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FUNCIONARIO_REQUEST]: request,
  [Types.FUNCIONARIO_ALL_REQUEST]: allRequest,
  [Types.FUNCIONARIO_UPDATE_REQUEST]: updateRequest,
  [Types.FUNCIONARIO_SEARCH_REQUEST]: searchRequest,
  [Types.FUNCIONARIO_DELETE_REQUEST]: deleteRequest,

  [Types.FUNCIONARIO_SUCCESS]: success,
  [Types.FUNCIONARIO_ALL_SUCCESS]: allSuccess,
  [Types.FUNCIONARIO_UPDATE_SUCCESS]: updateSuccess,
  [Types.FUNCIONARIO_SEARCH_SUCCESS]: searchSuccess,
  [Types.FUNCIONARIO_DELETE_SUCCESS]: deleteSuccess,

  [Types.FUNCIONARIO_FAILURE]: failure,
  [Types.FUNCIONARIO_ALL_FAILURE]: allFailure,
  [Types.FUNCIONARIO_UPDATE_FAILURE]: updateFailure,
  [Types.FUNCIONARIO_SEARCH_FAILURE]: searchFailure,
  [Types.FUNCIONARIO_DELETE_FAILURE]: deleteFailure,
  [Types.FUNCIONARIO_RESET]: reset,
})

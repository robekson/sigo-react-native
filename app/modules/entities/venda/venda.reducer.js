import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  vendaRequest: ['vendaId'],
  vendaAllRequest: ['options'],
  vendaUpdateRequest: ['venda'],
  vendaSearchRequest: ['query'],
  vendaDeleteRequest: ['vendaId'],

  vendaSuccess: ['venda'],
  vendaAllSuccess: ['vendas', 'headers'],
  vendaUpdateSuccess: ['venda'],
  vendaSearchSuccess: ['vendas'],
  vendaDeleteSuccess: [],

  vendaFailure: ['error'],
  vendaAllFailure: ['error'],
  vendaUpdateFailure: ['error'],
  vendaSearchFailure: ['error'],
  vendaDeleteFailure: ['error'],

  vendaReset: [],
})

export const VendaTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  searching: null,
  deleting: null,
  venda: null,
  vendas: [],
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
    venda: null,
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
  const { venda } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    venda,
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { vendas } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    vendas,
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { venda } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    venda,
  })
}
// successful api search
export const searchSuccess = (state, action) => {
  const { vendas } = action
  return state.merge({
    searching: false,
    errorSearching: null,
    vendas,
  })
}
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    venda: null,
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    venda: null,
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    vendas: [],
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    venda: state.venda,
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    venda: state.venda,
  })
}
// Something went wrong searching the entities.
export const searchFailure = (state, action) => {
  const { error } = action
  return state.merge({
    searching: false,
    errorSearching: error,
    vendas: [],
  })
}

export const reset = (state) => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.VENDA_REQUEST]: request,
  [Types.VENDA_ALL_REQUEST]: allRequest,
  [Types.VENDA_UPDATE_REQUEST]: updateRequest,
  [Types.VENDA_SEARCH_REQUEST]: searchRequest,
  [Types.VENDA_DELETE_REQUEST]: deleteRequest,

  [Types.VENDA_SUCCESS]: success,
  [Types.VENDA_ALL_SUCCESS]: allSuccess,
  [Types.VENDA_UPDATE_SUCCESS]: updateSuccess,
  [Types.VENDA_SEARCH_SUCCESS]: searchSuccess,
  [Types.VENDA_DELETE_SUCCESS]: deleteSuccess,

  [Types.VENDA_FAILURE]: failure,
  [Types.VENDA_ALL_FAILURE]: allFailure,
  [Types.VENDA_UPDATE_FAILURE]: updateFailure,
  [Types.VENDA_SEARCH_FAILURE]: searchFailure,
  [Types.VENDA_DELETE_FAILURE]: deleteFailure,
  [Types.VENDA_RESET]: reset,
})

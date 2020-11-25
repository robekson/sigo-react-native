import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import VendaActions from './venda.reducer'
import { localDateToJsDate } from '../../../shared/util/date-transforms'

export function* getVenda(api, action) {
  const { vendaId } = action
  // make the call to the api
  const apiCall = call(api.getVenda, vendaId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data)
    yield put(VendaActions.vendaSuccess(response.data))
  } else {
    yield put(VendaActions.vendaFailure(response.data))
  }
}

export function* getVendas(api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getVendas, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(VendaActions.vendaAllSuccess(response.data, response.headers))
  } else {
    yield put(VendaActions.vendaAllFailure(response.data))
  }
}

export function* updateVenda(api, action) {
  const { venda } = action
  // make the call to the api
  const idIsNotNull = !!venda.id
  const apiCall = call(idIsNotNull ? api.updateVenda : api.createVenda, venda)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data)
    yield put(VendaActions.vendaUpdateSuccess(response.data))
  } else {
    yield put(VendaActions.vendaUpdateFailure(response.data))
  }
}

export function* searchVendas(api, action) {
  const { query } = action
  // make the call to the api
  const apiCall = call(api.searchVendas, query)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(VendaActions.vendaSearchSuccess(response.data))
  } else {
    yield put(VendaActions.vendaSearchFailure(response.data))
  }
}
export function* deleteVenda(api, action) {
  const { vendaId } = action
  // make the call to the api
  const apiCall = call(api.deleteVenda, vendaId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(VendaActions.vendaDeleteSuccess())
  } else {
    yield put(VendaActions.vendaDeleteFailure(response.data))
  }
}
function mapDateFields(data) {
  if (data.data) {
    data.data = localDateToJsDate(data.data)
  }
  if (data.dataEntrega) {
    data.dataEntrega = localDateToJsDate(data.dataEntrega)
  }
  return data
}

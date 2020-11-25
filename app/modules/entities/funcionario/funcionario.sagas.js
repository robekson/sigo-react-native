import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import FuncionarioActions from './funcionario.reducer'
import { localDateToJsDate } from '../../../shared/util/date-transforms'

export function* getFuncionario(api, action) {
  const { funcionarioId } = action
  // make the call to the api
  const apiCall = call(api.getFuncionario, funcionarioId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data)
    yield put(FuncionarioActions.funcionarioSuccess(response.data))
  } else {
    yield put(FuncionarioActions.funcionarioFailure(response.data))
  }
}

export function* getFuncionarios(api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getFuncionarios, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(FuncionarioActions.funcionarioAllSuccess(response.data, response.headers))
  } else {
    yield put(FuncionarioActions.funcionarioAllFailure(response.data))
  }
}

export function* updateFuncionario(api, action) {
  const { funcionario } = action
  // make the call to the api
  const idIsNotNull = !!funcionario.id
  const apiCall = call(idIsNotNull ? api.updateFuncionario : api.createFuncionario, funcionario)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data)
    yield put(FuncionarioActions.funcionarioUpdateSuccess(response.data))
  } else {
    yield put(FuncionarioActions.funcionarioUpdateFailure(response.data))
  }
}

export function* searchFuncionarios(api, action) {
  const { query } = action
  // make the call to the api
  const apiCall = call(api.searchFuncionarios, query)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(FuncionarioActions.funcionarioSearchSuccess(response.data))
  } else {
    yield put(FuncionarioActions.funcionarioSearchFailure(response.data))
  }
}
export function* deleteFuncionario(api, action) {
  const { funcionarioId } = action
  // make the call to the api
  const apiCall = call(api.deleteFuncionario, funcionarioId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(FuncionarioActions.funcionarioDeleteSuccess())
  } else {
    yield put(FuncionarioActions.funcionarioDeleteFailure(response.data))
  }
}
function mapDateFields(data) {
  if (data.dataNascimento) {
    data.dataNascimento = localDateToJsDate(data.dataNascimento)
  }
  if (data.dataAdmissao) {
    data.dataAdmissao = localDateToJsDate(data.dataAdmissao)
  }
  return data
}

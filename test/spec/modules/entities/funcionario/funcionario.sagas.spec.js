import { put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import {
  getFuncionario,
  getFuncionarios,
  updateFuncionario,
  deleteFuncionario,
  searchFuncionarios,
} from '../../../../../app/modules/entities/funcionario/funcionario.sagas'
import FuncionarioActions from '../../../../../app/modules/entities/funcionario/funcionario.reducer'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getFuncionario(1)
  const step = stepper(getFuncionario(FixtureAPI, { funcionarioId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(FuncionarioActions.funcionarioSuccess({ id: 1 })))
})

test('get failure path', () => {
  const response = { ok: false }
  const step = stepper(getFuncionario(FixtureAPI, { funcionarioId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(FuncionarioActions.funcionarioFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getFuncionarios()
  const step = stepper(getFuncionarios(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(FuncionarioActions.funcionarioAllSuccess([{ id: 1 }, { id: 2 }])))
})

test('getAll failure path', () => {
  const response = { ok: false }
  const step = stepper(getFuncionarios(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(FuncionarioActions.funcionarioAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateFuncionario({ id: 1 })
  const step = stepper(updateFuncionario(FixtureAPI, { funcionario: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(FuncionarioActions.funcionarioUpdateSuccess({ id: 1 })))
})

test('update failure path', () => {
  const response = { ok: false }
  const step = stepper(updateFuncionario(FixtureAPI, { funcionario: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(FuncionarioActions.funcionarioUpdateFailure()))
})

test('search success path', () => {
  const response = FixtureAPI.searchFuncionarios()
  const step = stepper(searchFuncionarios(FixtureAPI, '*'))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(FuncionarioActions.funcionarioSearchSuccess([{ id: 1 }, { id: 2 }])))
})

test('search failure path', () => {
  const response = { ok: false }
  const step = stepper(searchFuncionarios(FixtureAPI, '*'))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(FuncionarioActions.funcionarioSearchFailure()))
})
test('delete success path', () => {
  const response = FixtureAPI.deleteFuncionario({ id: 1 })
  const step = stepper(deleteFuncionario(FixtureAPI, { funcionarioId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(FuncionarioActions.funcionarioDeleteSuccess({ id: 1 })))
})

test('delete failure path', () => {
  const response = { ok: false }
  const step = stepper(deleteFuncionario(FixtureAPI, { funcionarioId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(FuncionarioActions.funcionarioDeleteFailure()))
})

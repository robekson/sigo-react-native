import { put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import { getVenda, getVendas, updateVenda, deleteVenda, searchVendas } from '../../../../../app/modules/entities/venda/venda.sagas'
import VendaActions from '../../../../../app/modules/entities/venda/venda.reducer'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getVenda(1)
  const step = stepper(getVenda(FixtureAPI, { vendaId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(VendaActions.vendaSuccess({ id: 1 })))
})

test('get failure path', () => {
  const response = { ok: false }
  const step = stepper(getVenda(FixtureAPI, { vendaId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(VendaActions.vendaFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getVendas()
  const step = stepper(getVendas(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(VendaActions.vendaAllSuccess([{ id: 1 }, { id: 2 }])))
})

test('getAll failure path', () => {
  const response = { ok: false }
  const step = stepper(getVendas(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(VendaActions.vendaAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateVenda({ id: 1 })
  const step = stepper(updateVenda(FixtureAPI, { venda: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(VendaActions.vendaUpdateSuccess({ id: 1 })))
})

test('update failure path', () => {
  const response = { ok: false }
  const step = stepper(updateVenda(FixtureAPI, { venda: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(VendaActions.vendaUpdateFailure()))
})

test('search success path', () => {
  const response = FixtureAPI.searchVendas()
  const step = stepper(searchVendas(FixtureAPI, '*'))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(VendaActions.vendaSearchSuccess([{ id: 1 }, { id: 2 }])))
})

test('search failure path', () => {
  const response = { ok: false }
  const step = stepper(searchVendas(FixtureAPI, '*'))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(VendaActions.vendaSearchFailure()))
})
test('delete success path', () => {
  const response = FixtureAPI.deleteVenda({ id: 1 })
  const step = stepper(deleteVenda(FixtureAPI, { vendaId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(VendaActions.vendaDeleteSuccess({ id: 1 })))
})

test('delete failure path', () => {
  const response = { ok: false }
  const step = stepper(deleteVenda(FixtureAPI, { vendaId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(VendaActions.vendaDeleteFailure()))
})

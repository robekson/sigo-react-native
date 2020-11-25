import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/venda/venda.reducer'

test('attempt retrieving a single venda', () => {
  const state = reducer(INITIAL_STATE, Actions.vendaRequest({ id: 1 }))

  expect(state.fetchingOne).toBe(true)
  expect(state.venda).toBe(null)
})

test('attempt retrieving a list of venda', () => {
  const state = reducer(INITIAL_STATE, Actions.vendaAllRequest({ id: 1 }))

  expect(state.fetchingAll).toBe(true)
  expect(state.vendas).toEqual([])
})

test('attempt updating a venda', () => {
  const state = reducer(INITIAL_STATE, Actions.vendaUpdateRequest({ id: 1 }))

  expect(state.updating).toBe(true)
})
test('attempt searching a venda', () => {
  const state = reducer(INITIAL_STATE, Actions.vendaSearchRequest(1))

  expect(state.searching).toBe(true)
})
test('attempt to deleting a venda', () => {
  const state = reducer(INITIAL_STATE, Actions.vendaDeleteRequest({ id: 1 }))

  expect(state.deleting).toBe(true)
})

test('success retrieving a venda', () => {
  const state = reducer(INITIAL_STATE, Actions.vendaSuccess({ id: 1 }))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.venda).toEqual({ id: 1 })
})

test('success retrieving a list of venda', () => {
  const state = reducer(INITIAL_STATE, Actions.vendaAllSuccess([{ id: 1 }, { id: 2 }]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.vendas).toEqual([{ id: 1 }, { id: 2 }])
})

test('success updating a venda', () => {
  const state = reducer(INITIAL_STATE, Actions.vendaUpdateSuccess({ id: 1 }))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.venda).toEqual({ id: 1 })
})
test('success searching a venda', () => {
  const state = reducer(INITIAL_STATE, Actions.vendaSearchSuccess({ id: 1 }))

  expect(state.searching).toBe(false)
  expect(state.errorSearching).toBe(null)
  expect(state.vendas).toEqual({ id: 1 })
})
test('success deleting a venda', () => {
  const state = reducer(INITIAL_STATE, Actions.vendaDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.venda).toEqual(null)
})

test('failure retrieving a venda', () => {
  const state = reducer(INITIAL_STATE, Actions.vendaFailure({ error: 'Not found' }))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({ error: 'Not found' })
  expect(state.venda).toEqual(null)
})

test('failure retrieving a list of venda', () => {
  const state = reducer(INITIAL_STATE, Actions.vendaAllFailure({ error: 'Not found' }))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({ error: 'Not found' })
  expect(state.vendas).toEqual([])
})

test('failure updating a venda', () => {
  const state = reducer(INITIAL_STATE, Actions.vendaUpdateFailure({ error: 'Not found' }))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({ error: 'Not found' })
  expect(state.venda).toEqual(INITIAL_STATE.venda)
})
test('failure searching a venda', () => {
  const state = reducer(INITIAL_STATE, Actions.vendaSearchFailure({ error: 'Not found' }))

  expect(state.searching).toBe(false)
  expect(state.errorSearching).toEqual({ error: 'Not found' })
  expect(state.vendas).toEqual([])
})
test('failure deleting a venda', () => {
  const state = reducer(INITIAL_STATE, Actions.vendaDeleteFailure({ error: 'Not found' }))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({ error: 'Not found' })
  expect(state.venda).toEqual(INITIAL_STATE.venda)
})

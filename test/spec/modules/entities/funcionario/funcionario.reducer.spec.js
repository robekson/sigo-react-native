import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/funcionario/funcionario.reducer'

test('attempt retrieving a single funcionario', () => {
  const state = reducer(INITIAL_STATE, Actions.funcionarioRequest({ id: 1 }))

  expect(state.fetchingOne).toBe(true)
  expect(state.funcionario).toBe(null)
})

test('attempt retrieving a list of funcionario', () => {
  const state = reducer(INITIAL_STATE, Actions.funcionarioAllRequest({ id: 1 }))

  expect(state.fetchingAll).toBe(true)
  expect(state.funcionarios).toEqual([])
})

test('attempt updating a funcionario', () => {
  const state = reducer(INITIAL_STATE, Actions.funcionarioUpdateRequest({ id: 1 }))

  expect(state.updating).toBe(true)
})
test('attempt searching a funcionario', () => {
  const state = reducer(INITIAL_STATE, Actions.funcionarioSearchRequest(1))

  expect(state.searching).toBe(true)
})
test('attempt to deleting a funcionario', () => {
  const state = reducer(INITIAL_STATE, Actions.funcionarioDeleteRequest({ id: 1 }))

  expect(state.deleting).toBe(true)
})

test('success retrieving a funcionario', () => {
  const state = reducer(INITIAL_STATE, Actions.funcionarioSuccess({ id: 1 }))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.funcionario).toEqual({ id: 1 })
})

test('success retrieving a list of funcionario', () => {
  const state = reducer(INITIAL_STATE, Actions.funcionarioAllSuccess([{ id: 1 }, { id: 2 }]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.funcionarios).toEqual([{ id: 1 }, { id: 2 }])
})

test('success updating a funcionario', () => {
  const state = reducer(INITIAL_STATE, Actions.funcionarioUpdateSuccess({ id: 1 }))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.funcionario).toEqual({ id: 1 })
})
test('success searching a funcionario', () => {
  const state = reducer(INITIAL_STATE, Actions.funcionarioSearchSuccess({ id: 1 }))

  expect(state.searching).toBe(false)
  expect(state.errorSearching).toBe(null)
  expect(state.funcionarios).toEqual({ id: 1 })
})
test('success deleting a funcionario', () => {
  const state = reducer(INITIAL_STATE, Actions.funcionarioDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.funcionario).toEqual(null)
})

test('failure retrieving a funcionario', () => {
  const state = reducer(INITIAL_STATE, Actions.funcionarioFailure({ error: 'Not found' }))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({ error: 'Not found' })
  expect(state.funcionario).toEqual(null)
})

test('failure retrieving a list of funcionario', () => {
  const state = reducer(INITIAL_STATE, Actions.funcionarioAllFailure({ error: 'Not found' }))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({ error: 'Not found' })
  expect(state.funcionarios).toEqual([])
})

test('failure updating a funcionario', () => {
  const state = reducer(INITIAL_STATE, Actions.funcionarioUpdateFailure({ error: 'Not found' }))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({ error: 'Not found' })
  expect(state.funcionario).toEqual(INITIAL_STATE.funcionario)
})
test('failure searching a funcionario', () => {
  const state = reducer(INITIAL_STATE, Actions.funcionarioSearchFailure({ error: 'Not found' }))

  expect(state.searching).toBe(false)
  expect(state.errorSearching).toEqual({ error: 'Not found' })
  expect(state.funcionarios).toEqual([])
})
test('failure deleting a funcionario', () => {
  const state = reducer(INITIAL_STATE, Actions.funcionarioDeleteFailure({ error: 'Not found' }))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({ error: 'Not found' })
  expect(state.funcionario).toEqual(INITIAL_STATE.funcionario)
})

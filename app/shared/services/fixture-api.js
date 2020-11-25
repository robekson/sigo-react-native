export default {
  // Functions return fixtures

  // entity fixtures
  updateVenda: (venda) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-venda.json'),
    }
  },
  getVendas: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-vendas.json'),
    }
  },
  getVenda: (vendaId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-venda.json'),
    }
  },
  deleteVenda: (vendaId) => {
    return {
      ok: true,
    }
  },
  searchVendas: (query) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/search-vendas.json'),
    }
  },
  updateFuncionario: (funcionario) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-funcionario.json'),
    }
  },
  getFuncionarios: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-funcionarios.json'),
    }
  },
  getFuncionario: (funcionarioId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-funcionario.json'),
    }
  },
  deleteFuncionario: (funcionarioId) => {
    return {
      ok: true,
    }
  },
  searchFuncionarios: (query) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/search-funcionarios.json'),
    }
  },
  // ignite-jhipster-api-fixture-needle

  // user fixtures
  updateUser: (user) => {
    return {
      ok: true,
      data: require('../fixtures/update-user.json'),
    }
  },
  getUsers: () => {
    return {
      ok: true,
      data: require('../fixtures/get-users.json'),
    }
  },
  getUser: (userId) => {
    return {
      ok: true,
      data: require('../fixtures/get-user.json'),
    }
  },
  deleteUser: (userId) => {
    return {
      ok: true,
    }
  },
  // auth fixtures
  setAuthToken: () => {},
  removeAuthToken: () => {},
  login: (authObj) => {
    if (authObj.username === 'user' && authObj.password === 'user') {
      return {
        ok: true,
        data: require('../fixtures/login.json'),
      }
    } else {
      return {
        ok: false,
        status: 400,
        data: 'Invalid credentials',
      }
    }
  },
  register: ({ user }) => {
    if (user === 'user') {
      return {
        ok: true,
      }
    } else {
      return {
        ok: false,
        data: {
          title: 'Invalid email',
        },
      }
    }
  },
  forgotPassword: ({ email }) => {
    if (email === 'valid@gmail.com') {
      return {
        ok: true,
      }
    } else {
      return {
        ok: false,
        data: 'Invalid email',
      }
    }
  },
  getAccount: () => {
    return {
      ok: true,
      status: 200,
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
      data: require('../fixtures/get-account.json'),
    }
  },
  updateAccount: () => {
    return {
      ok: true,
    }
  },
  changePassword: ({ currentPassword }) => {
    if (currentPassword === 'valid-password') {
      return {
        ok: true,
      }
    } else {
      return {
        ok: false,
        data: 'Password error',
      }
    }
  },
}

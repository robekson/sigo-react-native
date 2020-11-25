import { AppState, Linking } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'
import React from 'react'
import { Images } from '../shared/themes'

import createStore from '../shared/reducers'
import Colors from '../shared/themes/colors'
import '../config/reactotron-config'
import AccountActions from '../shared/reducers/account.reducer'

import LoginScreen from '../modules/login/login-screen'
import LaunchScreen from '../modules/home/launch-screen'
import DrawerContent from './drawer/drawer-content'
import SettingsScreen from '../modules/account/settings/settings-screen'
import RegisterScreen from '../modules/account/register/register-screen'
import ForgotPasswordScreen from '../modules/account/password-reset/forgot-password-screen'
import ChangePasswordScreen from '../modules/account/password/change-password-screen'
import EntitiesScreen from '../modules/entities/entities-screen'
import StorybookScreen from '../../storybook'
import VendaEntityScreen from '../modules/entities/venda/venda-entity-screen'
import VendaEntityDetailScreen from '../modules/entities/venda/venda-entity-detail-screen'
import VendaEntityEditScreen from '../modules/entities/venda/venda-entity-edit-screen'
import FuncionarioEntityScreen from '../modules/entities/funcionario/funcionario-entity-screen'
import FuncionarioEntityDetailScreen from '../modules/entities/funcionario/funcionario-entity-detail-screen'
import FuncionarioEntityEditScreen from '../modules/entities/funcionario/funcionario-entity-edit-screen'
// ignite-jhipster-navigation-import-needle

export const LOGIN_SCREEN = 'nav.LoginScreen'
export const REGISTER_SCREEN = 'nav.RegisterScreen'
export const FORGOT_PASSWORD_SCREEN = 'nav.ForgotPasswordScreen'
export const CHANGE_PASSWORD_SCREEN = 'nav.ChangePasswordScreen'
export const SETTINGS_SCREEN = 'nav.SettingsScreen'
export const LAUNCH_SCREEN = 'nav.LaunchScreen'
export const DRAWER_CONTENT = 'nav.DrawerContent'
export const ENTITIES_SCREEN = 'nav.EntitiesScreen'
export const STORYBOOK_SCREEN = 'nav.StorybookScreen'
export const VENDA_ENTITY_SCREEN = 'nav.VendaEntityScreen'
export const VENDA_ENTITY_DETAIL_SCREEN = 'nav.VendaEntityDetailScreen'
export const VENDA_ENTITY_EDIT_SCREEN = 'nav.VendaEntityEditScreen'
export const FUNCIONARIO_ENTITY_SCREEN = 'nav.FuncionarioEntityScreen'
export const FUNCIONARIO_ENTITY_DETAIL_SCREEN = 'nav.FuncionarioEntityDetailScreen'
export const FUNCIONARIO_ENTITY_EDIT_SCREEN = 'nav.FuncionarioEntityEditScreen'
// ignite-jhipster-navigation-declaration-needle

const store = createStore()

export const appStack = {
  root: {
    sideMenu: {
      left: {
        component: {
          name: DRAWER_CONTENT,
        },
      },
      center: {
        stack: {
          id: 'center',
          children: [
            {
              component: {
                name: LAUNCH_SCREEN,
                options: {
                  topBar: {
                    title: {
                      text: 'Welcome!',
                      color: Colors.snow,
                    },
                    leftButtons: [
                      {
                        id: 'menuButton',
                        icon: Images.menuIcon,
                        testID: 'menuButton',
                        color: Colors.snow,
                      },
                    ],
                  },
                },
              },
            },
          ],
        },
      },
    },
  },
}

let lastAppState = 'active'
function handleAppStateChange(nextAppState) {
  if (lastAppState.match(/inactive|background/) && nextAppState === 'active') {
    refreshAccount(store)
  }
  lastAppState = nextAppState
}

function refreshAccount() {
  store.dispatch(AccountActions.accountRequest())
}
// for deep linking
function handleOpenURL(event) {
  console.tron.log(event.url)
  let splitUrl = event.url.split('/') // ['https:', '', 'domain', 'route', 'params']
  let importantParameters = splitUrl.splice(3) // ['route', 'params']
  if (importantParameters.length === 0) {
    console.tron.log('Sending to home page')
    return null
  }
  if (importantParameters.length === 1) {
    switch (importantParameters[0]) {
      case 'register':
        console.tron.log('Sending to Register Page')
        registerScreen()
        break
      default:
        console.tron.warn(`Unhandled deep link: ${event.url}`)
      // default code block
    }
  }
}

function registerComponentWithRedux(SCREEN_NAME, Component) {
  Navigation.registerComponent(
    SCREEN_NAME,
    () => (props) => (
      <Provider store={store}>
        <Component {...props} />
      </Provider>
    ),
    () => Component,
  )
}

// registers screens (except the launch screen) as lazily loaded
function registerScreensLazily() {
  Navigation.setLazyComponentRegistrator((componentName) => {
    switch (componentName) {
      case LAUNCH_SCREEN:
        registerComponentWithRedux(LAUNCH_SCREEN, LaunchScreen)
        break
      case STORYBOOK_SCREEN:
        Navigation.registerComponent(STORYBOOK_SCREEN, () => StorybookScreen)
        break
      case LOGIN_SCREEN:
        registerComponentWithRedux(LOGIN_SCREEN, LoginScreen)
        break
      case REGISTER_SCREEN:
        registerComponentWithRedux(REGISTER_SCREEN, RegisterScreen)
        break
      case FORGOT_PASSWORD_SCREEN:
        registerComponentWithRedux(FORGOT_PASSWORD_SCREEN, ForgotPasswordScreen)
        break
      case CHANGE_PASSWORD_SCREEN:
        registerComponentWithRedux(CHANGE_PASSWORD_SCREEN, ChangePasswordScreen)
        break
      case SETTINGS_SCREEN:
        registerComponentWithRedux(SETTINGS_SCREEN, SettingsScreen)
        break
      case DRAWER_CONTENT:
        registerComponentWithRedux(DRAWER_CONTENT, DrawerContent)
        break
      case ENTITIES_SCREEN:
        registerComponentWithRedux(ENTITIES_SCREEN, EntitiesScreen)
        break
      case VENDA_ENTITY_SCREEN:
        registerComponentWithRedux(VENDA_ENTITY_SCREEN, VendaEntityScreen)
        break
      case VENDA_ENTITY_DETAIL_SCREEN:
        registerComponentWithRedux(VENDA_ENTITY_DETAIL_SCREEN, VendaEntityDetailScreen)
        break
      case VENDA_ENTITY_EDIT_SCREEN:
        registerComponentWithRedux(VENDA_ENTITY_EDIT_SCREEN, VendaEntityEditScreen)
        break
      case FUNCIONARIO_ENTITY_SCREEN:
        registerComponentWithRedux(FUNCIONARIO_ENTITY_SCREEN, FuncionarioEntityScreen)
        break
      case FUNCIONARIO_ENTITY_DETAIL_SCREEN:
        registerComponentWithRedux(FUNCIONARIO_ENTITY_DETAIL_SCREEN, FuncionarioEntityDetailScreen)
        break
      case FUNCIONARIO_ENTITY_EDIT_SCREEN:
        registerComponentWithRedux(FUNCIONARIO_ENTITY_EDIT_SCREEN, FuncionarioEntityEditScreen)
        break
      // ignite-jhipster-navigation-registration-needle
      default:
        break
    }
  })
}

export function registerScreensAndStartApp() {
  registerScreensLazily()

  Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setDefaultOptions({
      topBar: {
        topBar: {
          title: {
            color: Colors.snow,
          },
        },
        backButton: {
          showTitle: false,
          testID: 'backButton',
          icon: Images.chevronLeftIcon,
          color: Colors.snow,
          iconColor: Colors.snow,
        },
        background: {
          color: Colors.background,
        },
      },
      sideMenu: {
        left: {
          enabled: false,
        },
      },
    })

    Navigation.setRoot(appStack)

    // handle app state and deep links
    AppState.addEventListener('change', handleAppStateChange)
    Linking.addEventListener('url', handleOpenURL)
  })
}

export const loginScreen = () =>
  Navigation.showModal({
    stack: {
      children: [
        {
          component: {
            name: LOGIN_SCREEN,
            options: {
              topBar: {
                visible: false,
                drawBehind: true,
              },
            },
          },
        },
      ],
    },
  })

export const registerScreen = () =>
  Navigation.push('center', {
    component: {
      name: REGISTER_SCREEN,
      options: {
        topBar: {
          title: {
            text: 'Sign Up',
            color: Colors.snow,
          },
        },
      },
    },
  })

export const forgotPasswordScreen = () =>
  Navigation.push('center', {
    component: {
      name: FORGOT_PASSWORD_SCREEN,
      options: {
        topBar: {
          title: {
            text: 'Forgot Password',
            color: Colors.snow,
          },
        },
      },
    },
  })
export const changePasswordScreen = () =>
  Navigation.push('center', {
    component: {
      name: CHANGE_PASSWORD_SCREEN,
      options: {
        topBar: {
          title: {
            text: 'Change Password',
            color: Colors.snow,
          },
        },
      },
    },
  })
export const settingsScreen = () =>
  Navigation.push('center', {
    component: {
      name: SETTINGS_SCREEN,
      options: {
        topBar: {
          title: {
            text: 'Settings',
            color: Colors.snow,
          },
        },
      },
    },
  })

export const entitiesScreen = () =>
  Navigation.push('center', {
    component: {
      name: ENTITIES_SCREEN,
      options: {
        topBar: {
          title: {
            text: 'Entities',
            color: Colors.snow,
          },
        },
      },
    },
  })
export const storybookScreen = () => {
  Navigation.push('center', {
    component: {
      name: STORYBOOK_SCREEN,
      options: {
        topBar: {
          title: {
            text: 'Storybook',
            color: Colors.snow,
          },
        },
      },
    },
  })
}

export const vendaEntityScreen = () =>
  Navigation.push('center', {
    component: {
      name: VENDA_ENTITY_SCREEN,
      options: {
        topBar: {
          title: {
            text: 'Vendas',
            color: Colors.snow,
          },
          rightButtons: [
            {
              id: 'createButton',
              text: 'Create',
              color: Colors.snow,
              testID: 'vendaCreateButton',
            },
          ],
        },
      },
    },
  })

export const vendaEntityEditScreen = (data) =>
  Navigation.push('center', {
    component: {
      name: VENDA_ENTITY_EDIT_SCREEN,
      passProps: {
        data,
      },
      options: {
        topBar: {
          title: {
            text: 'Vendas',
            color: Colors.snow,
          },
        },
      },
    },
  })

export const vendaEntityDetailScreen = (data) =>
  Navigation.push('center', {
    component: {
      name: VENDA_ENTITY_DETAIL_SCREEN,
      passProps: {
        data,
      },
      options: {
        topBar: {
          title: {
            text: 'Vendas',
            color: Colors.snow,
          },
        },
      },
    },
  })

export const funcionarioEntityScreen = () =>
  Navigation.push('center', {
    component: {
      name: FUNCIONARIO_ENTITY_SCREEN,
      options: {
        topBar: {
          title: {
            text: 'Funcionarios',
            color: Colors.snow,
          },
          rightButtons: [
            {
              id: 'createButton',
              text: 'Create',
              color: Colors.snow,
              testID: 'funcionarioCreateButton',
            },
          ],
        },
      },
    },
  })

export const funcionarioEntityEditScreen = (data) =>
  Navigation.push('center', {
    component: {
      name: FUNCIONARIO_ENTITY_EDIT_SCREEN,
      passProps: {
        data,
      },
      options: {
        topBar: {
          title: {
            text: 'Funcionarios',
            color: Colors.snow,
          },
        },
      },
    },
  })

export const funcionarioEntityDetailScreen = (data) =>
  Navigation.push('center', {
    component: {
      name: FUNCIONARIO_ENTITY_DETAIL_SCREEN,
      passProps: {
        data,
      },
      options: {
        topBar: {
          title: {
            text: 'Funcionarios',
            color: Colors.snow,
          },
        },
      },
    },
  })
// ignite-jhipster-navigation-method-needle

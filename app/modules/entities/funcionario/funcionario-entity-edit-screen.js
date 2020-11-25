import React from 'react'
import { ActivityIndicator, Alert, Text, TouchableHighlight, View } from 'react-native'
import { connect } from 'react-redux'
import FuncionarioActions from './funcionario.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { jsDateToLocalDate } from '../../../shared/util/date-transforms'
import { funcionarioEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './funcionario-entity-edit-screen-style'

let Form = t.form.Form

class FuncionarioEntityEditScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      formModel: t.struct({
        id: t.maybe(t.Number),
        nome: t.String,
        dataNascimento: t.maybe(t.Date),
        dataAdmissao: t.Date,
        cpf: t.maybe(t.String),
        rg: t.maybe(t.String),
        sexo: t.maybe(t.String),
        loginAcesso: t.maybe(t.String),
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true,
          },
          nome: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('dataNascimento').refs.input.focus(),
            testID: 'nomeInput',
          },
          dataNascimento: {
            mode: 'date',
            config: {
              format: (date) => jsDateToLocalDate(date),
            },
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('dataAdmissao').refs.input.focus(),
            testID: 'dataNascimentoInput',
          },
          dataAdmissao: {
            mode: 'date',
            config: {
              format: (date) => jsDateToLocalDate(date),
            },
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('cpf').refs.input.focus(),
            testID: 'dataAdmissaoInput',
          },
          cpf: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('rg').refs.input.focus(),
            testID: 'cpfInput',
          },
          rg: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('sexo').refs.input.focus(),
            testID: 'rgInput',
          },
          sexo: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('loginAcesso').refs.input.focus(),
            testID: 'sexoInput',
          },
          loginAcesso: {
            returnKeyType: 'done',
            onSubmitEditing: () => this.submitForm(),
            testID: 'loginAcessoInput',
          },
        },
      },
      funcionario: {},
      isNewEntity: true,
    }
    if (props.data && props.data.entityId) {
      this.state.isNewEntity = false
      this.props.getFuncionario(props.data.entityId)
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.funcionario !== prevState.funcionario && !prevState.isNewEntity) {
      return { formValue: entityToFormValue(nextProps.funcionario), funcionario: nextProps.funcionario }
    }
    return null
  }
  componentDidUpdate(prevProps) {
    if (prevProps.updating && !this.props.updating) {
      if (this.props.error) {
        Alert.alert('Error', 'Something went wrong updating the entity', [{ text: 'OK' }])
      } else {
        const entityId = this.props.funcionario.id
        this.props.reset()
        this.props.getFuncionario(entityId)
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: funcionarioEntityDetailScreen.bind(this, { entityId }),
          })
        }
        Navigation.pop(this.props.componentId)
        Alert.alert('Success', 'Entity saved successfully', alertOptions)
      }
    }
  }

  submitForm() {
    // call getValue() to get the values of the form
    const funcionario = this.form.getValue()
    if (funcionario) {
      // if validation fails, value will be null
      this.props.updateFuncionario(formValueToEntity(funcionario))
    }
  }

  formChange(newValue) {
    this.setState({
      formValue: newValue,
    })
  }

  render() {
    if (this.props.fetching) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView testID="funcionarioEditScrollView">
          <Form
            ref={(c) => {
              this.form = c
            }}
            type={this.state.formModel}
            options={this.state.formOptions}
            value={this.state.formValue}
            onChange={this.formChange}
          />
        </KeyboardAwareScrollView>
        <TouchableHighlight style={styles.button} onPress={this.submitForm} underlayColor="#99d9f4" testID="submitButton">
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>
      </View>
    )
  }
}
// convenience methods for customizing the mapping of the entity to/from the form value
const entityToFormValue = (value) => {
  if (!value) {
    return {}
  }
  return {
    id: value.id || null,
    nome: value.nome || null,
    dataNascimento: value.dataNascimento || null,
    dataAdmissao: value.dataAdmissao || null,
    cpf: value.cpf || null,
    rg: value.rg || null,
    sexo: value.sexo || null,
    loginAcesso: value.loginAcesso || null,
  }
}
const formValueToEntity = (value) => {
  const entity = {
    id: value.id || null,
    nome: value.nome || null,
    dataNascimento: value.dataNascimento || null,
    dataAdmissao: value.dataAdmissao || null,
    cpf: value.cpf || null,
    rg: value.rg || null,
    sexo: value.sexo || null,
    loginAcesso: value.loginAcesso || null,
  }
  return entity
}

const mapStateToProps = (state) => {
  return {
    funcionario: state.funcionarios.funcionario,
    fetching: state.funcionarios.fetchingOne,
    updating: state.funcionarios.updating,
    error: state.funcionarios.errorUpdating,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getFuncionario: (id) => dispatch(FuncionarioActions.funcionarioRequest(id)),
    getAllFuncionarios: (options) => dispatch(FuncionarioActions.funcionarioAllRequest(options)),
    updateFuncionario: (funcionario) => dispatch(FuncionarioActions.funcionarioUpdateRequest(funcionario)),
    reset: () => dispatch(FuncionarioActions.funcionarioReset()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FuncionarioEntityEditScreen)

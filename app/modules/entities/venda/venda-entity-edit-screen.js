import React from 'react'
import { ActivityIndicator, Alert, Text, TouchableHighlight, View } from 'react-native'
import { connect } from 'react-redux'
import VendaActions from './venda.reducer'
import FuncionarioActions from '../funcionario/funcionario.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { jsDateToLocalDate } from '../../../shared/util/date-transforms'
import { vendaEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './venda-entity-edit-screen-style'

let Form = t.form.Form

class VendaEntityEditScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      formModel: t.struct({
        id: t.maybe(t.Number),
        quantidade: t.Number,
        data: t.Date,
        dataEntrega: t.maybe(t.Date),
        valor: t.maybe(t.Number),
        funcionarioId: this.getFuncionarios(),
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true,
          },
          funcionarioId: {
            testID: 'funcionarioIdInput',
            label: 'Funcionario',
          },
          quantidade: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('data').refs.input.focus(),
            testID: 'quantidadeInput',
          },
          data: {
            mode: 'date',
            config: {
              format: (date) => jsDateToLocalDate(date),
            },
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('dataEntrega').refs.input.focus(),
            testID: 'dataInput',
          },
          dataEntrega: {
            mode: 'date',
            config: {
              format: (date) => jsDateToLocalDate(date),
            },
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('valor').refs.input.focus(),
            testID: 'dataEntregaInput',
          },
          valor: {
            testID: 'valorInput',
          },
        },
      },
      venda: {},
      isNewEntity: true,
    }
    if (props.data && props.data.entityId) {
      this.state.isNewEntity = false
      this.props.getVenda(props.data.entityId)
    }
    this.props.getAllFuncionarios()

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.venda !== prevState.venda && !prevState.isNewEntity) {
      return { formValue: entityToFormValue(nextProps.venda), venda: nextProps.venda }
    }
    return null
  }
  componentDidUpdate(prevProps) {
    if (prevProps.updating && !this.props.updating) {
      if (this.props.error) {
        Alert.alert('Error', 'Something went wrong updating the entity', [{ text: 'OK' }])
      } else {
        const entityId = this.props.venda.id
        this.props.reset()
        this.props.getVenda(entityId)
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: vendaEntityDetailScreen.bind(this, { entityId }),
          })
        }
        Navigation.pop(this.props.componentId)
        Alert.alert('Success', 'Entity saved successfully', alertOptions)
      }
    }
  }

  getFuncionarios = () => {
    const funcionarios = {}
    this.props.funcionarios.forEach((funcionario) => {
      funcionarios[funcionario.id] = funcionario.id ? funcionario.id.toString() : funcionario.id.toString()
    })
    return t.maybe(t.enums(funcionarios))
  }
  submitForm() {
    // call getValue() to get the values of the form
    const venda = this.form.getValue()
    if (venda) {
      // if validation fails, value will be null
      this.props.updateVenda(formValueToEntity(venda))
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
        <KeyboardAwareScrollView testID="vendaEditScrollView">
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
    quantidade: value.quantidade || null,
    data: value.data || null,
    dataEntrega: value.dataEntrega || null,
    valor: value.valor || null,
    funcionarioId: value.funcionarioId || null,
  }
}
const formValueToEntity = (value) => {
  const entity = {
    id: value.id || null,
    quantidade: value.quantidade || null,
    data: value.data || null,
    dataEntrega: value.dataEntrega || null,
    valor: value.valor || null,
    funcionarioId: value.funcionarioId || null,
  }
  return entity
}

const mapStateToProps = (state) => {
  return {
    funcionarios: state.funcionarios.funcionarios || [],
    venda: state.vendas.venda,
    fetching: state.vendas.fetchingOne,
    updating: state.vendas.updating,
    error: state.vendas.errorUpdating,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllFuncionarios: (options) => dispatch(FuncionarioActions.funcionarioAllRequest(options)),
    getVenda: (id) => dispatch(VendaActions.vendaRequest(id)),
    getAllVendas: (options) => dispatch(VendaActions.vendaAllRequest(options)),
    updateVenda: (venda) => dispatch(VendaActions.vendaUpdateRequest(venda)),
    reset: () => dispatch(VendaActions.vendaReset()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VendaEntityEditScreen)

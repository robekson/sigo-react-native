import React from 'react'
import { ActivityIndicator, Alert, ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { funcionarioEntityEditScreen } from '../../../navigation/layouts'
import { jsDateToLocalDate } from '../../../shared/util/date-transforms'

import FuncionarioActions from './funcionario.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './funcionario-entity-detail-screen-style'

class FuncionarioEntityDetailScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.props.getFuncionario(this.props.data.entityId)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.deleting && !this.props.deleting) {
      if (this.props.errorDeleting) {
        Alert.alert('Error', 'Something went wrong deleting the entity', [{ text: 'OK' }])
      } else {
        this.props.resetFuncionarios()
        Navigation.pop(this.props.componentId)
      }
    }
  }

  confirmDelete = () => {
    Alert.alert(
      'Delete Funcionario?',
      'Are you sure you want to delete the Funcionario?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            this.props.deleteFuncionario(this.props.data.entityId)
          },
        },
      ],
      { cancelable: false },
    )
  }

  render() {
    if (!this.props.funcionario || this.props.fetching) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      )
    }
    return (
      <ScrollView style={styles.container} testID="funcionarioDetailScrollView">
        <Text>ID: {this.props.funcionario.id}</Text>
        <Text testID="nome">Nome: {this.props.funcionario.nome}</Text>
        <Text testID="dataNascimento">DataNascimento: {jsDateToLocalDate(this.props.funcionario.dataNascimento)}</Text>
        <Text testID="dataAdmissao">DataAdmissao: {jsDateToLocalDate(this.props.funcionario.dataAdmissao)}</Text>
        <Text testID="cpf">Cpf: {this.props.funcionario.cpf}</Text>
        <Text testID="rg">Rg: {this.props.funcionario.rg}</Text>
        <Text testID="sexo">Sexo: {this.props.funcionario.sexo}</Text>
        <Text testID="loginAcesso">LoginAcesso: {this.props.funcionario.loginAcesso}</Text>
        <RoundedButton text="Edit" onPress={funcionarioEntityEditScreen.bind(this, { entityId: this.props.funcionario.id })} />
        <RoundedButton text="Delete" onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    funcionario: state.funcionarios.funcionario,
    fetching: state.funcionarios.fetchingOne,
    deleting: state.funcionarios.deleting,
    errorDeleting: state.funcionarios.errorDeleting,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getFuncionario: (id) => dispatch(FuncionarioActions.funcionarioRequest(id)),
    getAllFuncionarios: (options) => dispatch(FuncionarioActions.funcionarioAllRequest(options)),
    deleteFuncionario: (id) => dispatch(FuncionarioActions.funcionarioDeleteRequest(id)),
    resetFuncionarios: () => dispatch(FuncionarioActions.funcionarioReset()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FuncionarioEntityDetailScreen)

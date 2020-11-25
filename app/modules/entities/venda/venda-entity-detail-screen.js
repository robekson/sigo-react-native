import React from 'react'
import { ActivityIndicator, Alert, ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { vendaEntityEditScreen } from '../../../navigation/layouts'
import { jsDateToLocalDate } from '../../../shared/util/date-transforms'

import VendaActions from './venda.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './venda-entity-detail-screen-style'

class VendaEntityDetailScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.props.getVenda(this.props.data.entityId)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.deleting && !this.props.deleting) {
      if (this.props.errorDeleting) {
        Alert.alert('Error', 'Something went wrong deleting the entity', [{ text: 'OK' }])
      } else {
        this.props.resetVendas()
        Navigation.pop(this.props.componentId)
      }
    }
  }

  confirmDelete = () => {
    Alert.alert(
      'Delete Venda?',
      'Are you sure you want to delete the Venda?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            this.props.deleteVenda(this.props.data.entityId)
          },
        },
      ],
      { cancelable: false },
    )
  }

  render() {
    if (!this.props.venda || this.props.fetching) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      )
    }
    return (
      <ScrollView style={styles.container} testID="vendaDetailScrollView">
        <Text>ID: {this.props.venda.id}</Text>
        <Text testID="quantidade">Quantidade: {this.props.venda.quantidade}</Text>
        <Text testID="data">Data: {jsDateToLocalDate(this.props.venda.data)}</Text>
        <Text testID="dataEntrega">DataEntrega: {jsDateToLocalDate(this.props.venda.dataEntrega)}</Text>
        <Text testID="valor">Valor: {this.props.venda.valor}</Text>
        <RoundedButton text="Edit" onPress={vendaEntityEditScreen.bind(this, { entityId: this.props.venda.id })} />
        <RoundedButton text="Delete" onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    venda: state.vendas.venda,
    fetching: state.vendas.fetchingOne,
    deleting: state.vendas.deleting,
    errorDeleting: state.vendas.errorDeleting,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getVenda: (id) => dispatch(VendaActions.vendaRequest(id)),
    getAllVendas: (options) => dispatch(VendaActions.vendaAllRequest(options)),
    deleteVenda: (id) => dispatch(VendaActions.vendaDeleteRequest(id)),
    resetVendas: () => dispatch(VendaActions.vendaReset()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VendaEntityDetailScreen)

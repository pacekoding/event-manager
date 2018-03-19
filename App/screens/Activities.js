import React, {Component} from 'react'
import {
  Animated,
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  RefreshControl,
  Alert,
  PanResponder,
  AsyncStorage
} from 'react-native'
import {
  Icon,
} from 'react-native-elements'
import {OptimizedFlatList} from 'react-native-optimized-flatlist'
import {Actions} from 'react-native-router-flux'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

//components
import {
  AddButton,
  CardActivity,
  Empty,
  Loading,
} from '../components'

const {height,width} = Dimensions.get('window')

class Activities extends Component<{}> {

  constructor () {
    super()
    this.state = {
      activities: [],
      isFetching: true,
      sIndex: 0,
      isOpen: false
    }
  }

  componentWillMount() {
     this._panResponder = PanResponder.create({
       onStartShouldSetPanResponder: (evt, gestureState) => true,
       onPanResponderGrant: (evt, gestureState) => {
          this.hideModal()
       },
     })
   }


  componentDidMount () {
    this.handleDetail()
  }

  hideModal = () => {
    this.setState({isOpen: false})
  }

  handleDetail = async () => {
    const incomeExpense = await AsyncStorage.getItem('incomeExpense')
    this.setState({
      activities: JSON.parse(incomeExpense),
      isFetching: false
    })
  }

  handleEdit (item) {
    this.hideModal()
    Actions.editActivity({item})
  }

  deleteActivity = async (id) => {
    this.hideModal()
    const detailEvent = await AsyncStorage.getItem('detailEvent')
    this.props.deteleData(id)
    let incomeExpense = JSON.parse(detailEvent).incomeExpense.filter(item => item.id !== id)
    AsyncStorage.setItem('incomeExpense',JSON.stringify(incomeExpense))
    Actions.activities({type:'replace'})
  }

  handleDelete (id) {
    Alert.alert(
      'Delete Activities',
      'Are you sure?',
      [
        {text: 'Yes', onPress: () => this.deleteActivity(id)},
        {text: 'No', onPress: this.hideModal, style: 'cancel'},
      ],
      { cancelable: false }
    )
  }

  handleModal = ({type,item,id,index}) => {
    this.setState({isOpen: true,sIndex:index})
    if(type === 'delete') this.handleDelete(id)
    if(type === 'edit') this.handleEdit(item)
  }

  _renderItem = ({item,index},parent) => {
    return <CardActivity item={item} index={index} parent={parent} />
  }

  render(){
    const parent = {
      isOpen: this.state.isOpen,
      handleModal : this.handleModal,
      sIndex: this.state.sIndex,
      _panResponder: this._panResponder
    }
    const { activities, isFetching } = this.state
    const isEmpty = activities.length === 0
    return(
      <View style={styles.container} {...this._panResponder.panHandlers}>
        <Loading visible={isFetching}/>
        {
          !isFetching && !isEmpty ?
          <View style={{ flex:1 }}>
            <OptimizedFlatList
              style={{ flex:1 }}
              data={activities}
              keyExtractor={(item, index) => String(index)}
              renderItem={(props) => this._renderItem(props,parent)}
            />
            <AddButton type={'activity'} hideModal={this.hideModal} />
          </View>
          : !isFetching && isEmpty &&
          <View style={{ flex:1 }}>
            <Empty name={'alert-box'} type={'material-community'} message={'Empty Data'} />
            <AddButton type={'activity'} hideModal={this.hideModal} />
          </View>
        }
      </View>
    )
  }
}

const deleteIncExp = gql`
  mutation deleteIncExp($IncomeExpenseId: ID!) {
    deleteIncExp(IncomeExpenseId: $IncomeExpenseId) {
      ok
      incomeExpense {
        id
        isIncome
        value
        description
        pictures {
          id
          path
        }
        incomeExpenseDate
        verified
        user {
          id
          firstName
          lastName
        }
      }
      errors
    }
  }
`;

export default graphql(deleteIncExp, {
  props: ({mutate}) => ({
    deteleData: (IncomeExpenseId) => mutate({
      variables: { IncomeExpenseId }
    })
  })
})(Activities)



const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#f5f5f6',
  }
})

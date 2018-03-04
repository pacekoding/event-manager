import React, {Component} from 'react'
import {
  Animated,
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  RefreshControl,
  BackHandler,
  Alert,
  PanResponder
} from 'react-native'
import {
  Card,
  Button,
  Icon,
  Divider
} from 'react-native-elements'
import {OptimizedFlatList} from 'react-native-optimized-flatlist'
import {Actions} from 'react-native-router-flux'

//components
import {AddButton, CardActivity} from '../components'
///data dummy
import {activities} from '../lib/dummy.js'

const {height,width} = Dimensions.get('window')

export default class Activities extends Component<{}> {

  constructor () {
    super()
    this.state = {
      activities: [],
      isFetching: false,
      sIndex: 0,
      isOpen: false
    }
  }

  componentWillMount() {
     BackHandler.addEventListener('hardwareBackPress', this.backNavigation)
     this._panResponder = PanResponder.create({
       onStartShouldSetPanResponder: (evt, gestureState) => true,
       onPanResponderGrant: (evt, gestureState) => {
         console.log('asdf');
          this.hideModal()
       },
     })
   }

   componentWillUnmount () {
     BackHandler.removeEventListener('hardwareBackPress', this.backNavigation)
   }

  componentDidMount () {
    this.fetchData()
  }

  backNavigation = () => {
    Actions.pop()
    return true
  }

  hideModal = () => {
    this.setState({isOpen: false})
  }

  fetchData () {
    setTimeout(() => {
      this.setState({activities, isFetching: false})
    },2000)
  }

  _onRefresh = () => {
    this.setState({isFetching:true},() => this.fetchData())
  }

  _refreshControl () {
    return <RefreshControl
        refreshing={this.state.isFetching}
        onRefresh={this._onRefresh}
        title="Pull to refresh"
        tintColor="#fff"
        titleColor="#fff"
        colors={['#F50057','#00C853','#0091EA']}
     />
  }

  handleEdit () {
    this.hideModal()
    Actions.editActivity()
  }

  deleteActivity = () => {
    this.hideModal()
  }

  handleDelete () {
    Alert.alert(
      'Delete Activities',
      'Are you sure?',
      [
        {text: 'Yes', onPress: this.deleteActivity},
        {text: 'No', onPress: this.hideModal, style: 'cancel'},
      ],
      { cancelable: false }
    )
  }

  handleModal = (params,index) => {
    this.setState({isOpen: true,sIndex:index})
    if(params === 'delete') this.handleDelete()
    if(params === 'edit') this.handleEdit()
  }

  _renderItem = ({item,index},parent) => {
    return <CardActivity item={item} index={index} parent={parent} />
  }

  render(){
    const parent = {
      isOpen: this.state.isOpen,
      handleModal :this.handleModal,
      sIndex: this.state.sIndex,
      _panResponder: this._panResponder
    }
    return(
      <View style={styles.container} {...this._panResponder.panHandlers}>
        <OptimizedFlatList
          style={{flex:1}}
          data={activities}
          keyExtractor={(item, index) => String(index)}
          renderItem={(props) => this._renderItem(props,parent)}
          refreshControl={this._refreshControl()}
        />
        <AddButton type={'activity'} hideModal={this.hideModal} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#f5f5f6',
  }
})

import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  BackHandler,
  PanResponder,
  AsyncStorage
} from 'react-native'
import {OptimizedFlatList} from 'react-native-optimized-flatlist'
import {Actions} from 'react-native-router-flux'

//components
import {
  AddButton,
  CardForum,
  Empty,
  Loading,
  ModalForum
} from '../components'

import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

class Forum extends Component<{}> {

  constructor (props) {
    super()
    this.state = {
      forums: [],
      isFetching: true,
      sIndex: 0,
      isOpen: false,
      isShow: false,
      title: '',
      content: ''
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.data.forums) this.setState({forums:nextProps.data.forums, isFetching: false})
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
         this.hideModal()
      },
    })
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this.backNavigation)
  }


  componentDidMount () {
    this.props.refetch(this.props.EventId)
    BackHandler.addEventListener('hardwareBackPress', this.backNavigation)
  }

  backNavigation = () => {
    Actions.pop()
    return true
  }

  handleEdit (item) {
    this.hideModal()
  }

  deleteActivity = (id) => {
    this.hideModal()

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
    this.setState({ isOpen: true, sIndex: index })
    // // if(type === 'delete') this.handleDelete(id)
    // // if(type === 'edit') this.handleEdit(item)
  }

  hideModal = () => {
    this.setState({ isOpen: false })
  }

  _renderItem = ({item,index},parent) => {
    return <CardForum item={item} index={index} parent={parent} />
  }

  openModal = () => {
    this.setState({ isShow: true })
  }

  closeModal = () => {
    this.setState({ isShow: false })
  }

  handleOnChange = (type,text) => {
    this.setState({[type]: text})
  }

  handleAdd = () => {
    const { submit,refetch, EventId } = this.props

    const {
      title,
      content
    } = this.state

    const forum = {
      title,
      content,
      EventId,
    }

    submit({ forum })
    refetch(EventId)
    this.closeModal()
  }

  render () {
    const {forums, isFetching, isShow} = this.state
    const parent = {
      isOpen: this.state.isOpen,
      handleModal : this.handleModal,
      sIndex: this.state.sIndex,
      _panResponder: this._panResponder
    }

    const isEmpty = forums.length === 0

    return(
      <View style={[styles.container,{opacity: isShow ? 0.5 : 1}]} {...this._panResponder.panHandlers}>
        <Loading visible={isFetching}/>
        {
          !isFetching && !isEmpty ?
          <View style={{ flex:1 }}>
            <OptimizedFlatList
              data={forums}
              keyExtractor={(item, index) => String(index)}
              renderItem={(props) => this._renderItem(props,parent)}
            />
            <AddButton type={'forum'} hideModal={this.hideModal} openModal={this.openModal} />
          </View>
          : !isFetching && isEmpty &&
          <View style={{ flex:1 }}>
            <Empty name={'alert-box'} type={'material-community'} message={'Empty Data'} />
            <AddButton type={'forum'} hideModal={this.hideModal} openModal={this.openModal} />
          </View>
        }
        <ModalForum isShow={isShow} handleAdd={this.handleAdd} closeModal={this.closeModal} handleOnChange={this.handleOnChange} />
      </View>
    )
  }
}

const Forums = gql`
query Forums ($EventId: ID!) {
  forums(EventId: $EventId) {
    id
    title
    messages {
      content
      user {
        id
        firstName
        lastName
        profilePicture
      }
      ForumId
      createdAt
    }
    content
    createdAt
  }
}
`;

const deleteForum = gql`
  mutation deleteForum($EventId: ID!) {

    deleteForum(EventId: $EventId) {
      ok
      errors
    }
  }
`;

const addForum = gql `
mutation addForum($forum:ForumObject){
  addForum(forum:$forum){
    ok
    forum {
      id
    }
    errors
  }
}
`;


export default compose(
  graphql(Forums, {
    options : (ownProps) => ({ variables: { EventId: ownProps.EventId } }),
    props: ({ data, ownProps }) => ({
      refetch: (EventId) => {
        data.refetch({ EventId })
      },
      data,
      ...ownProps
    })
  }),
  graphql(addForum, {
    props: ({mutate}) => ({
      submit: (forum) => mutate({
        variables: { ...forum }
      })
    })
  }),
  graphql(deleteForum, {
    props: ({mutate}) => ({
      deteleData: (EventId) => mutate({
        variables: { EventId }
      })
    })
  }),
)(Forum)


// export default Forum

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#FFFFFF'
  }
})

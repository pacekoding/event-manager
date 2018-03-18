import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  BackHandler,
  Modal,
  AsyncStorage
} from 'react-native'
import {
  Icon
} from 'react-native-elements'
import {OptimizedFlatList} from 'react-native-optimized-flatlist'
import {Actions} from 'react-native-router-flux'

//components
import {
  AddButton,
  CardProfile,
  ModalMembers,
  Loading
} from '../components'

import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

class DetailDivision extends Component<{}> {

  constructor (props) {
    super()
    this.state = {
      divName: '',
      members: [],
      isShow: false,
      email: '',
      isFetching: true
    }
  }
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backNavigation)
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

  fetchData () {
    if(this.props.members) {
      const{ members,divName } = this.props
      this.setState({divName, members, isFetching: false})
    }
  }

  _renderItem = ({item}) => <CardProfile item={item} />

  openModal = () => this.setState({ isShow: true })
  hideModal = () => this.setState({ isShow: false })

  onChangeContent = (email) => this.setState({ email })

  handleSeach = (email) => {
    const { search } = this.props
    search('james@qlue.id')
  }

  handleAdd = async () => {
    const { submit, data, divId } = this.props
    const user = {
      DivisionId: divId,
      UserId : data.searchByEmail.user.id
    }

    await submit({ user })
    Actions.event({ type: 'replace', UserId })
  }


  render () {
    const {
      divName,
      members,
      isShow,
      isFetching
    } = this.state

    let user = null

    console.log(this.props);

    if(this.props.data.searchByEmail) user = this.props.data.searchByEmail.user

    return(
      <View style={styles.container}>
        <Loading visible={isFetching}/>
      {
        !isFetching &&
        <View style={{ flex:1 }}>
          <View style={styles.content}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>{divName} Members</Text>
            </View>
            <OptimizedFlatList
              data={members}
              keyExtractor={(item, index) => index}
              renderItem={this._renderItem}
            />
          </View>
          {
            !isShow && <AddButton icon={'person-add'} value={this.state.value} type={'members'} openModal={this.openModal}/>
          }
          <ModalMembers
            user={user}
            isShow={isShow}
            hideModal={this.hideModal}
            onChangeContent={this.onChangeContent}
            handleSeach={this.handleSeach}
            handleAdd={this.handleAdd}
            />
        </View>
      }
      </View>
    )
  }
}

const searchByEmail = gql `
  query searchByEmail($email: String!){
    searchByEmail(email: $email) {
    ok
    user {
      id
      email
      firstName
      profilePicture
    }
      errors
    }
  }
`;

const addMember = gql `
  mutation addMember($user:UserObject){
    addMember(user:$user){
      ok
      member {
        id
      }
      errors
    }
  }
`

export default compose(
graphql(searchByEmail, {
  options : (ownProps) => ({ variables: { email: ''} }),
  props: ({ data }) => ({
    search: (email) => {
      data.refetch({ email })
    },
    data,
  })
}),
graphql(addMember, {
  props: ({mutate}) => ({
    submit: (user) => mutate({
      variables: { ...user }
    })
  })
}),
)(DetailDivision)

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#FFFFFF'
  },
  content: {
    flex:1,
    paddingLeft: 20,
  },
  titleContainer: {
    height:50,
    justifyContent: 'center'
  },
  titleText: {
    color: '#9E9E9E',
  }
})

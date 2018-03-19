import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
  AsyncStorage
} from 'react-native'
import DateTimePicker from 'react-native-modal-datetime-picker'
import { Icon } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'
import * as Crop from 'react-native-image-crop-picker'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import moment from 'moment'

import {
  ModalDivision,
  ModalMembers
} from '../components'

let {width,height} = Dimensions.get('window')

const colors = [
  '#43A047',
  '#0091EA',
  '#304FFE',
  '#F44336',
  '#E65100',
  '#6200EA',
  '#827717',
  '#607D8B',
  '#795548'
]

class Teams extends Component<{}> {

  constructor(){
    super()
    this.state = {
      members: [],
      divisions: [],
      name: '',
      email: '',
      user: {},
      isFetching: true,
      isShow: false,
      isShow2: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.data.searchByEmail) {
      if(nextProps.data.searchByEmail.user) this.setState({user:nextProps.data.searchByEmail.user})
    }
  }

  componentDidMount() {
    this.handleDetail()
  }

  handleDetail = async () => {
    const detailEvent = await AsyncStorage.getItem('detailEvent')
    const { members } = JSON.parse(detailEvent).management
    const { divisions } = JSON.parse(detailEvent)
    this.setState({
      members,
      divisions,
      isFetching: false
    })
  }

  handleDivisionPressed = (divId,divName,members) => {
    Actions.detail({ divId,divName,members })
  }

  renderEmptyBox () {
    const { divisions } = this.state
    let i = 2 - (divisions.length % 3)
    let res = []
    while(i>0){
      res= [ ...res, <View key={i} style={styles.divisions} /> ]
      i--
    }
    return res
  }

  renderDivision = () => {
    const { divisions } = this.state
    return divisions.map((item,i) => {
      return (
        <TouchableOpacity key={i}
          style={[styles.divisions,{backgroundColor: colors[i%9],elevation: 2}]}
          onPress={() => this.handleDivisionPressed(item.id,item.name,item.members)} >
            <Text style={styles.teamText}>{ item.name }</Text>
        </TouchableOpacity>
      )
    })
  }

  onChangeName = name => this.setState({ name })

  showAddModal = () => this.setState({ isShow: true })

  hideAddModal = () => this.setState({ isShow: false })

  handleAdd = async () => {
    const dataUser = await AsyncStorage.getItem('dataUser')
    const detailEvent = await AsyncStorage.getItem('detailEvent')
    const UserId = JSON.parse(dataUser).id
    const EventId = JSON.parse(detailEvent).id
    const { submit } = this.props

    const {
      name
    } = this.state

    const new_division = {
      UserId,
      EventId,
      name
    }

    const res = await submit({ new_division })
    Actions.event({ type: 'replace', UserId })
    this.hideAddModal()
  }

  handleAdd2 = async () => {
    const { submit2 } = this.props
    const { user } = this.state
    const dataUser = await AsyncStorage.getItem('dataUser')
    const UserId = JSON.parse(dataUser).id
    const newUser = {
      DivisionId: 'jexlypvw',
      UserId : user.id
    }

    await submit2({ user: newUser })
    this.hideModal()
    Actions.event({ type: 'replace', UserId })
  }

  openModal = () => this.setState({ isShow2: true })
  hideModal = () => this.setState({ isShow2: false })
  onChangeContent = (email) => this.setState({ email })

  handleSeach = () => {
    const { search } = this.props
    const { email } = this.state
    search(email)
  }

  render() {
    const {
      members,
      divisions,
      isFetching,
      isShow,
      isShow2,
      user
    } = this.state

    return (
      <View style={styles.container}>
        <Loading visible={isFetching}/>
      {
        !isFetching &&
        <ScrollView>
          <View style={styles.leaderContainer}>
          {
              members.map((item,index) =>
                <View key={index} style={styles.leader}>
                  <Image style={styles.picture} source={{uri:item.profilePicture}}></Image>
                  <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>{item.role.name}</Text>
                    <Text>{item.firstName}</Text>
                  </View>
                </View>
               )
          }
          {
            members.length == 1 &&
            <TouchableOpacity style={styles.buttonAdd} onPress={this.openModal}>
              <Text style={{fontSize:15,fontWeight:'bold',color:'#FFFFFF'}}>ADD</Text>
            </TouchableOpacity>
          }
          </View>

          <View style={styles.content}>
            <Text style={[styles.titleText,{alignSelf:'center'}]}>Divisions</Text>
            <View style={styles.divisionsContainer}>

              { this.renderDivision() }

              <TouchableOpacity
                key={divisions.length}
                style={[styles.divisions,{backgroundColor: '#BDBDBD', alignSelf:'flex-start'}]}
                onPress={this.showAddModal}
                >
                <Icon
                  name='account-multiple-plus'
                  type='material-community'
                  size={40}
                  color='#FFFFFF' />
              </TouchableOpacity>

              { this.renderEmptyBox() }
            </View>
          </View>

        </ScrollView>
      }
      <ModalDivision isShow={isShow} handleAdd={this.handleAdd} hideAddModal={this.hideAddModal} onChangeName={this.onChangeName} />
      <ModalMembers
        user={user}
        isShow={isShow2}
        hideModal={this.hideModal}
        onChangeContent={this.onChangeContent}
        handleSeach={this.handleSeach}
        handleAdd={this.handleAdd2}
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#FFFFFF',
    },
    leaderContainer: {
      height: 170,
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: '#F5F5F5',
      padding:10
    },
    picture : {
      width:70,
      height:70,
      borderRadius: 35,
      borderWidth: 0.5,
      borderColor: '#E0E0E0',
      marginRight:10,
      borderWidth:1,
      justifyContent: 'center',
    },
    content : {
      paddingTop: 10,
    },
    divisionsContainer: {
      flex:1,
      margin: 10,
      flexDirection: 'row',
      justifyContent: 'space-around',
      flexWrap: 'wrap',
    },
    leader: {
      flex: 1,
      flexDirection: 'row',
    },
    titleContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignSelf:'flex-start'
    },
    titleText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#424242'
    },
    divisions: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 100,
      height: 100,
      borderRadius: 2,
      marginBottom: 10
    },
    teamText: {
      color: '#FFFFFF',
      fontSize: 10,
      fontWeight: 'bold'
    },
    buttonAdd: {
      height:50,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor: '#2196F3',
    }
})


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

const addDivision = gql`
mutation addDivision($new_division: DivisionObject!) {
  addDivision(division: $new_division) {
    ok
    division {
      id
      name
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
    submit2: (user) => mutate({
      variables: { ...user }
    })
  })
}),
graphql(addDivision, {
  props: ({mutate}) => ({
    submit: (new_division) => mutate({
      variables: { ...new_division }
    })
  })
}),
)(Teams)

import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  BackHandler,
  ScrollView,
  Image,
} from 'react-native'
import DateTimePicker from 'react-native-modal-datetime-picker'
import { Icon } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'
import * as Crop from 'react-native-image-crop-picker'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import moment from 'moment'

import {teams, leaders} from '../lib/dummy.js'

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
      leaders:[],
      isFetching: true
    }
  }

 componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backNavigation)
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this.backNavigation)
    this.handleDetail()
  }

  componentDidMount() {
    this.setState({leaders,isFetching:false})
  }

  backNavigation = () => {
    Actions.pop()
  }

  handleDetail = async () => {
    const detailEvent = await AsyncStorage.getItem('detailEvent')
    const { management } = JSON.parse(detailEvent)
    this.setState({
      leaders: management.members
    })
  }

  handleDivisionPressed = () => {
    Actions.detail()
  }

  renderEmptyBox () {
    let i = 2 - (teams.length % 3)
    let res = []
    while(i !==0){
      res= [ ...res, <View key={i} style={styles.teams} /> ]
      i--
    }
    return res
  }

  renderDivision () {
    return teams.map((item,i) => {
      return (
        <TouchableOpacity key={i} style={[styles.teams,{backgroundColor: colors[i%9],elevation: 2}]} onPress={this.handleDivisionPressed} >
          <Text style={styles.teamText}>{item.name}</Text>
        </TouchableOpacity>
      )
    })
  }

  render() {
    const { leaders, isFetching} = this.state
    console.log('lerader',leaders);
    return (
      <View style={styles.container}>
      {
        isFetching ?  <ActivityIndicator size="large" color="#2979FF" />
        :
        <ScrollView>
          <View style={styles.leaderContainer}>
          {
              leaders.map((item,index) =>
                <View key={index} style={styles.leader}>
                  <Image style={styles.picture} source={{uri:item.profilePicture}}></Image>
                  <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>Leader</Text>
                    <Text>{item.firstName}</Text>
                  </View>
                </View>
               )
            }
          </View>

          <View style={styles.content}>
            <Text style={[styles.titleText,{alignSelf:'center'}]}>Divisions</Text>
            <View style={styles.teamsContainer}>

              { this.renderDivision() }

              <TouchableOpacity key={teams.length} style={[styles.teams,{backgroundColor: '#BDBDBD', alignSelf:'flex-start'}]} >
              <Icon
                name='add'
                type='material-icon'
                size={34}
                color='#FFFFFF' />
              </TouchableOpacity>

              { this.renderEmptyBox() }
            </View>
          </View>

        </ScrollView>
      }
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
    teamsContainer: {
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
    teams: {
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
    }

})

const editMutation = gql`
  mutation editForum($new_forum: Event!) {
    editForum(forum: $new_forum) {
      ok
      forum{
        id
        eventDate
        title
        content
      }
      errors {
        message
      }
    }
  }
`;

// export default graphql(AddMutation, {
//   props: ({mutate}) => ({
//     submit: (new_forum) => mutate({
//       variables: { ...new_forum }
//     })
//   })
// })(AddEvent)

export default Teams

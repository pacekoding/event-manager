import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  AsyncStorage,
  Alert,
  BackHandler
} from 'react-native'
import {
  Icon
} from 'react-native-elements'
import { Actions } from 'react-native-router-flux'

export default class Profile extends Component<{}> {

  constructor(){
    super()
    this.state = {
      email: '',
      profilePicture: ''
   }
  }

  componentWillMount() {
     BackHandler.addEventListener('hardwareBackPress', this.backNavigation)
   }

   componentWillUnmount () {
     BackHandler.removeEventListener('hardwareBackPress', this.backNavigation)
   }

  componentDidMount() {
    this.handleDetail()
  }

  backNavigation = () => {
    Actions.homeTabBar()
    return true
  }

  handleDetail = async () => {
    const dataUser = await AsyncStorage.getItem('dataUser')
    console.log('dataUser',dataUser);
    const { email, profilePicture } = JSON.parse(dataUser)
    this.setState({
      email,
      profilePicture
    })
  }

  logout = () => {
    Actions.login()
    AsyncStorage.clear()
  }

  handleLogout = () => {
    Alert.alert(
      'Log Out',
      'Are you sure?',
      [
         {text: 'Yes', onPress: this.logout},
         {text: 'No', onPress: () => {}, style: 'cancel'},
       ],
       { cancelable: false }
    )
  }

  render(){
    const { email,profilePicture } = this.state
    return(
      <View style={styles.container}>
        <View style={styles.profile}>
          <Image style={styles.picture} source={{ uri: profilePicture || 'https://vignette.wikia.nocookie.net/creepypasta/images/8/80/White.png/revision/latest?cb=20140308203440' }} />
        </View>
        <View style={styles.card}>
          <Icon
            name='email'
            type='material-community'
            color='#C62828'
            size={30}
            containerStyle={styles.icon}
          />
          <Text>{email}</Text>
        </View>
        <TouchableOpacity style={styles.card} onPress={this.handleLogout}>
          <Icon
            name='logout-variant'
            type='material-community'
            color='#9E9E9E'
            size={30}
            containerStyle={styles.icon}
          />
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#FFFFFF',
  },
  profile: {
    alignItems: 'center',
    height: 250,
    backgroundColor: '#F5F5F5',
  },
  picture : {
    width: '100%',
    height: 250,
    alignItems: 'stretch',
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  nameText: {
    fontSize: 16,
  },
  card: {
    flexDirection:'row',
    height: 50,
    borderBottomWidth: 0.5,
    borderColor: '#E0E0E0',
    paddingLeft:10,
    alignItems: 'center'
  },
  icon: {
    marginRight: 10
  }

})

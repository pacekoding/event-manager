import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Text,
  AsyncStorage
} from 'react-native'
import {
  Icon
} from 'react-native-elements'
import {Actions} from 'react-native-router-flux'

export default class Splash extends Component<{}> {

  async componentDidMount() {
    const dataUser = await AsyncStorage.getItem('dataUser')

    if(dataUser) {
      const UserId = JSON.parse(dataUser).id
      Actions.event({ type: 'replace', UserId })

    } else setTimeout(() => {
      Actions.login()
    },1000)

  }

  render(){
    return(
      <View style={styles.container}>
        <Icon
          name='eventbrite'
          type='zocial'
          color='#757575'
          size={100}
        />
        <Text style={{marginTop:10,fontWeight:'bold'}}>EVENT</Text>
        <Text style={{fontWeight:'bold'}}>MANAGER</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#F5F5F5',
    justifyContent:'center',
    alignItems:'center'
  },
  image: {
    width:100,
    height:100
  }
})

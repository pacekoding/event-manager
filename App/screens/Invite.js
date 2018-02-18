import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'
import {
  Icon
} from 'react-native-elements'

import Empty from '../components/Empty'

export default class Invite extends Component<{}> {

  render(){
    return(
      <View style={styles.container}>
        <Empty name='clipboard-alert' type= 'material-community' message='Empty Invited Event' />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1
  }
})

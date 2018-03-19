import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'
import {
  Icon
} from 'react-native-elements'

export default class Test extends Component<{}> {

  render(){
    return(
      <View style={styles.container}>
        <Icon
          name='ios-construct'
          type='ionicon'
          color='#757575'
          size={100}
        />
        <Text style={{marginTop:10,fontWeight:'bold'}}>UNDER</Text>
        <Text style={{fontWeight:'bold'}}>CONSTRUCTION</Text>
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

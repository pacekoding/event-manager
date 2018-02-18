import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'
import {
  Icon
} from 'react-native-elements'

//clipboard-alert

export default Empty = ({name,type,message}) => {
  return(
    <View style={styles.container}>
      <Icon
        name={name}
        type={type}
        color='#757575'
        size={100}
      />
      <Text style={{marginTop:10,fontWeight:'bold'}}>{message}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#EEEEEE',
    justifyContent:'center',
    alignItems:'center'
  },
  image: {
    width:100,
    height:100
  }
})

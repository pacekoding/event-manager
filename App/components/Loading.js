import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  ActivityIndicator
} from 'react-native'
import {
  Icon
} from 'react-native-elements'

//clipboard-alert

export default Loading = ({visible}) => {
  if (visible)
    return(
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0091EA" />
      </View>
    )
  return null
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

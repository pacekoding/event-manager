import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native'
import {
  Icon
} from 'react-native-elements'

export default class Profile extends Component<{}> {

  render(){
    return(
      <View style={styles.container}>
        <View style={styles.profile}>
          <Image style={styles.picture} source={{uri:'https://3.bp.blogspot.com/-vn5bT6EWO6E/VzB0hEtSrII/AAAAAAAACJ8/5GBuFRo6ImM-BCeD3z9XWejA45Y5ZmLVgCLcB/s1600/Beyonce-no-gravity-mp3-download.jpg'}} />
        </View>
        <View style={styles.card}>
          <Icon
            name='email'
            type='material-community'
            color='#C62828'
            size={30}
            containerStyle={styles.icon}
          />
          <Text>{'beyonce@seksehh.com'}</Text>
        </View>
        <View style={styles.card}>
          <Icon
            name='logout-variant'
            type='material-community'
            color='#9E9E9E'
            size={30}
            containerStyle={styles.icon}
          />
          <Text>Logout</Text>
        </View>
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

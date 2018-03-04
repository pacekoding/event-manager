import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native'

const CardProfile = ({item}) => {
  return(
    <View style={styles.container}>
      <Image style={styles.picture} source={{uri:'http://www.bestfan.com/blog/wp-content/uploads/2012/02/237-jay-z-e1328654292320.jpg'}}></Image>
      <View style={styles.textContainer}>
        <Text style={styles.nameText}>{item.name}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },
  picture : {
    width:50,
    height:50,
    borderRadius: 25,
    borderWidth: 0.5,
    borderColor: '#E0E0E0',
    marginRight:20,
    borderWidth:1,
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#E0E0E0',
  },
  nameText: {
    fontSize: 16,
    color: '#424242',
  }
})

export default CardProfile

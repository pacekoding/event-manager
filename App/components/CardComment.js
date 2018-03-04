import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native'

import moment from 'moment'

import { Icon } from 'react-native-elements'

const CardComment = ({item}) => {
  return(
    <View style={styles.container}>
      <Image style={styles.picture} source={{uri:'http://www.bestfan.com/blog/wp-content/uploads/2012/02/237-jay-z-e1328654292320.jpg'}}></Image>
      <View style={styles.textContainer}>
        <Text style={styles.commentText}>{item.comment}</Text>
        <View style={styles.metaContainer}>
          <Text style={styles.metaText}>Leader</Text>
          <Icon
            name='circle'
            type='material-community'
            color='#9E9E9E'
            size={4}
          />
          <Text style={styles.metaText}>{moment(new Date).format('LLL')}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flexDirection: 'row',
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom:5,
  },
  picture : {
    width:40,
    height:40,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: '#E0E0E0',
    marginRight:20,
    borderWidth:1
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderColor: '#E0E0E0',
  },
  commentText: {
    fontSize: 14,
    color: '#424242',
  },
  metaContainer: {
    width: '90%',
    marginTop: 5,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  metaText: {
    fontSize: 12
  }
})

export default CardComment

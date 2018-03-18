import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import {
  Icon,
} from 'react-native-elements'
import {Actions} from 'react-native-router-flux'
import Swiper from 'react-native-swiper'
import moment from 'moment'

const {width} = Dimensions.get('window')

const CardEvent = ({item,index,parent}) => {
  const {
    id,
    title,
    content,
    messages,
    createdAt
  } = item

  const totalComments = messages.length
  const dateText = moment(createdAt).format('LL')
  const dueDateColor = '#757575'

  const {
    isOpen,
    handleModal,
    sIndex,
  } = parent

  return(
    <View style={styles.container}>
      {
        isOpen &&
        <View style={styles.modalContainer}>
          <TouchableOpacity style={[styles.optionContainer,{marginBottom: 10}]} onPress={() => handleModal({type: 'edit',item})}>
            <Text style={styles.optionsText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.optionContainer,{marginTop: 10}]} onPress={() => handleModal({type: 'delete',id})}>
            <Text style={styles.optionsText}>Delete</Text>
          </TouchableOpacity>
        </View>
      }
      <View style={styles.header}>
      <View style={{flex: 5, padding:10,}}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <TouchableOpacity style={{flex:1,height:60, justifyContent: 'center'}} onPress={() => handleModal({type:'show',index})}>
        <Icon
          name='dots-vertical'
          type='material-community'
          color={'#616161'}
          />
      </TouchableOpacity>
      </View>
      <View style={styles.line} />
      <View style={styles.contentContainer}>
        <Text style={styles.descriptionText}>{content}</Text>
      </View>
      <View style={styles.line} />
      <View style={styles.cardButtonContainer}>
        <View style={styles.dateContainer}>
          <View style={styles.metaContainer}>
            <Icon
              name='calendar'
              type='material-community'
              color='#9E9E9E'/>
            <Text style={styles.dateText}>{dateText}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.commentsContainer} onPress={() => Actions.comment({detailForum:item})} >
        <View style={styles.metaContainer}>
          <Icon
            name='comment'
            type='material-community'
            color='#9E9E9E'/>
            <Text style={styles.dateText}>{totalComments}</Text>
        </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5,
    borderRadius:2,
    backgroundColor: '#FFFFFF',
    elevation: 2
  },
  modalContainer: {
    flexDirection: 'column',
    height: 'auto',
    width: 100,
    right: 10,
    top: 10,
    borderRadius: 2,
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    elevation: 10,
    zIndex: 9,
    paddingLeft: 10,
    paddingTop: 20,
    paddingBottom: 20
  },
  optionContainer: {
    flex: 1
  },
  optionsText: {
    fontSize: 16,
    color: '#212121',
    fontFamily: 'Roboto'
  },
  header: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  swiperContainer: {
    height: 150,
    width: '100%'
  },
  slide: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch'
  },
  contentContainer: {
    padding:10,
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF'
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 5
  },
  descriptionText: {
    flexWrap: 'nowrap',
    color: '#263238'
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#DEDEDE'
  },
  cardButtonContainer: {
    height: 60,
    flexDirection: 'row',
  },
  dateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 10
  },
  commentsContainer: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  metaContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  dateText: {
    marginLeft:5,
    color: '#424242',
  },
})

export default CardEvent

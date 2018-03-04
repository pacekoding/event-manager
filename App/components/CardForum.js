import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Picker,
  AsyncStorage,
} from 'react-native'
import {
  Icon,
} from 'react-native-elements'
import {Actions} from 'react-native-router-flux'
import Swiper from 'react-native-swiper'
import moment from 'moment'

const {width} = Dimensions.get('window')
const imageWidth = width - width * 0.1
const imageHeight = width - width * 0.1

const CardEvent = ({item}) => {
  const {
    id,
    title,
    pictures,
    content,
    date
  } = item

  const totalComments = 4
  const hasPictures = pictures && pictures.length !== 0
  const dateText = moment(new Date()).format('LL')
  const dueDateColor = '#757575'

  return(
    <View style={styles.container}>
    {
      hasPictures &&
      <View style={styles.swiperContainer}>
        <Swiper
          loop={false}
          dot={
            <View style={{
                backgroundColor: '#A6A6A6',
                width: 8,
                height: 8,
                borderRadius: 4,
                marginLeft: 6,
                marginRight: 6,
                marginTop: 6,
                marginBottom: 0}} />}
          activeDot={
            <View style={{
                backgroundColor: '#FFFFFF',
                width: 8,
                height: 8,
                borderRadius: 4,
                marginLeft: 6,
                marginRight: 6,
                marginTop: 6,
                marginBottom: 0}} />}
          >
          { pictures.map((item, index) => (
            <View style={styles.slide} key={index}>
              <Image source={{uri: item.path}} style={styles.imageEvent} />
            </View>
          ))}
        </Swiper>
      </View>
    }
      <View style={styles.contentContainer}>
        <Text style={styles.titleText}>{title}</Text>
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
        <TouchableOpacity style={styles.commentsContainer} onPress={() => Actions.comment()} >
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
    elevation: 1
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
  imageEvent: {
    width: '100%',
    height: 'auto',
    alignItems: 'stretch',
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

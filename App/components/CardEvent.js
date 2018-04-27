import React, {Component} from 'react'
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
  Card,
} from 'react-native-elements'
import {Actions} from 'react-native-router-flux'
import Swiper from 'react-native-swiper'
import moment from 'moment'

const {width, height} = Dimensions.get('window')
const imageWidth = width - width * 0.1
const imageHeight = width - width * 0.1

class CardEvent extends Component<> {

    constructor () {
      super()
      this.state = {
        eventdateText: moment(new Date()).format('L'),
        dueDateColor: '#9E9E9E',
        isHide: true,
        id: '',
        title: '',
        pictures: '',
        content: '',
        eventDate: ''
      }
    }

    async componentDidMount(){

      const { id, title, pictures, content, eventDate,management } = this.props.item
      const eventdateText = moment(eventDate).format('L')
      const dueDateColor = '#9E9E9E'

      let dataUser = await AsyncStorage.getItem('dataUser')
      const bendahara = management.members.filter(member => (member.role.id == 2))
      let isHide = ''
      if (this.props.nav)
        isHide = false
      else
        isHide = !(JSON.parse(dataUser).email === bendahara[0].email)

      this.setState({
        isHide,
        eventdateText,
        dueDateColor,
        id,
        title,
        pictures,
        content,
        eventDate
      })

    }

    handleSetting = () => {
      const { item } = this.props
      AsyncStorage.setItem('detailEvent',JSON.stringify(item))
      Actions.editEvent({detailEvent:item})
    }

    handleForum = () => {
      const { item } = this.props
      AsyncStorage.setItem('detailEvent',JSON.stringify(item))
      Actions.forum({EventId: item.id})
    }

    handleManagement = () => {
      const { item } = this.props
      AsyncStorage.setItem('detailEvent',JSON.stringify(item))
      AsyncStorage.setItem('incomeExpense',JSON.stringify(item.incomeExpense))
      AsyncStorage.setItem('management',JSON.stringify(item.management))
      Actions.report({EventId: item.id})
      return
    }

    render() {

      const {
        id,
        title,
        pictures,
        content,
        eventDate,
        eventdateText,
        dueDateColor,
        isHide
      } = this.state

      return(
        <View style={styles.container}>

          <View style={styles.swiperContainer}>
            {
              !isHide &&
              <Icon
              containerStyle={styles.dateIcon}
              raised
              name='gear'
              type='font-awesome'
              color='#FFFFFF'
              size={20}
              onPress={this.handleSetting} />}
              {
                pictures.length !== 0 &&
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
              }
              {
                eventdateText &&
                <View style={[styles.dueDateIcon,{backgroundColor: dueDateColor}]}>
                  <Icon
                    name='clock-alert'
                    type='material-community'
                    color='#FFFFFF'
                    size={18}/>
                  <Text style={styles.eventdateText}>{eventdateText}</Text>
                </View>
              }
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.titleText}>{title}</Text>
            <Text style={styles.descriptionText}>{content}</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.cardButtonContainer}>
            <TouchableOpacity style={styles.optionContainer} onPress={this.handleForum} >
              <Text style={[styles.optionText,{color: '#2962FF'}]}>Forum</Text>
            </TouchableOpacity>
            {
              !isHide &&
              <TouchableOpacity style={styles.optionContainer} onPress={this.handleManagement} >
                <Text style={[styles.optionText,{color: '#00C853'}]}>Management</Text>
              </TouchableOpacity>
            }
          </View>
        </View>
      )
    }


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
    height: 250,
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
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2
  },
  dateIcon: {
    justifyContent: 'center',
    backgroundColor: '#00BFA5',
    width:50,
    height:50,
    borderRadius:25,
    position:'absolute',
    bottom:-32,
    right:5,
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: {
      height: 2,
      width: 2
    },
    zIndex: 99,
    elevation: 2
  },
  dueDateIcon: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 100,
    height: 25,
    position: 'absolute',
    bottom: 5,
    left: 5,
    borderRadius:2,
    zIndex: 9,
    elevation: 2
  },
  eventdateText: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 12,
    fontWeight: 'bold'
  },
  contentContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    padding:10,
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
    height:60,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  optionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
})

export default CardEvent

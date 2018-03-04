import React, {Component} from 'react'
import {
  StyleSheet,
  ActivityIndicator,
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  BackHandler
} from 'react-native'
import { Icon } from 'react-native-elements'
import { OptimizedFlatList } from 'react-native-optimized-flatlist'
import { Actions } from 'react-native-router-flux'
import Swiper from 'react-native-swiper'
import moment from 'moment'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

///data dummy
import {comments,forums} from '../lib/dummy.js'
//components
import {CardForum,CardComment} from '../components'

class DetailForum extends Component<{}> {

  constructor (props) {
    super()
    this.state = {
      comments: [],
      comment: '',
      isFetching: true
    }
  }
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backNavigation)
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this.backNavigation)
  }


  componentDidMount () {
    this.fetchData()
  }

  backNavigation = () => {
    Actions.pop()
    return true
  }

  fetchData () {
    setTimeout(() => {
      this.setState({comments, isFetching: false})
    },1000)
  }

  _renderItem = ({item}) => {
    return <CardComment item={item} />
  }

  onChangeComment = description => this.setState({ description })


  render () {
    const {
      comments,
      isFetching
    } = this.state
    const {
      id,
      title,
      pictures,
      content,
      date
    } = forums[0]

    const totalComments = 4
    const hasPictures = pictures && pictures.length !== 0
    const dateText = moment(new Date()).format('LL')
    const dueDateColor = '#757575'

    return(
      <View style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
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
          <View style={styles.commentsContainer} onPress={() => Actions.comment()} >
          <View style={styles.metaContainer}>
            <Icon
              name='comment'
              type='material-community'
              color='#9E9E9E'/>
              <Text style={styles.dateText}>{totalComments}</Text>
          </View>
          </View>
        </View>
        <View style={[styles.line,{marginBottom:10}]} />
        {
          isFetching ?  <ActivityIndicator size="large" color="#2979FF" />
          :
          <OptimizedFlatList
            data={comments}
            keyExtractor={(item, index) => index}
            renderItem={this._renderItem}
          />
        }
        </View>
        </ScrollView>
        <View style={styles.commentBox}>
          <Image style={styles.picture} source={{uri:'https://3.bp.blogspot.com/-vn5bT6EWO6E/VzB0hEtSrII/AAAAAAAACJ8/5GBuFRo6ImM-BCeD3z9XWejA45Y5ZmLVgCLcB/s1600/Beyonce-no-gravity-mp3-download.jpg'}}></Image>
          <TextInput
            ref='comment'
            placeholder='Comment...'
            placeholderTextColor={'#A2A2A2'}
            returnKeyType='next'
            multiline
            numberOfLines={3}
            name={'comment'}
            onChangeText={this.onChangeComment}
            underlineColorAndroid='transparent'
            style={styles.textInputDescription} />
          <View style={styles.boxSend}>
            <Icon
              name='send'
              type='material-community'
              color='#FFFFFF'/>
          </View>
        </View>
      </View>
    )
  }
}

export default DetailForum



const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#FFFFFF'
  },
  content: {
    flex:1,
  },
  swiperContainer: {
    height: 200,
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
  commentBox: {
    height:50,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#E0E0E0',
  },
  picture: {
    width:40,
    height:40,
    borderRadius: 20,
    borderTopWidth: 0.5,
    borderColor: '#E0E0E0',
    marginLeft:10,
    marginRight:10,
    borderWidth:1
  },
  textInputDescription: {
    flex:1,
    alignItems: 'center',
    fontSize: 14,
    color: '#212121',
  },
  boxSend: {
    backgroundColor: '#2979FF',
    width: 50,
    height: 50,
    justifyContent: 'center'
  }
})

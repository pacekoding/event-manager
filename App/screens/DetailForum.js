import React, {Component} from 'react'
import {
  StyleSheet,
  ActivityIndicator,
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  BackHandler,
  AsyncStorage,
  TouchableOpacity,
  Keyboard
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
      messages:[],
      detailForum: {},
      comment: '',
      isFetching: true,
      dataUser:{},
    }
    this.handleAdd = this.handleAdd.bind(this)
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this.backNavigation)
  }

  async componentDidMount () {
    const dataUser = await AsyncStorage.getItem('dataUser')
    this.setState({dataUser:JSON.parse(dataUser)})
    BackHandler.addEventListener('hardwareBackPress', this.backNavigation)
    this.setState({isFetching: false, messages: this.props.detailForum.messages})
  }

  backNavigation = () => {
    Actions.pop()
    return true
  }

  _renderItem = ({item}) => {

    return <CardComment item={item} />
  }

  onChangeComment = comment => this.setState({ comment })

  handleAdd = async () => {
    Keyboard.dismiss()
    const ForumId = this.props.detailForum.id
    const {dataUser} = this.state
    const UserId = dataUser.id

    const { submit } = this.props

    const new_comment = {
      content: this.state.comment,
      ForumId,
      UserId
    }
    const comment= {
      content: this.state.comment,
      user: dataUser,
      ForumId,
      createdAt: new Date()
    }
    const messages = [...this.state.messages,comment]
    this.setState({messages,comment: ''})
    const res = await submit({ new_comment })
  }


  render () {
    const {
      detailForum,
      isFetching
    } = this.props

    const {
      id,
      title,
      content,
      // messages,
      createdAt
    } = detailForum

    const isEmpty = this.state.comment === ''

    const { messages } = this.state

    const totalComments = messages.length
    const dateText = moment(createdAt).format('LL')
    const dueDateColor = '#757575'

    return(
      <View style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
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
                size={20}
                color='#9E9E9E'/>
              <Text style={styles.dateText}>{dateText}</Text>
            </View>
          </View>
          <View style={styles.commentsContainer} onPress={() => Actions.comment()} >
          <View style={styles.metaContainer}>
            <Icon
              name='comment'
              type='material-community'
              size={20}
              color='#4fc3f7'/>
              <Text style={styles.commentText}>{totalComments}</Text>
          </View>
          </View>
        </View>
        <View style={[styles.line,{marginBottom:10}]} />
        {
          isFetching ?  <ActivityIndicator size="large" color="#2979FF" />
          :
          <OptimizedFlatList
            data={messages}
            keyExtractor={(item, index) => index}
            renderItem={this._renderItem}
          />
        }
        </View>
        </ScrollView>
        <View style={styles.commentBox}>
          <Image style={styles.picture} source={{uri:this.state.dataUser.profilePicture}}></Image>
          <TextInput
            ref='comment'
            placeholder='Comment...'
            placeholderTextColor={'#A2A2A2'}
            returnKeyType='next'
            multiline
            numberOfLines={3}
            name={'comment'}
            value={this.state.comment}
            onChangeText={this.onChangeComment}
            underlineColorAndroid='transparent'
            style={styles.textInputDescription} />
          <TouchableOpacity onPress={this.handleAdd}
            disabled={isEmpty}
            style={[styles.boxSend,{backgroundColor: isEmpty ? '#BDBDBD' : '#2979FF'}]}>
            <Icon
                name='send'
                type='material-community'
                color='#FFFFFF'/>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const AddMutation = gql`
  mutation addEvent($new_comment: MessageObject!) {
    addMessage(message: $new_comment) {
      ok
      errors {
        message
      }
      message {
        content,
        user {
          id
          firstName
          lastName
          profilePicture
        },
        ForumId,
        createdAt
      }
    }
  }
`;

export default graphql(AddMutation, {
  props: ({mutate}) => ({
    submit: (new_comment) => mutate({
      variables: { ...new_comment }
    })
  })
})(DetailForum)


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
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF'
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212121',
    alignSelf: 'center',
    marginBottom: 20
  },
  descriptionText: {
    flexWrap: 'nowrap',
    color: '#424242'
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#DEDEDE'
  },
  cardButtonContainer: {
    height: 40,
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
    fontSize: 10,
    color: '#616161',
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
    width: 50,
    height: 50,
    justifyContent: 'center'
  },
  commentText: {
    marginLeft:5,
    fontSize: 14,
    color: '#616161',
  },
})

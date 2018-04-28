import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  processColor,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  Dimensions,
  BackHandler,
  Modal,
  ScrollView,
  Image,
  Button,
  AsyncStorage,
  Alert
} from 'react-native'
import DateTimePicker from 'react-native-modal-datetime-picker'
import { Icon } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'
import * as Crop from 'react-native-image-crop-picker'
import { graphql,compose } from 'react-apollo'
import gql from 'graphql-tag'
import moment from 'moment'

import {events} from '../lib/dummy.js'

let {width,height} = Dimensions.get('window')

class EditEvent extends Component<{}> {

  constructor(){
    super()
    this.state = {
      id: '',
      pictures: [],
      path: [],
      title: '',
      description: '',
      isDateTimePickerVisible: false,
      date: new Date(),
      dateText: '',
      showModal: false,
      nav: 'event'
   }
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backNavigation)
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this.backNavigation)
  }

  backNavigation = async () => {
    const dataUser = await AsyncStorage.getItem('dataUser')
    const UserId = JSON.parse(dataUser).id
    Actions.event({ type: 'replace', UserId })
    return true
  }

  componentDidMount() {
    if(this.props.detailEvent) {
      const { id,title,pictures,content,eventDate } = this.props.detailEvent
      this.setState({
        id,
        title,
        pictures,
        path: pictures.map(item => (item.path)),
        description: content,
        dateText: moment(eventDate).format('LL'),
        date: new Date(eventDate)
      })
    }
  }

  handleModal = () => this.setState(prevState => ({ showModal: !prevState.showModal }))

  onChangeTitle = title => this.setState({ title })

  onChangeDescription = description => this.setState({ description })

  deletePicture = (index) => {
    this.setState(prevState => {
      return {
        pictures: prevState.pictures.filter((data,i) =>  index !== i)
      }
    })
  }

  _uploadPictureCamera = async() => {
    try {
      const image = await Crop.default.openCamera({width: width, height: width+(width*0.35), cropping: true})
      const postData = new FormData()
      postData.append('file', { uri: image.path, type: 'image/jpg', name: 'qluster.jpg' })
      const data = await upload(postData)

      this.setState(prevState => ({
        pictures:[image.path, ...prevState.pictures],
        path:[data.result, ...prevState.path]
      }), this.handleModal() )
    }
    catch(err) {
      this.handleModal()
    }
  }

  _uploadPictureGallery = async() => {
    try {
      const image = await Crop.default.openPicker({width: width, height: width+(width*0.35), cropping: true})
      const postData = new FormData()
      postData.append('file', { uri: image.path, type: 'image/jpg', name: 'qluster.jpg' })
      const data = await upload(postData)

      this.setState(prevState => ({
        pictures:[image.path, ...prevState.pictures],
        path:[data.result, ...prevState.path]
      }), this.handleModal() )
    }
    catch(err) {
      this.handleModal()
    }
  }

  handleChange = async () => {
    const dataUser = await AsyncStorage.getItem('dataUser')
    const UserId = JSON.parse(dataUser).id

    const { editData } = this.props
    const {
      title,
      content,
      path,
      eventDate
    } = this.state

    const edit_event = {
      EventId:this.props.detailEvent.id,
      title,
      content,
      path,
      eventDate
    }
    
    const res = await editData({ edit_event })
    Actions.event({ type: 'replace', UserId })
  }

  handleDelete = () => {
    Alert.alert(
      'Delete Event',
      'Are you sure?',
      [
        {text: 'Yes', onPress: this.deleteEvent},
        {text: 'No', onPress: () => {}, style: 'cancel'},
      ],
      { cancelable: false }
    )
  }

  deleteEvent = async () => {
    try {
      const dataUser = await AsyncStorage.getItem('dataUser')
      const UserId = JSON.parse(dataUser).id
      const res = await this.props.deteleData(this.props.detailEvent.id)

      if(res) {
        Alert.alert(
          'Info',
          'Delete Success',
          [
            {text: 'Ok', onPress: () => {}, style: 'cancel'},
          ],
          { cancelable: false }
        )
      }
      Actions.event({ type: 'replace', UserId })
    }
    catch (err) {
      Alert.alert(
        'Info',
        'Delete Failed',
        [
          {text: 'Ok', onPress: () => {}, style: 'cancel'},
        ],
        { cancelable: false }
      )
    }
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    this.setState({ date,dateText: moment(date).format('LL') })
    this._hideDateTimePicker();
  };

  render() {

    return (
      <View style={styles.container}>
        <View style={styles.content}>

          <ScrollView>
            <ScrollView horizontal={true} style={{marginLeft:10, marginRight:10}}>
              <View style={styles.viewRowScroll}>
                {this.state.pictures.map((item, index) => (
                  <View key={index} style={{marginRight:8}}>
                    <Image source={{uri:item.path}} style={styles.imgRespon} />
                    <TouchableOpacity style={styles.viewBelumDitanggapi}
                      onPress={() => this.deletePicture(index)}>
                      <Icon
                        containerStyle={{backgroundColor: '#F5F5F5', height:20, width:20, borderRadius: 20/2}}
                        name='x-circle'
                        type='feather'
                        color='#D32F2F'
                        size={20}
                      />
                    </TouchableOpacity>
                  </View>
                ))}

                <TouchableOpacity style={styles.ungguhGambar} onPress={this.handleModal}>
                <Icon
                  name='images'
                  type='entypo'
                  color='#4fc3f7'
                  size={50}
                />
                  <Text style={styles.textUnggah}>Upload Images</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>

            <View style={styles.line} />

            <View style={styles.formEvent}>
              <Icon
                name='title'
                type='material-icons'
                color='#4fc3f7'
                size={24}
              />
              <TextInput
                ref='title'
                name='title'
                value={this.state.title}
                placeholder={'Title'}
                placeholderTextColor={'#A2A2A2'}
                returnKeyType='next'
                underlineColorAndroid='transparent'
                onChangeText={this.onChangeTitle}
                style={styles.textInput} />
            </View>

            <View style={styles.line} />
            <View style={styles.formDescription}>
            <Icon
              name='description'
              type='material-icons'
              color='#4fc3f7'
              size={24}
            />
              <TextInput
                ref='description'
                value={this.state.description}
                placeholder={'description'}
                placeholderTextColor={'#A2A2A2'}
                returnKeyType='next'
                multiline
                numberOfLines={3}
                name={'test'}
                onChangeText={this.onChangeDescription}
                underlineColorAndroid='transparent'
                style={styles.textInputDescription} />
            </View>

            <View style={styles.line} />

            <View style={styles.formEvent}>
              <Icon
                name='date-range'
                type='material-icons'
                color='#4fc3f7'
                size={24}
              />
              <TouchableOpacity onPress={this._showDateTimePicker}>
                <Text style={[styles.dateInput,{color: this.state.dateText ? '#000000' : '#A2A2A2'}]}>{this.state.dateText}</Text>
              </TouchableOpacity>
              <DateTimePicker
                isVisible={this.state.isDateTimePickerVisible}
                onConfirm={this._handleDatePicked}
                onCancel={this._hideDateTimePicker}
                date={this.state.date}
                minimumDate={new Date()}
              />
            </View>

            <View style={styles.line} />
          </ScrollView>

          <TouchableOpacity style={styles.buttonChange} onPress={this.handleChange}>
            <Text style={{fontSize:15,fontWeight:'bold',color:'#FFFFFF'}}>CHANGE</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonDelete} onPress={this.handleDelete}>
            <Text style={{fontSize:15,fontWeight:'bold',color:'#F44336'}}>DELETE</Text>
          </TouchableOpacity>

        </View>

        {/* MODAL FOR PICK IMAGE */}
        <Modal visible={this.state.showModal}
          animationType={'fade'}
          transparent backgroundColor='transparent'
          onRequestClose={() => true}>

          <View style={styles.modalKeluhanContainer}>
            <View style={styles.modalKeluhanContentContainer}>

              <View style={styles.modalKeluhanTitle}>
                <Text style={styles.modalKeluhanTitleFont}>Choose Pictures</Text>
              </View>

              <View style={styles.modalPilih}>
                <TouchableOpacity style={styles.modalTextButton} onPress={this._uploadPictureCamera}>
                  <Text style={styles.modalTextPilih}>Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalTextButton} onPress={this._uploadPictureGallery}>
                  <Text style={styles.modalTextPilih}>Galery</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.modalButtonCancel} onPress={this.handleModal}>
                <Text style={{fontSize: 20, color: '#2979FF'}}>Cancel</Text>
              </TouchableOpacity>

            </View>
          </View>
        </Modal>

      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF'
    },
    title: {
      fontSize: 21,
      color: '#01C6B2',
      fontFamily: 'BrandonText-Bold'
    },
    content: {
      flex: 1,
      backgroundColor: '#FFFFFF'
    },
    ungguhGambar: {
      width: 130,
      height: 130,
      backgroundColor: '#F5F5F5',
      borderColor: '#DEDEDE',
      borderRadius: 2,
      borderWidth: 1,
      marginRight: 8,
      justifyContent: 'center',
      alignItems: 'center'
    },
    imgRespon: {
      width: 130,
      height: 130,
      borderRadius: 2,
      borderWidth: 1,
    },
    textUnggah: {
      marginTop: 15,
      fontSize: 11,
      color: '#95989A',
      fontFamily: 'BrandonText-Regular'
    },
    formEvent: {
      height: 45,
      width: '100%',
      paddingLeft: 10,
      flexDirection: 'row',
      alignItems: 'center'
    },
    formDescription: {
      width: '100%',
      paddingLeft: 10,
      flexDirection: 'row',
      alignItems: 'center',
      height: 'auto',
      minHeight: 45
    },
    textInputDescription: {
      width: '85%',
      alignItems: 'center',
      fontSize: 16,
      color: '#212121',
      marginLeft: 16,
      marginBottom: 12,
      paddingTop: 16,
      fontFamily: 'BrandonText-LightItalic'
    },
    line: {
      width: '100%',
      height: 1,
      backgroundColor: '#DEDEDE'
    },
    textInput: {
      width: '85%',
      height: 45,
      alignItems: 'center',
      fontSize: 16,
      color: '#212121',
      marginLeft: 16,
      paddingTop: 12,
      fontFamily: 'BrandonText-LightItalic'
    },
    dateInput: {
      fontSize: 16,
      alignItems: 'center',
      fontFamily: 'BrandonText-LightItalic',
      marginLeft:16
    },
    modalKeluhanContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    modalKeluhanContentContainer: {
      width: width / 1.4,
      height: 200,
      backgroundColor: '#FFFFFF',
      elevation: 2,
      shadowOpacity: 0.2,
      shadowRadius: 0,
      shadowOffset: {
        height: 1,
        width: 0
      },
      shadowColor: '#000000',
      marginTop: 8,
      marginBottom: 8,
      marginLeft: 8,
      marginRight: 8,
      borderRadius: 5,

    },
    modalButtonCancel: {
      width: width / 1.4,
      alignItems: 'center',
      position: 'absolute',
      bottom: 0,
      height: 45,
      borderTopWidth: 2,
      borderColor: '#F5F5F5',
      paddingTop: 5
    },
    modalPilih: {
      paddingLeft: 30,
      paddingTop: 20
    },
    modalTextPilih: {
      fontFamily: 'BrandonText-Light',
      fontSize: 16
    },
    modalKeluhanTopContent: {
      flex: 3,
      alignItems: 'center',
      justifyContent: 'center'
    },
    modalKeluhanTitle: {
      alignItems: 'center'
    },
    modalKeluhanTitleFont: {
      fontFamily: 'BrandonText-Black',
      fontSize: 18,
      fontWeight:'bold',
      marginTop: 10
    },
    modalKeluhanContentFont: {
      fontFamily: 'BrandonText-Light'
    },
    modalTextButton: {
      height: 45
    },
    belumDitanggapi: {
      width: 24,
      height: 24
    },
    viewBelumDitanggapi: {
      position: 'absolute',
      top:5,
      right: 5
    },
    viewRowScroll: {
      flexDirection: 'row',
      marginTop: 16,
      marginBottom: 16
    },
    buttonChange: {
      height:50,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor: '#2196F3',
      elevation: 1
    },
    buttonDelete: {
      marginTop:5,
      marginBottom:5,
      height:50,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor: '#FFFFFF',
      borderWidth: 0.5,
      borderColor: '#F44336',
      elevation: 1
    }
})

const editEvent = gql`
  mutation editEvent($edit_event: EventObject!) {
    editEvent(event: $edit_event) {
      ok
      errors {
        message
      }
    }
  }
`;

const deleteEvent = gql`
  mutation deleteEvent($EventId: ID!) {

    deleteEvent(EventId: $EventId) {
      ok
      errors {
        message
      }
    }
  }
`;

export default compose(
  graphql(editEvent, {
    props: ({mutate}) => ({
      editData: (edit_event) => mutate({
        variables: { ...edit_event }
      })
    })
  }),
  graphql(deleteEvent, {
    props: ({mutate}) => ({
      deteleData: (EventId) => mutate({
        variables: { EventId }
      })
    })
  }),
)(EditEvent)

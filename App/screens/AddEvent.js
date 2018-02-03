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
  Button
} from 'react-native'
import { Icon } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'
import * as Crop from 'react-native-image-crop-picker'

let {width,height} = Dimensions.get('window')

export default class AddEvent extends Component<{}> {

  constructor(){
    super()
    this.state = {
      // tempPictures: ['file:///data/user/0/com.eventmanager/cache/react-native-image-crop-picker/343e3adf-35a3-45ca-88d9-6103fd387940.jpg'],
      tempPictures: [],
      title: '',
      description: '',
      showModal: false
   }
  }

 componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backNavigation)
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this.backNavigation)
  }

  backNavigation = () => {
    Actions.pop()
  }

  handleModal = () => this.setState(prevState => ({ showModal: !prevState.showModal }))

  onChangeTitle = title => this.setState({ title })

  onChangeDescription = description => this.setState({ description })

  deletePicture = (index) => {
    this.setState(prevState => {
      return {
        tempPictures: prevState.tempPictures.filter((data,i) =>  index !== i)
      }
    })
  }

  _uploadPictureCamera = async() => {
    try {
      const image = await Crop.default.openCamera({width: width, height: width+(width*0.35), cropping: true})
      const postData = new FormData()
      postData.append('file', { uri: image.path, type: 'image/jpg', name: 'qluster.jpg' })
      this.setState(prevState => ({ tempPictures:[image.path,...prevState.tempPictures] }), this.handleModal())
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
      this.setState(prevState => ({ tempPictures:[image.path,...prevState.tempPictures] }), this.handleModal())
    }
    catch(err) {
      this.handleModal()
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>

          <ScrollView>
            <ScrollView horizontal={true} style={{marginLeft:10, marginRight:10}}>
              <View style={styles.viewRowScroll}>
                {this.state.tempPictures.map((item, index) => (
                  <View key={index} style={{marginRight:8}}>
                    <Image source={{uri:item}} style={styles.imgRespon} />
                    <TouchableOpacity style={styles.viewBelumDitanggapi}
                      onPress={() => this.deletePicture(index)}>
                      <Icon
                        name='close-circle-outline'
                        type='material-community'
                        color='#C62828'
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
                placeholder='Title'
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
                placeholder='Description'
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
          </ScrollView>

          <TouchableOpacity style={styles.buttonAdd} onPress={this._onPressButton}>
            <Text style={{fontSize:15,fontWeight:'bold',color:'#FFFFFF'}}>ADD</Text>
          </TouchableOpacity>

        </View>

        {/* MODAL FOR PICK IMAGE */}
        <Modal visible={this.state.showModal}
          animationType={'fade'}
          transparent backgroundColor='transparent'
          onRequestClose={() => console.log('close')}>

          <View style={styles.modalKeluhanContainer}>
            <View style={styles.modalKeluhanContentContainer}>

              <View style={styles.modalKeluhanTitle}>
                <Text style={styles.modalKeluhanTitleFont}>Pilih gambar</Text>
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
      flex: 1
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
      backgroundColor: '#F2F2F2',
      borderColor: '#DEDEDE',
      borderRadius: 5,
      borderWidth: 1,
      marginRight: 8,
      justifyContent: 'center',
      alignItems: 'center'
    },
    imgRespon: {
      width: 130,
      height: 130,
      borderRadius: 5,
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
      borderColor: '#EEEEEE',
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
      top:2,
      right: 5
    },
    viewRowScroll: {
      flexDirection: 'row',
      marginTop: 16,
      marginBottom: 16
    },
    buttonAdd: {
      height:50,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor: '#2196F3',
    }
})

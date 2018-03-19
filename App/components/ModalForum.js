import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
} from 'react-native'
import {
  Icon
} from 'react-native-elements'

import {Actions} from 'react-native-router-flux'

class ModalForum extends Component<{}> {

  render() {
    const {
      closeModal,
      handleAdd,
      isShow,
      handleOnChange
    } = this.props
    return(
      <Modal
        animationType="slide"
        transparent
        visible={isShow}
        onRequestClose={()=>{}}>

        <View style={styles.container}>
          <View style={styles.form}>
            <View style={styles.headerContainer}>
              <Text style={styles.title}>New Forum</Text>
              <Icon
                name='close'
                color='#2196F3'
                size={20}
                containerStyle={styles.close}
                onPress={closeModal}
              />
            </View>
            <View style={styles.search}>
              <Icon
                name='title'
                type='material-icons'
                color='#4fc3f7'
                size={24}
              />
              <TextInput
                name='title'
                placeholder='Title...'
                placeholderTextColor={'#BDBDBD'}
                underlineColorAndroid='transparent'
                onChangeText={(title) => handleOnChange('title',title)}
                style={styles.textInputSearch} />
            </View>
            <View style={styles.search}>
              <Icon
                name='description'
                type='material-icons'
                color='#4fc3f7'
                size={24}
              />
              <TextInput
                name='title'
                placeholder='Description...'
                placeholderTextColor={'#BDBDBD'}
                underlineColorAndroid='transparent'
                onChangeText={(content) => handleOnChange('content',content)}
                style={styles.textInputSearch} />
            </View>
            <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
              <Text style={{fontSize:14,fontWeight:'bold',color:'#FFFFFF'}}>ADD</Text>
            </TouchableOpacity>
          </View>
        </View>

      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom:10,
    marginTop:10
  },
  title: {
    fontSize:16,
    fontWeight:'bold',
    color:'#2196F3',
  },
  close: {
    position: 'absolute',
    top: 0,
    right: 5
  },
  form: {
    width: '90%',
    elevation:5,
    zIndex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor:'#FFFFFF',
  },
  search: {
    height: 60,
    width: '100%',
    paddingLeft: 10,
    flexDirection: 'row',
    borderTopWidth:1,
    borderBottomWidth:1,
    borderColor: '#E0E0E0'
  },
  textInputSearch: {
    flex:1,
    height: 60,
    fontSize: 16,
    color: '#212121',
    fontFamily: 'Roboto',
    marginLeft: 5
  },
  buttonAdd: {
    height:50,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#2196F3',
  }

})

export default ModalForum

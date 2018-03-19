import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  Modal,
  TouchableOpacity,
  TextInput,
  BackHandler
} from 'react-native'
import {
  Icon
} from 'react-native-elements'

import {Actions} from 'react-native-router-flux'

class ModalMembers extends Component<{}> {

  render() {
    const {
      hideModal,
      handleAdd,
      handleSeach,
      isShow,
      onChangeContent,
      user
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
            <Text style={styles.title}>New Member</Text>
            <Icon
              name='close'
              color='#2196F3'
              size={20}
              containerStyle={styles.close}
              onPress={hideModal}
            />
          </View>
            <View style={styles.search}>
              <Icon
                name='account-search'
                type='material-community'
                color='#4fc3f7'
                size={40}
              />
              <TextInput
                name='search'
                placeholder='Email...'
                placeholderTextColor={'#BDBDBD'}
                underlineColorAndroid='transparent'
                onChangeText={onChangeContent}
                style={styles.textInputSearch} />
            </View>
            <View>
              {
                user && user.email &&
                <View>
                  <View style={styles.leader}>
                    <Image style={styles.picture} source={{uri:user.profilePicture}}></Image>
                    <View style={styles.titleContainer}>
                      <Text sytle={{alignSelf:'center'}}>{user.email}</Text>
                    </View>
                  </View>
                  <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
                    <Text style={{fontSize:15,fontWeight:'bold',color:'#FFFFFF'}}>ADD</Text>
                  </TouchableOpacity>
                </View>
              }
            </View>
            <View style={{ flex:1, backgroundColor:'#FFFFFF',justifyContent:'center',alignItems:'center', flexDirection: 'column' }}>
              <Icon
                name='account-off'
                type='material-community'
                color='#BDBDBD'
                size={70}
              />
            </View>
            {
              !user.email &&
              <TouchableOpacity style={styles.buttonAdd} onPress={handleSeach}>
                <Text style={{fontSize:15,fontWeight:'bold',color:'#FFFFFF'}}>SEARCH</Text>
              </TouchableOpacity>
            }

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
    alignItems: 'center'
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
    width: '80%',
    elevation:5,
    zIndex: 9,
    flexDirection: 'column',
    backgroundColor:'#FFFFFF',
  },
  form: {
    width: '80%',
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
  },
  leader: {
    height: 60,
    paddingLeft:5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  picture : {
    width:40,
    height:40,
    borderRadius: 35,
    borderWidth: 0.5,
    borderColor: '#E0E0E0',
    marginRight:10,
    borderWidth:1,
    justifyContent: 'center',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center'
  },
})

export default ModalMembers

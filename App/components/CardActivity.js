import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  AsyncStorage
} from 'react-native'
import {
  Icon,
} from 'react-native-elements'
import {Actions} from 'react-native-router-flux'
import Swiper from 'react-native-swiper'
import moment from 'moment'
import { convert } from '../lib/helpers'

const {width, height} = Dimensions.get('window')
const imageWidth = width - width * 0.1
const imageHeight = width - width * 0.1

const CardActivity = ({item,index,parent}) => {

  const {
    id,
    pictures,
    isIncome,
    value,
    user,
    description,
    verified,
    createdAt
  } = item
  console.log('item',item);
  const {
    isOpen,
    handleModal,
    sIndex,
    _panResponder,
    editable
  } = parent

  const title = isIncome ? 'INCOME' : 'EXPENSE'
  const titleColor = isIncome ? '#00C853' : '#DD2C00'
  const iconName = isIncome ? 'basket-fill' : 'basket-unfill'
  const verifiedIcon = verified ? 'verified' : 'unverified'
  const verifiedColor = verified ? '#00C853' : '#F57C00'
  const status = verified ? 'Verified' : 'Unverified'


  return(
    <View style={styles.container}>
      {
        (isOpen && sIndex==index) &&
        <View style={styles.modalContainer}>
          <TouchableOpacity style={[styles.optionContainer,{marginBottom: 10}]} onPress={() => handleModal({type: 'edit',item})}>
            <Text style={styles.optionsText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.optionContainer,{marginTop: 10}]} onPress={() => handleModal({type: 'delete',id})}>
            <Text style={styles.optionsText}>Delete</Text>
          </TouchableOpacity>
        </View>
      }

      <View style={styles.headerContainer}>
        <View style={{flex: 1}} />
        <View style={{flex: 5, alignItems: 'center'}}>
          <Text style={[styles.headerText,{color:titleColor}]}>{title}</Text>
        </View>
        {
          editable ?
          <TouchableOpacity style={{flex:1,height:60, justifyContent: 'center',}} onPress={() => handleModal({ type: 'show', index })}>
            <Icon
              name='dots-vertical'
              type='material-community'
              color={'#616161'}
              />
          </TouchableOpacity>
          :
          <View style={{flex:1,height:60, justifyContent: 'center',}} />
        }

      </View>
      {
        pictures.length !== 0 &&
      <View>
        <View style={[styles.line,{marginBottom:10}]} />
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
                  backgroundColor: '#2979FF',
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  marginLeft: 6,
                  marginRight: 6,
                  marginTop: 6,
                  marginBottom: 0}} />}
            >
            { pictures.map((item, index) => (
              <View style={styles.slide} key={item.id}>
                <Image source={{uri: item.path}} style={styles.imageEvent} />
              </View>
            ))}
          </Swiper>
        </View>
      </View>
      }
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Rp. {convert(value)}</Text>
        <View style={{flexDirection:'row', justifyContent:'space-around',justifyContent:'center'}}>
          <Icon
            name={verifiedIcon}
            type='octicon'
            color={verifiedColor}
            />
            <Text style={styles.verifiedText}>{status}</Text>
        </View>

      </View>

      <View style={styles.line} />

      <View>
        <View style={styles.detailContentText}>
          <Text style={styles.dataText}>{description}</Text>
        </View>

        <View style={styles.line} />

        <View style={styles.detailContentText}>
          <Icon
            name='user'
            type='font-awesome'
            color='#616161'
            />
          <Text style={styles.dataText}>{user.firstName +" "+user.lastName}</Text>
        </View>
        <View style={styles.detailContentText}>
          <Icon
            name='calendar'
            type='material-community'
            color='#616161'
            />
          <Text style={styles.dataText}>{moment(createdAt).format('LL')}</Text>
        </View>
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
    zIndex: 999,
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
  headerContainer: {
    height : 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation:2
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  swiperContainer: {
    height: 300
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
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#DEDEDE'
  },
  totalContainer: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#263238',
    alignSelf: 'center'
  },
  verifiedText: {
    fontSize: 14,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginLeft:5
  },
  detailContentText: {
    flexDirection: 'row',
    paddingLeft: 10,
    marginTop: 10,
    marginBottom: 10
  },
  dataText :{
    marginLeft: 5,
  }
})

export default CardActivity

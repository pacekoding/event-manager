import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Picker
} from 'react-native'
import {
  Icon,
  Card,
} from 'react-native-elements'
import {Actions} from 'react-native-router-flux'
import Swiper from 'react-native-swiper'

const {width, height} = Dimensions.get('window')
const imageWidth = width - width * 0.1
const imageHeight = width - width * 0.1

const CardEvent = ({item,nav}) => {
  if(nav === 'events') {
    const {title,pictures,content,dueDate} = item

    // dueDate = 20
    const dueDateText = dueDate <= 100 && `${dueDate} days left!`
    const dueDateColor = dueDate > 7 ? '#00C853' : dueDate > 3 ? '#F57C00' : '#D50000'

    return(
      <View style={styles.container}>

        <View style={styles.swiperContainer}>
          <Icon
            containerStyle={styles.dateIcon}
            raised
            name='gear'
            type='font-awesome'
            color='#FFFFFF'
            size={20}
            onPress={() => Actions.setting()} />
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
            dueDateText &&
            <View style={[styles.dueDateIcon,{backgroundColor: dueDateColor}]}>
              <Icon
                name='clock-alert'
                type='material-community'
                color='#FFFFFF'
                size={18}/>
              <Text style={styles.dueDateText}>{dueDateText}</Text>
            </View>
          }
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.descriptionText}>{content}</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.cardButtonContainer}>
          <TouchableOpacity style={styles.optionContainer} onPress={() => Actions.forum()} >
            <Text style={[styles.optionText,{color: '#2962FF'}]}>Forum</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionContainer} onPress={() => Actions.management()} >
            <Text style={[styles.optionText,{color: '#00C853'}]}>Management</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  } else {

    const {
      type,
      images,
      total,
      date,
      group,
      detail,
      isVerified
    } = item

    const titleColor = type === 'INPUT' ? '#00C853' : '#DD2C00'
    const iconName = type === 'INPUT' ? 'basket-fill' : 'basket-unfill'
    const noImage = images.length == 0
    const verifiedIcon = isVerified ? 'verified' : 'unverified'
    const verifiedColor = isVerified ? '#00C853' : '#F57C00'
    const status = isVerified ? 'Verified' : 'Unverified'

    return(
      <View style={[styles.container,{height: noImage ? 250: 450}]}>
        <View style={styles.headerContainer}>
          <Text style={[styles.headerText,{color:titleColor}]}>{type}</Text>
          <Picker
          enabled = {true}
          mode={'dropdown'}
          style={{alignSelf:'flex-end'}}
          selectedValue={'test'}
          onValueChange={(itemValue, itemIndex) => {}}>
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>
        </View>
        <View style={[styles.line,{marginBottom:10}]} />
        {
          images.length !== 0 &&
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
            { images.map((item, index) => (
              <View style={styles.slide} key={index}>
                <Image source={{uri: item}} style={styles.imageEvent} />
              </View>
            ))}
          </Swiper>
        </View>
        }
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Rp.{total}</Text>
          <View style={{flexDirection:'row', justifyContent:'space-around',justifyContent:'center'}}>
            <Icon
              name={verifiedIcon}
              type='octicon'
              color={verifiedColor}
              />
              <Text style={styles.verifiedText}>{status}</Text>
          </View>

        </View>

        <View style={[styles.line, {marginBottom: 10}]} />

        <View style={{height:100}}>
          <View style={styles.detailContentText}>
            <Icon
              name={iconName}
              type='material-community'
              color='#616161'
              />
            <Text style={styles.dataText}>{detail}</Text>
          </View>

          <View style={styles.detailContentText}>
            <Icon
              name='group-work'
              type='material-icons'
              color='#616161'
              />
            <Text style={styles.dataText}>{group}</Text>
          </View>
          <View style={styles.detailContentText}>
            <Icon
              name='calendar'
              type='material-community'
              color='#616161'
              />
            <Text style={styles.dataText}>{date}</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 450,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    borderRadius:2,
    backgroundColor: '#FAFAFA',
    shadowColor: '#000000',
    shadowOpacity: 1.0,
    shadowRadius: 4,
    shadowOffset: {
      height: 2,
      width: 2
    },
    zIndex: 99,
    elevation: 3
  },
  headerContainer: {
    height : 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    zIndex:9,
    elevation:1
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  swiperContainer: {
    flex: 3
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
  dateText: {
    alignSelf: 'center',
    color: 'white',
    alignSelf: 'center',
    fontSize: 10,
    fontWeight: 'bold'
  },
  dueDateIcon: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 95,
    height: 25,
    position: 'absolute',
    bottom: 5,
    left: 5,
    borderRadius:2,
    zIndex: 99,
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: {
      height: 2,
      width: 2
    },
    elevation: 2
  },
  dueDateText: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 12,
    fontWeight: 'bold'
  },
  contentContainer: {
    flex:2,
    flexDirection: 'column',
    alignItems: 'flex-start',
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
    flex: 1,
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
  totalContainer: {
    flex: 1,
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
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  dataText :{
    marginLeft: 5,
  }
})

export default CardEvent

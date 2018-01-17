import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
} from 'react-native'
import {
  Card,
  Button,
  Icon,
  Divider
} from 'react-native-elements'
import {OptimizedFlatList} from 'react-native-optimized-flatlist'
import {Actions} from 'react-native-router-flux'

///data dummy
import {activities} from '../lib/dummy.js'

const {height,width} = Dimensions.get('window')

export default class Home extends Component<{}> {

  _renderItem = ({item}) => {
    const {
      type,
      total,
      date,
      image,
      group,
      detail
    } = item

    const titleColor = type === 'INPUT' ? '#00C853' : '#DD2C00'
    const iconName = type === 'INPUT' ? 'basket-fill' : 'basket-unfill'

    return(
      <Card
        title={type}
        titleStyle={{fontSize:25, color:titleColor}}
        containerStyle={styles.containerCard}
        imageStyle={{
          alignSelf: 'center',
          height: 150,
          width: 230
        }}
        imageProps={{resizeMode:'cover'}}
        image={image && {uri:image}}
        >
          <Text style={styles.contentText}>
            {`Rp.${total},00`}
          </Text>

          <View style={{flex:1,flexDirection:'row',}}>
            <Icon
              name={iconName}
              type='material-community'
              color='#616161'
              size={20}
              />
            <Text style={styles.dateText}>{detail}</Text>
          </View>

          <View style={{flex:1,flexDirection:'row'}}>
            <Icon
              name='group-work'
              type='material-icons'
              color='#616161'
              size={20}
              />
            <Text style={styles.dateText}>{group}</Text>
          </View>
          <View style={{flex:1,flexDirection:'row'}}>
            <Icon
              name='calendar'
              type='material-community'
              color='#616161'
              size={20}
              />
            <Text style={styles.dateText}>{date}</Text>
          </View>
          <Divider />
          <View style={styles.cardButtonContainer}>

            <View style={styles.iconContainer}>
              <Icon
              containerStyle={[styles.iconButton,{backgroundColor:'#FBC02D'}]}
                raised
                name='tooltip-edit'
                type='material-community'
                color='#FFFFFF'
                size={20}
                onPress={() => console.log('hello')} />
            </View>

            <View style={styles.iconContainer}>
              <Icon
              containerStyle={[styles.iconButton,{backgroundColor:'#DD2C00'}]}
                raised
                name='delete'
                type='material-community'
                color='#FFFFFF'
                size={20}
                onPress={() => console.log('hello')} />
            </View>

          </View>
      </Card>
    )
  }

  render(){
    return(
      <View style={styles.container}>
        <OptimizedFlatList
          style={{flex:1}}
          data={activities}
          keyExtractor ={(item, index) => index}
          renderItem={this._renderItem}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#f5f5f6',
    alignItems:'center'
  },
  containerCard: {
    width:width-50,
  },
  cardButtonContainer: {
    flex:1,
    flexDirection:'row',
    justifyContent:'space-around',
    marginTop:'2%'
  },
  iconContainer: {
    flex:1,
    justifyContent:'center',
  },
  iconButton: {
    marginLeft:'30%'
  },
  contentText: {
    alignSelf:'center',
    marginTop: 20,
    marginBottom: 50,
    fontSize:20,
    fontWeight:'bold',
    color:'#000000',
  },
  dateText:{
    padding: 5,
    color:'#616161'
  }
})

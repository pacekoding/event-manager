import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image
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
import {events} from '../lib/dummy.js'

export default class Home extends Component<{}> {

  _renderItem = ({item}) => {
    const {
      image,
      content,
      dueDate
    } = item

    const dueDateColor = dueDate > 7 ? '#616161' : dueDate > 3 ? '#FBC02D' : '#D50000'

    return(
      <Card
        title='Event Test'
        containerStyle={{flex:1}}
        imageStyle={{
          alignSelf: 'center',
          height: 200,
          width: 330,
        }}
        image={{uri:image}}>
          <Text style={styles.contentText}>
            {content}
          </Text>
          <View style={{flex:1,flexDirection:'row',marginBottom:10}}>
            <Icon
              name='timer-sand'
              type='material-community'
              color={dueDateColor}
              />
            <Text style={[styles.dueDateText,{color:dueDateColor}]}>{`due in ${dueDate} days`}</Text>
          </View>
          <Divider />
          <View style={styles.cardButtonContainer}>
            <View style={styles.iconContainer}>
              <Icon
                containerStyle={[styles.iconButton,{backgroundColor:'#00C853'}]}
                raised
                name='wallet'
                type='entypo'
                color='#FFFFFF'
                size={20}
                onPress={() => Actions.management()} />
            </View>

            <View style={styles.iconContainer}>
              <Icon
              containerStyle={[styles.iconButton,{backgroundColor:'#0091EA'}]}
                raised
                name='forum'
                type='material-community'
                color='#FFFFFF'
                size={20}
                onPress={() => Actions.forum()} />
            </View>

            <View style={styles.iconContainer}>
              <Icon
              containerStyle={[styles.iconButton,{backgroundColor:'#424242'}]}
                raised
                name='gear'
                type='font-awesome'
                color='#FFFFFF'
                size={20}
                onPress={() => Actions.setting()} />
            </View>

          </View>
      </Card>
    )
  }

  render(){
    return(
      <View style={styles.container}>
        <OptimizedFlatList
          data={events}
          keyExtractor ={(item, index) => index}
          renderItem={this._renderItem}
        />
        <Icon
          containerStyle={styles.addButton}
          raised
          name='add'
          type='material-icons'
          color='#FFFFFF'
          size={28}
          onPress={() => Actions.modalAdd()} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#EEEEEE',
    alignItems:'center'
  },
  addButton: {
    position: 'absolute',
    bottom:'2%',
    right:'2%',
    backgroundColor:'#F50057'
  },
  cardButtonContainer: {
    flex:1,
    flexDirection:'row',
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
    marginBottom: 10,
    color:'#000000',
    backgroundColor:'#FAFAFA'
  },
  dueDateText:{
    padding: 5
  }
})

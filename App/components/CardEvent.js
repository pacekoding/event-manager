import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native'
import {Actions} from 'react-native-router-flux'
import {
  Icon,
  Card,
  Divider
} from 'react-native-elements'

const CardEvent = ({item,nav}) => {
  console.log(nav);
  if(nav === 'events') {
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

  else if(nav == 'activities') {

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
        containerStyle={{flex:1}}
        imageStyle={{
          alignSelf: 'center',
          height: 200,
          width: 330,
        }}
        image={{uri:image}}>
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

  else return <View />
}

const styles = StyleSheet.create({
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
  },
  contentTextActivities: {
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

export default CardEvent

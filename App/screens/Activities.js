import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  RefreshControl
} from 'react-native'
import {
  Card,
  Button,
  Icon,
  Divider
} from 'react-native-elements'
import {OptimizedFlatList} from 'react-native-optimized-flatlist'
import {Actions} from 'react-native-router-flux'

//components
import {AddButton, CardEvent} from '../components'
///data dummy
import {activities} from '../lib/dummy.js'

const {height,width} = Dimensions.get('window')

export default class Activities extends Component<{}> {

  constructor () {
    super()
    this.state = {
      activities: [],
      isFetching: false
    }
  }

  componentDidMount () {
    this.fetchData()
  }

  fetchData () {
    setTimeout(() => {
      this.setState({activities, isFetching: false})
    },2000)
  }

  _onRefresh = () => {
    this.setState({isFetching:true},() => this.fetchData())
  }

  _refreshControl () {
    return <RefreshControl
        refreshing={this.state.isFetching}
        onRefresh={this._onRefresh}
        title="Pull to refresh"
        tintColor="#fff"
        titleColor="#fff"
        colors={['#F50057','#00C853','#0091EA']}
     />
  }

  _renderItem = ({item}) => {
    return <CardEvent item={item} nav={'activities'} />
  }
  
  render(){
    return(
      <View style={styles.container}>
        <OptimizedFlatList
          style={{flex:1}}
          data={activities}
          keyExtractor={(item, index) => index}
          renderItem={this._renderItem}
          refreshControl={this._refreshControl()}
        />
        <AddButton />
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

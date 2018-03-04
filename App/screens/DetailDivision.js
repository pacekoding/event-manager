import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  BackHandler
} from 'react-native'
import {
  Button,
  Icon
} from 'react-native-elements'
import {OptimizedFlatList} from 'react-native-optimized-flatlist'
import {Actions} from 'react-native-router-flux'
///data dummy
import {people} from '../lib/dummy.js'

//components
import {AddButton, CardProfile} from '../components'

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class DetailDivision extends Component<{}> {

  constructor (props) {
    super()
    this.state = {
      people: [],
      isFetching: false
    }
  }
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backNavigation)
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this.backNavigation)
  }


  componentDidMount () {
    this.fetchData()
  }

  backNavigation = () => {
    Actions.pop()
    return true
  }

  fetchData () {
    setTimeout(() => {
      this.setState({people, isFetching: false})
    },1000)
  }

  _renderItem = ({item}) => {
    return <CardProfile item={item} />
  }


  render () {
    const {people, isFetching} = this.state
    return(
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Event Division Members</Text>
          </View>
          <OptimizedFlatList
            data={people}
            keyExtractor={(item, index) => index}
            renderItem={this._renderItem}
          />
        </View>
        <AddButton value={this.state.value} />
      </View>
    )
  }
}

export default DetailDivision



const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#FFFFFF'
  },
  content: {
    flex:1,
    paddingLeft: 20,
  },
  titleContainer: {
    height:50,
    justifyContent: 'center'
  },
  titleText: {
    color: '#9E9E9E',
  }
})

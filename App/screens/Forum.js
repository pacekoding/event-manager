import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  BackHandler
} from 'react-native'
import {OptimizedFlatList} from 'react-native-optimized-flatlist'
import {Actions} from 'react-native-router-flux'
///data dummy
import {forums} from '../lib/dummy.js'

//components
import {AddButton, CardForum} from '../components'

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class DetailDivision extends Component<{}> {

  constructor (props) {
    super()
    this.state = {
      forums: [],
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
      this.setState({forums, isFetching: false})
    },1000)
  }

  _renderItem = ({item}) => {
    return <CardForum item={item} />
  }


  render () {
    const {forums, isFetching} = this.state
    return(
      <View style={styles.container}>
        <OptimizedFlatList
          data={forums}
          keyExtractor={(item, index) => index}
          renderItem={this._renderItem}
        />
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
  }
})

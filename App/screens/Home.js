import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  RefreshControl
} from 'react-native'
import {
  Button,
  Icon
} from 'react-native-elements'
import {OptimizedFlatList} from 'react-native-optimized-flatlist'
///data dummy
import {events} from '../lib/dummy.js'

//components
import {AddButton, CardEvent} from '../components'

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Home extends Component<{}> {

  constructor (props) {
    super()
    this.state = {
      events: [],
      value: 0,
      isFetching: false
    }
  }

  componentDidMount () {
    this.fetchData()
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps) this.fetchData()
  }

  fetchData = async () => {
    // setTimeout(() => {
    //   this.setState({events:this.props.data.events, isFetching: false})
    //   // const dataUser = await AsyncStorage.getItem('dataUser')
    //   // userId = JSON.parse(dataUser).id
    //   userId = 'jdo7ks2s'
    // },1000)

    setTimeout(() => {
      this.setState({events, isFetching: false})
    },1000)
  }

  _renderItem = ({item}) => {
    return <CardEvent item={item} />
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

  handleScroll = (event) => {
    this.setState({value:event.nativeEvent.contentOffset.y})
  }

  render () {
    const {events, isFetching} = this.state
    console.log(this.props);
    return(
      <View style={styles.container}>
        <OptimizedFlatList
          data={events}
          keyExtractor={(item, index) => index}
          renderItem={this._renderItem}
          refreshControl={this._refreshControl()}
          onScroll={this.handleScroll}
        />
        <AddButton value={this.state.value} />
      </View>
    )
  }
}

let userId = ''

const Events = gql`
  query Events ($userId:ID!) {
    events (UserId: $userId) {
      id
      title
      content
      pictures {
        id
        path
      },
      eventDate,
      divisions {
        id
        name
        members {
          id
          email
          role {
            id
            name
          }
        profilePicture
        firstName
      }
    }
    management {
      members {
        id
        firstName
        profilePicture
      }
    }
  }
}
`;

export default graphql(Events, {
  options : { variables: { userId } }
})(Home);

// export default Home
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#EEEEEE'
  }
})

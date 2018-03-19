import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  RefreshControl,
  AsyncStorage,
  BackHandler
} from 'react-native'
import {
  Button,
  Icon
} from 'react-native-elements'
import {OptimizedFlatList} from 'react-native-optimized-flatlist'

//components
import {
  AddButton,
  CardEvent,
  Empty,
  Loading
} from '../components'

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Home extends Component<{}> {

  constructor (props) {
    super()
    this.state = {
      events: [],
      value: 0,
      isFetching: true
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.data.events) this.setState({events:nextProps.data.events, isFetching: false})
  }

  componentDidMount() {
     BackHandler.addEventListener('hardwareBackPress', this.backNavigation)
     this.props.refetch(this.props.UserId)
     console.log('masuk sini');
   }

   componentWillUnmount () {
     BackHandler.removeEventListener('hardwareBackPress', this.backNavigation)
   }

   backNavigation = () => {
     BackHandler.exitApp();
     return true;
   }

  _renderItem = ({item}) => {
    return <CardEvent item={item} isHide={false} />
  }

  handleScroll = (event) => {
    this.setState({value:event.nativeEvent.contentOffset.y})
  }

  render () {

    const {events, isFetching} = this.state
    const isEmpty = events.length === 0
    return(
      <View style={styles.container}>
        <Loading visible={isFetching}/>
        {
          !isFetching && !isEmpty ?
          <View style={{ flex:1 }}>
            <OptimizedFlatList
              data={events}
              keyExtractor={(item, index) => String(index)}
              renderItem={this._renderItem}
              onScroll={this.handleScroll}
            />
            <AddButton value={this.state.value} />
          </View>
          : !isFetching && isEmpty &&
          <View style={{ flex:1 }}>
            <Empty name={'clipboard-alert'} type={'material-community'} message={'Empty Data'} />
            <AddButton value={this.state.value} />
          </View>
        }
      </View>
    )
  }
}

const Events = gql `
  query Events ($UserId:ID!) {
    events (UserId: $UserId) {
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
    incomeExpense {
      id
      isIncome
      value
      description
      pictures {
        id
        path
      }
      user {
        id
        firstName
        lastName
      }
      verified
      verifiedBy {
        id
      }
      incomeExpenseDate
      createdAt
    }
    management {
      id
      members {
        id
        firstName
        profilePicture,
        role {
          id
          name
        }
      }
    }
  }
}
`;

export default graphql(Events, {
  options : (ownProps) => ({ variables: { UserId: ownProps.UserId || ''} }),
  props: ({ data, ownProps }) => ({
    refetch: (UserId) => {
      data.refetch({ UserId })
    },
    data,
    ...ownProps
  })
})(Home);

// export default Home
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#F5F5F5'
  }
})

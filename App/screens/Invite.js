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

class Invited extends Component<{}> {

  constructor (props) {
    super()
    this.state = {
      invitations: [],
      value: 0,
      isFetching: true
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.data.invitations) this.setState({invitations:nextProps.data.invitations, isFetching: false})
  }

  componentDidMount() {
     BackHandler.addEventListener('hardwareBackPress', this.backNavigation)
     this.props.refetch(this.props.UserId||'jdo7ks2s')
   }

   componentWillUnmount () {
     BackHandler.removeEventListener('hardwareBackPress', this.backNavigation)
   }

   backNavigation = () => {
     BackHandler.exitApp();
     return true;
   }

  _renderItem = ({item}) => {
    return <CardEvent item={item} isHide={true} />
  }

  handleScroll = (event) => {
    this.setState({value:event.nativeEvent.contentOffset.y})
  }

  render () {

    const {invitations, isFetching} = this.state
    const isEmpty = invitations.length === 0
    return(
      <View style={styles.container}>
        <Loading visible={isFetching}/>
        {
          !isFetching && !isEmpty ?
          <View style={{ flex:1 }}>
            <OptimizedFlatList
              data={invitations}
              keyExtractor={(item, index) => String(index)}
              renderItem={this._renderItem}
              onScroll={this.handleScroll}
            />
          </View>
          : !isFetching && isEmpty &&
          <View style={{ flex:1 }}>
            <Empty name={'clipboard-alert'} type={'material-community'} message={'Empty Data'} />
          </View>
        }
      </View>
    )
  }
}

const Invitations = gql `
  query Invitations ($UserId:ID!) {
    invitations (UserId: $UserId) {
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

export default graphql(Invitations, {
  options : (ownProps) => ({ variables: { UserId: ownProps.UserId || 'jdo7ks2s'} }),
  props: ({ data, ownProps }) => ({
    refetch: (UserId) => {
      data.refetch({ UserId })
    },
    data,
    ...ownProps
  })
})(Invited);

// export default Home
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#F5F5F5'
  }
})

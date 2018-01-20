import * as React from 'react'
import { AppRegistry } from 'react-native';
import App from './App';
import './ReactotronConfig'

import { ApolloClient } from 'apollo-client';
import { ApolloProvider,graphql } from 'react-apollo';
import { HttpLink, InMemoryCache } from 'apollo-client-preset'

const client = new ApolloClient({
    link: new HttpLink({uri:""}),
    cache: new InMemoryCache()
  }
);



const Root = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

AppRegistry.registerComponent('eventManager', () => Root);

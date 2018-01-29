import React, {Component} from 'react'
import {
  View,
  ScrollView,
  StyleSheet,
  BackHandler,
  Text
} from 'react-native'
import {
  Button,
  FormLabel,
  FormInput,
  FormValidationMessage
} from 'react-native-elements'
import {Actions} from 'react-native-router-flux'
import TextInput from 'react-native-material-textinput'

export default class AddEvent extends Component <{}> {
  constructor(){
    super()
    this.state = {
      name: ''
    }
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', () => this.handlePress() )
  }

  componentWillMount() {
    BackHandler.removeEventListener('hardwareBackPress',() => this.handlePress())
  }

  handleBackPress = () => {
    alert('test')
  }

  handleChange= (key,value) => {
    this.setState({[key]:value})
  }

  handlePress = () => {
    const {
      title,
      content,
      dueDate
    } = this.state

    this.setState({
      isEmptyTitle: title === '',
      isEmptyContent: content === '',
      isEmptyDueDate: dueDate === ''
    },() => this.sendRequest())
  }

  sendRequest = () => {
    const {
      isEmptyTitle,
      isEmptyContent,
      isEmptyDueDate
    } = this.state

    if(!isEmptyTitle || !isEmptyContent || isEmptyDueDate) Actions.tabBar()
  }

  render() {
    const {
      isEmptyTitle,
      isEmptyContent,
      isEmptyDueDate,
      name
    } = this.state

    return (
      <ScrollView scrollEnabled ={true} contentContainerStyle={styles.container}>
        <View><Text>asdf</Text></View>
        <View><Text>asdf</Text></View>
        <View><Text>asdf</Text></View>
        <View><Text>asdf</Text></View>
        <View><Text>asdf</Text></View>
        <View><Text>asdf</Text></View>
        <View><Text>asdf</Text></View>
        <View><Text>asdf</Text></View>
        <View><Text>asdf</Text></View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    justifyContent:'flex-start',
    backgroundColor: '#F5FCFF',
    padding:15,

  },
  formContainer: {
    flex:1,
    padding:15,
    flexDirection:'column',
    justifyContent:'flex-start',
  },
  buttonContainer: {
    flex:1,
    justifyContent:'flex-start',
  },
  buttonSubmit: {
    backgroundColor:'#0091EA',
    bottom:10,
  }
});

import React, {Component} from 'react'
import {
  View,
  StyleSheet,
  BackHandler
} from 'react-native'
import {
  Button,
  FormLabel,
  FormInput,
  FormValidationMessage
} from 'react-native-elements'
import {Actions} from 'react-native-router-flux'

export default class AddEvent extends Component <{}> {
  constructor(){
    super()
    this.state = {
      title:'',
      content: '',
      dueDate: '',
      isEmptyTitle:'',
      isEmptyContent:'',
      isEmptyDueDate:'',
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
      isEmptyDueDate
    } = this.state

    return (
      <View style={styles.container}>

      <View style={styles.formLogin}>

        <FormLabel>Title</FormLabel>
        <FormInput
          placeholder={'Title'}
          shake ={isEmptyTitle}
          onChangeText={value => this.handleChange('title',value)}/>
        <FormValidationMessage>{isEmptyTitle ? 'Enter an Email' : ''}</FormValidationMessage>

        <FormLabel>Content</FormLabel>
        <FormInput
          placeholder={'Content'}
          shake ={isEmptyContent} onChangeText={value => this.handleChange('content',value)}/>
        <FormValidationMessage>{isEmptyContent ? 'Enter a password' : ''}</FormValidationMessage>

        <FormLabel>Event Date</FormLabel>
        <FormInput
          placeholder={'Event Date'}
          shake ={isEmptyDueDate} onChangeText={value => this.handleChange('content',value)}/>
        <FormValidationMessage>{isEmptyDueDate ? 'Enter a password' : ''}</FormValidationMessage>

      </View>

      <View style={styles.buttonContainer}>
        <Button
          raised
          icon={{name: 'send', type:'material-community'}}
          buttonStyle={styles.buttonLogin}
          onPress={this.handlePress}/>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    backgroundColor: '#F5FCFF',
  },
  formLogin: {
    flex:1,
    flexDirection:'column',
    justifyContent:'center'
  },
  buttonContainer: {
    flex:1,
    justifyContent:'flex-start',
  },
  buttonLogin: {
    backgroundColor:'#0091EA',
    width:'50%',
    alignSelf:'center'
  }
});

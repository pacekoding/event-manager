import React, {Component} from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import {
  Button,
  FormLabel,
  FormInput,
  FormValidationMessage
} from 'react-native-elements'
import { Actions } from 'react-native-router-flux'

export default class Login extends Component<{}> {
  constructor(){
    super()
    this.state ={
      email:'',
      password:'',
      isEmptyEmail:false,
      isEmptyPassword:false,
    }
  }

  handleChange= (key,value) => {
    this.setState({[key]:value})
  }

  handlePress = () => {
    const { email, password } = this.state
    this.setState({
      isEmptyEmail: email === '',
      isEmptyPassword: password === ''
    },() => this.sendRequest())
  }

  sendRequest = () => {
    const { isEmptyEmail, isEmptyPassword } = this.state
    if(!isEmptyEmail || !isEmptyPassword) Actions.tabBar()
  }

  render() {
    const { isEmptyEmail, isEmptyPassword } = this.state
    return (
      <View style={styles.container}>

      <View style={styles.formLogin}>

        <FormLabel>Email</FormLabel>
        <FormInput
          placeholder={'Please enter your email...'}
          shake ={isEmptyEmail}
          onChangeText={value => this.handleChange('email',value)}/>
        <FormValidationMessage>{isEmptyEmail ? 'Enter an Email' : ''}</FormValidationMessage>

        <FormLabel>Password</FormLabel>
        <FormInput
          placeholder={'Please enter your password...'}
          shake ={isEmptyPassword} onChangeText={value => this.handleChange('password',value)}/>
        <FormValidationMessage>{isEmptyPassword ? 'Enter a password' : ''}</FormValidationMessage>

      </View>

      <View style={styles.buttonContainer}>
        <Button
          raised
          icon={{name: 'login', type:'material-community'}}
          buttonStyle={styles.buttonLogin}
          onPress={this.handlePress} />
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
    width:'50%',
    justifyContent:'flex-start',
    alignItems:'center'
  },
  buttonLogin: {
    backgroundColor:'#2196F3'
  }
});

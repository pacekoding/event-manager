import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Keyboard
} from 'react-native';
import {
  Icon
} from 'react-native-elements'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { Actions } from 'react-native-router-flux'
import {validateEmail} from '../lib/helpers'

class Login extends Component<{}> {
  constructor(){
    super()
    this.state ={
      email:'',
      password:'',
      isShow: false,
      isFetching: false
    }
  }

  handleShowPassword = () => {
    this.setState(prevState => ({ isShow: !prevState.isShow }))
  }

  validation = () => {
    const { email, password } = this.state
    const isEmptyEmail = !email
    const isEmptyPassword = !password
    const isValidEmail = validateEmail(email)
    if(isEmptyEmail) alert('Please input an email')
    else if(isEmptyPassword) alert('Please input a password')
    else if(!isValidEmail) alert('Please input a valid email')
    else this.setState({isFetching:true}, this.handleLogin)
  }

  handleLogin = async() => {
    const { email, password } = this.state
    const { submit } = this.props

    try {
      const res = await submit(email, password)
       if (res.data.login.ok) {
         // alert('Login Success!')
         const dataUser = res.data.login.user
         AsyncStorage.setItem('dataUser', JSON.stringify(dataUser))
         Actions.event({ type: 'replace', UserId: dataUser.id })
         Keyboard.dismiss()
       } else {
         this.setState({isFetching:false})
         const error = res.data.login.errors[0].message
         alert(error)
       }
    } catch(err) {
      console.log('error',err);
    }

  }

  render() {
    const { isEmptyEmail, isEmptyPassword,isFetching } = this.state
    if (isFetching)
     return <Loading visible={isFetching}/>
    return (
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Login</Text>
          </View>

          <View style={[styles.emailContainer,{ borderBottomWidth: 0.5, borderBottomColor: '#FAFAFA' } ]}>
            <Icon
              name='email'
              type='material-community'
              color={'#FFFFFF'}
              size={30}
            />
            <TextInput
              style={styles.emailText}
              placeholder= 'Email'
              placeholderTextColor= {'#FFFFFF'}
              underlineColorAndroid= 'transparent'
              onChangeText={(email) => this.setState({email})}
              value={this.state.email}
            />
          </View>

          <View style={[styles.emailContainer,{ borderBottomWidth: 0.5, borderBottomColor: '#FAFAFA' } ]}>
            <Icon
              name='lock'
              type='material-community'
              color={'#FFFFFF'}
              size={30}
            />
            <TextInput
              style={styles.emailText}
              placeholder= 'Password'
              placeholderTextColor= {'#FFFFFF'}
              underlineColorAndroid= 'transparent'
              secureTextEntry={!this.state.isShow}
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}
            />
            <TouchableOpacity style={{justifyContent:'center'}} onPress={this.handleShowPassword}>
              <Icon
                name={this.state.isShow ? 'eye-off-outline' : 'eye'}
                type='material-community'
                color={'#FFFFFF'}
                size={25}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button} onPress={this.validation}>
            <Text style={styles.loginText}>LOGIN</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.signUp} onPress={()=> Actions.register()}>
            <Text style={styles.registerText}>Register</Text>
          </TouchableOpacity>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#448AFF',
    justifyContent:'center',
    alignItems: 'center'
  },
  formContainer: {
    width: '90%',
    flexDirection: 'column',
    padding: 10,
  },
  emailContainer: {
    flexDirection: 'row',
  },
  titleContainer: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  emailText: {
    flex: 1,
    marginLeft: 10,
    color : "#FFFFFF"
  },
  button: {
    height: 45,
    borderRadius: 2,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  loginText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#448AFF',
  },
  registerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  signUp: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50
  }

});

const login = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      user{
        id,
        firstName,
        lastName,
        email
        profilePicture
      }
      errors {
        message
      }
    }
  }
`;

export default graphql(login, {
  props: ({mutate}) => ({
    submit: (email,password) => mutate({
      variables: { email, password }
    })
  })
})(Login)

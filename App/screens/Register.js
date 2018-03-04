import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  BackHandler
} from 'react-native'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import {
  Icon
} from 'react-native-elements'
import { Actions } from 'react-native-router-flux'
import {validateEmail} from '../lib/helpers'

class Register extends Component<{}> {
  constructor(){
    super()
    this.state ={
      name: '',
      email: '',
      password: '',
      confirm: '',
      isShow: false,
      isShowConfrim: false
    }
  }

  omponentWillMount() {
     BackHandler.addEventListener('hardwareBackPress', this.backNavigation)
   }

   componentWillUnmount () {
     BackHandler.removeEventListener('hardwareBackPress', this.backNavigation)
   }

   backNavigation = () => {
     Actions.pop()
     return true
   }

  handleShowPassword = () => {
    this.setState(prevState => ({ isShow: !prevState.isShow }))
  }

  handleShowPasswordConfirm = () => {
    this.setState(prevState => ({ isShowConfrim: !prevState.isShowConfrim }))
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  validation = () => {
    const { name, email, password, confirm } = this.state
    const isEmptyName = !name
    const isEmptyEmail = !email
    const isEmptyPassword = !password
    const isEmptyConfirm = !confirm
    const isValidEmail = this.validateEmail(email)

    if(isEmptyName) alert('Please input a name')
    else if(isEmptyEmail) alert('Please input an email')
    else if(isEmptyPassword) alert('Please input a password')
    else if(isEmptyConfirm) alert('Please input a confirm password')
    else if(!isValidEmail) alert('Please input a valid email')
    else this.handleRegister()
  }

  handleRegister = async() => {
    const { name, email, password } = this.state
    const firstName = name.split(' ')[0] || name
    const lastName = name.split(' ').slice(1).join(' ') || ''
    const { submit } = this.props

    const new_user = {
      firstName,
      lastName,
      email,
      password,
    }

    try {
      const res = await submit({ new_user })
       if (res.data.addUser.ok) {
         alert('Registration Success!')
         Actions.login()
       } else {
         const isError = res.data.addUser.errors[0].message.includes('email must be unique')
         alert(isError ? "Email already registered" : es.data.addUser.errors[0].message)
       }
    } catch(err) {
      console.log('error',err);
    }

  }

  render() {
    const { isEmptyEmail, isEmptyPassword } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Register</Text>
          </View>

          <View style={[styles.emailContainer,{ borderBottomWidth: 0.5, borderBottomColor: '#FAFAFA' } ]}>
            <Icon
              name='user'
              type='feather'
              color={'#FFFFFF'}
              size={30}
            />
            <TextInput
              style={styles.emailText}
              placeholder= 'Name'
              placeholderTextColor= {'#FFFFFF'}
              underlineColorAndroid= 'transparent'
              onChangeText={(name) => this.setState({name})}
              value={this.state.name}
            />
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

          <View style={styles.emailContainer}>
            <Icon
              name='lock-plus'
              type='material-community'
              color={'#FFFFFF'}
              size={30}
            />
            <TextInput
              style={styles.emailText}
              placeholder= 'Confirm password'
              placeholderTextColor= {'#FFFFFF'}
              underlineColorAndroid= 'transparent'
              secureTextEntry={!this.state.isShowConfrim}
              onChangeText={(confirm) => this.setState({confirm})}
              value={this.state.confirm}
            />
            <TouchableOpacity style={{justifyContent:'center'}} onPress={this.handleShowPasswordConfirm}>
              <Icon
                name={this.state.isShowConfrim ? 'eye-off-outline' : 'eye'}
                type='material-community'
                color={'#FFFFFF'}
                size={25}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button} onPress={this.validation}>
            <Text style={styles.loginText}>Register</Text>
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

const register = gql`
  mutation addUser($new_user: UserObject!) {
    addUser(user: $new_user) {
      ok
      user{
        id
      }
      errors {
        message
      }
    }
  }
`;

export default graphql(register, {
  props: ({mutate}) => ({
    submit: (new_user) => mutate({
      variables: { ...new_user }
    })
  })
})(Register)

import React, {Component} from 'react'
import {View, Animated, Easing} from 'react-native'
import {Icon} from 'react-native-elements'
import {Actions} from 'react-native-router-flux'

export default class AddButton extends Component<{}> {

  constructor () {
    super()
    this.state = {
      isHide: false
    }
    this.value = new Animated.Value(70)
  }

  componentWillReceiveProps (nextProps) {
    const {isHide} = this.state
    if(!isHide && (this.props.value + 3) < nextProps.value)
      this.handleChange('hide')
    if(isHide && this.props.value > (nextProps.value + 3))
      this.handleChange('show')
  }

  handleChange = (arg) => {
    const isHide = arg === 'hide'
    this.setState({isHide},() => {
      Animated.timing(
        this.value,
        {
          toValue: isHide ? 0 : 70,
          duration: 300,
          easing: Easing.linear
        }
      ).start()
    })
  }

  handlePress = () => {
    const { hideModal, type } = this.props
    if(hideModal) hideModal()
    if(type === 'activity') Actions.addActivity()
    else Actions.add()
  }

  render () {
    return(
      <Animated.View
        style={{
          height: this.value,
          width: this.value,
          borderRadius: this.value/2,
          position: 'absolute',
          bottom:'2%',
          right:'2%',
        }}>
        <Icon
          containerStyle={{
            backgroundColor:'#F50057'
          }}
          raised
          name='add'
          type='material-icons'
          color='#FFFFFF'
          size={28}
          onPress={this.handlePress} />
      </Animated.View>
    )
  }
}

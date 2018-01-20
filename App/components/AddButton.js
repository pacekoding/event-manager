import React from 'react'
import {Icon} from 'react-native-elements'
import {Actions} from 'react-native-router-flux'

const AddButton = () => {

  return(
    <Icon
      containerStyle={{
        position: 'absolute',
        bottom:'2%',
        right:'2%',
        backgroundColor:'#F50057'
      }}
      raised
      name='add'
      type='material-icons'
      color='#FFFFFF'
      size={28}
      onPress={() => Actions.modalAdd()} />
  )
}

export default AddButton

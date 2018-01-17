import React from 'react'
import { Icon } from 'react-native-elements'

const TabIcon = ({focused,tintColor,title}) => {

  const isMyEvents = title === 'MY EVENT'
  const isProfile = title === 'PROFILE'

  return(
    <Icon
      name={ isMyEvents ? 'clipboard-text' : isProfile ? 'account-circle' : 'briefcase'}
      type='material-community'
      color={tintColor}
      size={30}
    />
  )
}

export default TabIcon

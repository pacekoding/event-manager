import React, {Component} from 'react'
import { Text } from 'react-native'
import { Router, Tabs, Scene, Modal } from 'react-native-router-flux'

import themeStyle from './config/style'

import Login from './screens/Login'
import Home from './screens/Home'
import Test from './screens/Test'
import Profile from './screens/Profile'
import Forum from './screens/Forum'
import Setting from './screens/Setting'

import AddEvent from './screens/AddEvent'
import Summary from './screens/Summary'
import Activity from './screens/Activity'

import TabIcon from './components/TabIcon'


const App  = () => {
  return(
    <Router>
      <Scene key='root'>

        <Scene key='login'
          hideNavBar
          component={Login}/>

          <Tabs key='tabBar'
            activeTintColor={themeStyle}
            navigationBarStyle={{backgroundColor:themeStyle}}
            titleStyle={{color:'#FFFFFF'}}
            tabBarPosition={'bottom'}
            showLabel={false}
            animationEnabled={false}
            swipeEnabled={false}
            hideNavBar
            initial
            icon={TabIcon}>

            <Scene key='homeTab1' title='MY EVENT'>
              <Scene
                key='event'
                component={Home}
              />
            </Scene>

            <Scene key='homeTab2' title='MY TASK'>
              <Scene
                key='tast'
                component={Test}
              />
            </Scene>

            <Scene key='homeTab3' title='PROFILE'>
              <Scene
                key='profile'
                component={Profile}
              />
            </Scene>

          </Tabs>

          <Scene key='management' title='Management'
            navigationBarStyle={{backgroundColor:themeStyle}}
            titleStyle={{color:'#FFFFFF'}}
            headerMode='none'
            >

            <Tabs key='ManagementTabBar'
              tabBarStyle={{backgroundColor:themeStyle}}
              labelStyle={{fontSize:10,fontWeight:'bold'}}
              tabBarPosition={'top'}
              >

              <Scene key='managementTab1' tabBarLabel='Summary'>
                <Scene
                  key='summary'
                  component={Summary}
                />
              </Scene>

              <Scene key='managementTab2' tabBarLabel='Activities'>
                <Scene
                  key='activities'
                  component={Activity}
                />
              </Scene>

              <Scene key='managementTab3' tabBarLabel='report'>
                <Scene
                  key='Test3'
                  component={Test}
                />
              </Scene>

            </Tabs>
          </Scene>

        <Scene
          key='forum'
          title='Forum'
          navigationBarStyle={{backgroundColor:themeStyle}}
          titleStyle={{color:'#FFFFFF'}}
          component={Forum}
        />

        <Scene
          key='setting'
          title='Setting'
          navigationBarStyle={{backgroundColor:themeStyle}}
          titleStyle={{color:'#FFFFFF'}}
          component={Setting}
        />

        {/*Modals*/}
        <Scene
          key="modalAdd"
          direction="vertical"
          title="Modal"
          component={AddEvent}
        />

      </Scene>
    </Router>
  )
}

export default App

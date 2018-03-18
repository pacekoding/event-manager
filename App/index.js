import React, {Component} from 'react'
import { StyleSheet, } from 'react-native'
import { Router, Tabs, Scene, Modal } from 'react-native-router-flux'

import themeStyle from './config/style'

import Splash from './screens/Splash'
import Register from './screens/Register'
import Login from './screens/Login'
import Home from './screens/Home'
import Invite from './screens/Invite'
import Test from './screens/Test'
import Profile from './screens/Profile'
import Forum from './screens/Forum'

import AddEvent from './screens/AddEvent'
import EditEvent from './screens/EditEvent'
import AddActivity from './screens/AddActivity'
import EditActivity from './screens/EditActivity'



import Summary from './screens/Summary'
import Activities from './screens/Activities'
import Teams from './screens/Teams'
import DetailDivision from './screens/DetailDivision'
import DetailForum from './screens/DetailForum'

import TabIcon from './components/TabIcon'


const App  = () => {
  return(
    <Router>
      <Scene key='root'>

      <Scene key='splash'
        hideNavBar
        component={Splash}
        initial
        />

        <Scene key='login'
          hideNavBar
          component={Login}
          />

          <Scene key='register'
            hideNavBar
            component={Register}
            />

          <Tabs key='homeTabBar'
            activeTintColor={themeStyle}
            tabBarPosition={'bottom'}
            showLabel={false}
            animationEnabled={false}
            swipeEnabled={false}
            hideNavBar
            icon={TabIcon}>

            <Scene key='homeTab1' title='Events'
              navigationBarStyle={styles.navbar}
              titleStyle={styles.title}
            >
              <Scene
                key='event'
                hideNavBar={false}
                hideTabBar={false}
                component={Home}
              />
            </Scene>

            <Scene key='homeTab2' title='Invites'
            >
              <Scene
                key='invite'
                navigationBarStyle={styles.navbar}
                titleStyle={styles.title}
                component={Invite}
              />
            </Scene>

            <Scene key='homeTab3' title='Profile'
            >
              <Scene
                key='profile'
                navigationBarStyle={styles.navbar}
                titleStyle={styles.title}
                component={Profile}
              />
            </Scene>

          </Tabs>

          <Scene key='management' title='Management'
            navigationBarStyle={{backgroundColor:themeStyle,elevation:0}}
            titleStyle={styles.title}
            headerMode='none'
            renderLeftButton={null}
            >

            <Tabs key='ManagementTabBar'
              tabBarStyle={{backgroundColor:themeStyle}}
              labelStyle={{fontSize:12,fontWeight:'bold'}}
              tabBarPosition={'top'}
              >

              <Scene key='managementTab1' tabBarLabel='Activities'>
                <Scene
                  key='activities'
                  component={Activities}
                />
              </Scene>

              <Scene key='managementTab2' tabBarLabel='report'>
                <Scene
                  key='Test3'
                  component={Summary}
                />
              </Scene>

            </Tabs>
          </Scene>

        <Scene
          key='forum'
          title='Forum'
          navigationBarStyle={{backgroundColor:themeStyle}}
          titleStyle={styles.title}
          renderLeftButton={null}
          component={Forum}
        />

        <Scene key='setting' title='Settings'
          navigationBarStyle={{backgroundColor:themeStyle,elevation:0}}
          titleStyle={styles.title}
          renderLeftButton={null}
          headerMode='none'
          >

          <Tabs key='SettingTabBar'
            tabBarStyle={{backgroundColor:themeStyle}}
            labelStyle={{fontSize:12,fontWeight:'bold'}}
            tabBarPosition={'top'}
            >

            <Scene key='settingTab1' tabBarLabel='Event'>
              <Scene
                key='editEvent'
                component={EditEvent}
              />
            </Scene>

            <Scene key='settingTab2' tabBarLabel='Team'>
              <Scene
                key='teams'
                component={Teams}
              />
            </Scene>

          </Tabs>
        </Scene>

        {/*AddEvent*/}
        <Scene
          key="add"
          direction="vertical"
          title="New Event"
          navigationBarStyle={{backgroundColor:themeStyle}}
          titleStyle={styles.title}
          renderLeftButton={null}
          component={AddEvent}
        />

        {/*AddActivity*/}
        <Scene
          key="addActivity"
          direction="vertical"
          title="New Activity"
          navigationBarStyle={{backgroundColor:themeStyle}}
          titleStyle={styles.title}
          renderLeftButton={null}
          component={AddActivity}
        />

        {/*EditActivity*/}
        <Scene
          key="editActivity"
          title="Edit Activity"
          navigationBarStyle={{backgroundColor:themeStyle}}
          titleStyle={styles.title}
          renderLeftButton={null}
          component={EditActivity}
        />

        {/*DetailDivision*/}
        <Scene
          key="detail"
          title="Division"
          navigationBarStyle={{backgroundColor:themeStyle}}
          titleStyle={styles.title}
          renderLeftButton={null}
          component={DetailDivision}
        />

        {/*DetailForum*/}
        <Scene
          key="comment"
          title="Detail Comment"
          navigationBarStyle={{backgroundColor:themeStyle,justifyContent:'center'}}
          titleStyle={styles.title}
          renderLeftButton={null}
          component={DetailForum}
        />

      </Scene>
    </Router>
  )
}

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: themeStyle,
    height:50,
    elevation:1,
    zIndex:1
  },
  title: {
    fontSize:20,
    fontWeight: 'bold',
    marginBottom:-10,
    color:'#FFFFFF',
    alignSelf:'center'
  }
})
export default App

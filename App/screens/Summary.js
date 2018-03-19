import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import moment from 'moment'
import {Actions} from 'react-native-router-flux'

import {
  StyleSheet,
  View,
  Text,
  processColor,
  Dimensions,
  AsyncStorage,
  BackHandler,
  ActivityIndicator
} from 'react-native'
import {
  Icon,
  Button,
} from 'react-native-elements'
import { LineChart } from 'react-native-charts-wrapper'
import { Dropdown } from 'react-native-material-dropdown'

import { convert } from '../lib/helpers'

const { width } = Dimensions.get('window')

class Summary extends Component<{}> {

  constructor(){
    super()
    this.state = {
      year: '2018',
      month: moment().month(),
      total: '',
      isFetching: true,
      data: {
        dataSets: [{
          values: [{y: 0}, {y: 0}, {y: 0}, {y: 0}],
          label: '',
          config: {
            lineWidth: 2,
            drawCubicIntensity: 1,
            circleRadius: 5,
            circleColor: processColor('#448AFF'),
            drawHighlightIndicators: false,
            color: processColor('#448AFF'),
            drawFilled: true,
            fillColor: processColor('#448AFF'),
            fillAlpha: 100,
            drawValues:false
          }
        }]
      },
      xAxis: {
        drawAxisLine:false,
        drawGridLines:false,
        valueFormatter: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        position: 'BOTTOM',
        label: "Week",
        spaceTop:'10%',
        spaceBottom:'10%',
        textColor:processColor('#616161')
      },
      yAxis: {
        left: {
          drawLabels:true,
          drawAxisLine:false,
          axisMinimum: 0,
          axisMaximum: 0,
          valueFormatter:'largeValue',
          textColor:processColor('#616161')
        },
        right: {
          enabled: false
        }
      },
      marker: {
       enabled: true,
       digits: 0,
       markerColor: processColor('#00B8D4'),
       textColor: processColor('white'),
     },
     language:'test'
   }
   this.year = [{
     value: '2018',
   }]

   this.month = [{
     value: 'January',
    }, {
     value: 'February',
    },  {
     value: 'March',
    },  {
     value: 'April',
    },  {
     value: 'May',
    },  {
     value: 'June',
    },  {
     value: 'July',
    },  {
     value: 'August',
    },  {
     value: 'September',
    },  {
     value: 'Oktober',
    },  {
      value: 'November',
    }, {
     value: 'December',
    },]
 }


  handleSelect = () => {
    // alert('OK!')
  }

  componentWillReceiveProps(nextProps) {
    const { EventId, refetch, data } = nextProps
    if(EventId) {
      // refetch(EventId)
    }
    if(data.report) {
      const total = data.report.total
      const axisMaximum = total + (total/2)

      this.setState(prevState => {
        const values = prevState.data.dataSets[0].values.map( (item,index) => ({y: data.report[`week${index+1}`] }) )

        return {
          data: { dataSets: [{...prevState.data.dataSets[0],values}] },
          yAxis: { left: { ...prevState.yAxis.left, axisMaximum }},
          total,
          isFetching: false,
        }
      })
    }
  }

  componentWillMount() {
     BackHandler.addEventListener('hardwareBackPress', this.backNavigation)
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this.backNavigation)
  }

  backNavigation = async () => {
    const dataUser = await AsyncStorage.getItem('dataUser')
    const UserId = JSON.parse(dataUser).id
    Actions.event({ type: 'replace', UserId })
    return true
  }

  handleYear = (year) => {
    this.setState({year})
  }

  handleMonth = (mo) => {
    const months = ['January','February', 'March', 'April','May','June','July','August','September','Oktober','November','December']
    month = months.findIndex((item => item == mo )) + 1
    this.setState({month, isFetching: true}, () => {
      const objectDate = month < 10 ? '2018-0'+ month : '2018-'+ month
      this.props.refetch(this.props.EventId,objectDate)
    })


  }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerSelect}>
          <Dropdown
            containerStyle={styles.selectedYear}
            pickerStyle={[styles.pickerStyle,{marginLeft:5}]}
            label='Year'
            value={'2018'}
            fontSize={18}
            animationDuration={150}
            dropdownPosition={this.year.length > 3 ? -5 : -2}
            data={this.year}
            onChangeText={ this.handleYear }
          />
          <Dropdown
            containerStyle={styles.selectedMonth}
            label='Month'
            value={moment().month(this.state.month).format('MMMM')}
            pickerStyle={styles.pickerStyle}
            fontSize={18}
            animationDuration={150}
            dropdownPosition={-5}
            data={this.month}
            onChangeText={ this.handleMonth }
          />
        </View>
        <View style={styles.containerChart}>
          <View style={styles.chartTitle}>
            <View>
              <Text style={styles.titleDigitsText}>Balance</Text>
              {
                this.state.isFetching ? <ActivityIndicator size="small" color="#0091EA" /> :
                <Text style={styles.digitsText}>{convert(this.state.total)}</Text>
              }
            </View>
          </View>
          <LineChart
            style={styles.chart}
            data={this.state.data}
            chartDescription={{text: ''}}
            marker={this.state.marker}
            xAxis={this.state.xAxis}
            yAxis={this.state.yAxis}
            drawGridBackground={false}
            borderColor={processColor('teal')}
            borderWidth={1}
            drawBorders={false}
            touchEnabled={true}
            dragEnabled={true}
            scaleEnabled={true}
            scaleXEnabled={false}
            scaleYEnabled={false}
            pinchZoom={false}
            doubleTapToZoomEnabled={false}
            dragDecelerationEnabled={true}
            dragDecelerationFrictionCoef={1}
            keepPositionOnRotation={false}
            onSelect={this.handleSelect.bind(this)}
            onChange={(event) => console.log(event.nativeEvent)}
          />
        </View>

      </View>
    );
  }
}

const Summeries = gql`
  query report($EventId: ID, $objectDate: IncExpObject){
    report(EventId: $EventId, objectDate: $objectDate){
      total
      week1
      week2
      week3
      week4
    }
  }
`

export default graphql(Summeries, {
  options : (ownProps) => ({ variables: { EventId: ownProps.EventId, objectDate: ownProps.objectDate } }),
  props: ({ data, ownProps }) => ({
    refetch: (EventId, objectDate) => {
      data.refetch({ EventId,objectDate })
    },
    data,
    ...ownProps
  })
})(Summary);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#F5F5F5',
  },
  containerSelect: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection:'row',
    backgroundColor: '#F5F5F5',
  },
  selectedYear: {
    flex: 1,
    marginLeft: 5,
    marginRight: 5
  },
  selectedMonth: {
    flex: 1,
    marginLeft: 5,
    marginRight: 5
  },
  pickerStyle: {
    width: width/2.2,
    marginLeft:15
  },
  containerChart: {
    flex: 5,
    backgroundColor: '#FFFFFF',
  },
  chartTitle: {
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    height: 70,
  },
  titleText: {
    fontSize:15,
    fontWeight:'bold',
    color:'#757575',
  },
  titleDigitsText: {
    fontSize:12,
    color:'#9E9E9E',
    fontWeight:'bold',
    alignSelf:'center',
  },
  digitsText: {
    fontSize:17,
    fontWeight:'bold',
    color:'#263238',
    alignSelf:'center',
  },
  chart: {
    flex: 1,
    backgroundColor: '#E3F2FD',
    borderRadius:5
  }
});

import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Text,
  processColor,
  Dimensions,
} from 'react-native'
import {
  Icon,
  Button,
} from 'react-native-elements'
import {LineChart} from 'react-native-charts-wrapper';
import { Dropdown } from 'react-native-material-dropdown';

const {width} = Dimensions.get('window')

export default class Summary extends Component<{}> {

  constructor(){
    super()
    this.state = {
      data: {
        dataSets: [{
          values: [{y: 10000000}, {y: 8000000}, {y: 7000000}, {y: 9000000}],
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
          axisMaximum: 15000000,
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
   },]

   this.month = [{
     value: 'January',
   }, {
     value: 'February',
   },  {
     value: 'Maret',
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
     value: 'Desember',
   },]
 }


  handleSelect = () => {
    // alert('OK!')
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
            dropdownPosition={this.year.length > 3 ? -5 : -2}
            data={this.year}
          />
          <Dropdown
            containerStyle={styles.selectedMonth}
            label='Month'
            value={'February'}
            pickerStyle={styles.pickerStyle}
            fontSize={18}
            dropdownPosition={-5}
            data={this.month}
          />
        </View>
        <View style={styles.containerChart}>
          <View style={styles.chartTitle}>
            <Text style={styles.titleText}>6 Weeks</Text>
            <View>
              <Text style={styles.titleDigitsText}>Balance</Text>
              <Text style={styles.digitsText}>Rp. 9.000.000</Text>
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#EEEEEE',
  },
  containerSelect: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection:'row',
    backgroundColor:'#FFFFFF',
    padding:5,
    // marginLeft: 5,
    // marginRight: 5,
    // marginTop: 5
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
    padding:5,
    // marginLeft: 5,
    // marginRight: 5,
    // marginBottom: 5,
  },
  chartTitle: {
    flexDirection:'row',
    justifyContent:'space-between',
    marginBottom:20
  },
  titleText: {
    fontSize:15,
    fontWeight:'bold',
    color:'#757575',
  },
  titleDigitsText: {
    fontSize:10,
    color:'#9E9E9E',
    fontWeight:'bold',
    alignSelf:'flex-end',
  },
  digitsText: {
    fontSize:17,
    fontWeight:'bold',
    color:'#263238'
  },
  chart: {
    flex: 1,
    backgroundColor: '#E3F2FD',
    borderRadius:5
  }
});

import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Text,
  processColor
} from 'react-native'
import {
  Icon,
  Button,
} from 'react-native-elements'
import {LineChart} from 'react-native-charts-wrapper';

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
            circleColor: processColor('#2979FF'),
            drawHighlightIndicators: false,
            color: processColor('#2979FF'),
            drawFilled: true,
            fillColor: processColor('#2979FF'),
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
     }
   }
 }


  handleSelect = () => {
    // alert('OK!')
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.containerSelect}>
          <View style={styles.selectedYear}>
            <Icon
              name='chevron-left'
              type='entypo'
              color='#FFFFFF'
              underlayColor='#79adfc'
              size={26}
              containerStyle={styles.iconContainer}
              onPress={() => console.log('hello')} />
              <Button
              backgroundColor={'transparent'}
              fontSize={16}
              containerViewStyle={{width:'50%'}}
              fontWeight={'bold'}
              title='2018' />
            <Icon
              name='chevron-right'
              type='entypo'
              color='#FFFFFF'
              underlayColor='#79adfc'
              size={26}
              containerStyle={styles.iconContainer}
              onPress={() => console.log('hello')} />
          </View>
          <View style={styles.selectedMonth}>
            <Icon
              name='chevron-left'
              type='entypo'
              color='#FFFFFF'
              underlayColor='#79adfc'
              size={26}
              containerStyle={styles.iconContainer}
              onPress={() => console.log('hello')} />
              <Button
              backgroundColor={'transparent'}
              fontSize={16}
              containerViewStyle={{width:'50%'}}
              fontWeight={'bold'}
              title='January' />
            <Icon
              name='chevron-right'
              type='entypo'
              color='#FFFFFF'
              underlayColor='#79adfc'
              size={26}
              containerStyle={styles.iconContainer}
              onPress={() => console.log('hello')} />
          </View>
        </View>

        <View style={styles.containerChart}>
          <View style={styles.chartTitle}><Text style={styles.titleText}>Balance Charts</Text></View>
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
    flex:1,
    flexDirection:'row',
    justifyContent:'space-around',
    padding:10,
  },
  selectedYear: {
    flex: 1.5,
    backgroundColor: '#F5FCFF',
    borderRadius:5,
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    backgroundColor:'#448AFF',
    marginRight:5
  },
  selectedMonth: {
    flex: 2,
    backgroundColor: '#F5FCFF',
    borderRadius:5,
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    backgroundColor:'#448AFF',
    marginLeft:5
  },
  selectedText: {
    color:'#FFFFFF',
    fontSize:15,
    fontWeight:'bold'
  },
  iconContainer: {
    width:'25%',
    height:'100%',
  },
  containerChart: {
    flex: 8,
    backgroundColor: '#F5FCFF',
    padding:10,
    margin:10,
    borderRadius:5
  },
  chartTitle: {
    justifyContent:'center',
    alignItems:'center',
  },
  titleText: {
    fontSize:15,
    fontWeight:'bold'
  },
  chart: {
    flex: 1
  }
});

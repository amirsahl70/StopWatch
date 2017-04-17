import formatTime from 'minutes-seconds-milliseconds';
import React,{Component}  from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  TouchableNativeFeedback,
  AppRegistry,
  StyleSheet
} from 'react-native';


export default class StopWatch extends Component{



  constructor(props) {
    super(props);
    this.state = {timeElapsed: null, timeStatuse: false, startTime: null,Laps:[]};
  }

  render(){

    return(
      <View style={styles.Container}>
        <View style= {[styles.Header, this.Border('yellow')]}>
          <View style={[this.Border('red'), styles.TimeWrapper]}>
            <Text style={styles.Timer}>
            {formatTime(this.state.timeElapsed)}
            </Text>
          </View>
          <View style= {[this.Border('green'), styles.ButtonWrapper]}>
            {this.StartStopButton()}
            {this.LapButton()}
          </View>
        </View>
        <View style= {[styles.Footer, this.Border('blue') ]} >
            {this.lapshow()}
        </View>
      </View>

      );
  }

lapshow(){
 return this.state.Laps.map( (time,index)=>{
    return <View style={styles.LapDesign}>
      <Text style= {styles.LapText}>
        Lap # {(index +1)}
 
      </Text>
      <Text style= {styles.LapText}>
        {formatTime(time)}
      </Text>
      </View>
  })
}

StartStopButton(){

return (
    <TouchableHighlight underlayColor="gray"  
        //onPress={() => {this.setState({timeElapsed: ++this.state.timeElapsed})} }>
        onPress={() => {this.handleStartButton()}}
        style={[styles.Button,styles.StartButton]}>
        <Text >
            { this.state.timeStatuse ? 'Stop' : 'Start' }
        </Text>
    </TouchableHighlight>
  );
}
LapButton() {
  return <TouchableHighlight underlayColor="gray" 
  style={[styles.Button,styles.LapButton]}  onPress={() => {this.handleLapButton()}}>
       <Text >
         Lap
       </Text>
  </TouchableHighlight>
}

handleLapButton(){

  var lap= this.state.timeElapsed;
  this.setState({startTime: new Date(),
    Laps: this.state.Laps.concat([lap])
  })
}

handleStartButton(){

  if(this.state.timeStatuse){
    clearInterval(this.interval);
    this.setState({timeStatuse: false});
    return
  }


    this.setState({startTime:new Date()})
   var startTime= new Date();
      this.interval =setInterval(()=>{
        this.setState({
        timeElapsed : new Date() - this.state.startTime,
        timeStatuse: true
      });
      },30);
  
}
Border(color){

  return{
    borderColor: color,
    borderWidth: 4
  }
}

};

const styles= StyleSheet.create({

  Container: {
    flex:1,
     alignItems: 'stretch'
  },

  Header:{
    flex:4

  },

  Footer:{
    flex:4
  },

  TimeWrapper:{

    flex:5,
    justifyContent:'center',
    alignItems:'center'
  },
  ButtonWrapper:{
    flex:3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems:'center'

  },
  Timer:{
    fontSize: 60
  },
  Button:{

    height:70,
    width:70,
    borderRadius:50,
    borderWidth:2,
    alignItems:'center',
    justifyContent:'center'
  },
  StartButton:{
    borderColor: 'green'
  },
  LapButton:{
    borderColor:'red'
  },
  LapDesign:{
      flexDirection:'row',
      justifyContent: 'space-around'
  },
  LapText:{
    fontSize:40


  }
})

AppRegistry.registerComponent('StopWatch',() => StopWatch);


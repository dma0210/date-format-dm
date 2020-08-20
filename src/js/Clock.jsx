import React from 'react';
import styles from '../css/Clock.module.css';

const FORMATVIEW = {
    TIME_SHORT: 1,
    TIME_FULL: 2,
    DATE_SHORT: 3,
    DATE_LONG: 4,
    FORMAT_LENGHT: 4
}


export class Clock extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        time: new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true}),
        formatCondition: FORMATVIEW.TIME_SHORT,
        bgCondition: Math.floor(Math.random()*16777215).toString(16)
      };
    }
    componentDidMount() {
      this.setState({
            formatCondition: this.state.formatCondition < FORMATVIEW.FORMAT_LENGHT ? this.state.formatCondition + 1 : FORMATVIEW.TIME_SHORT
          })
      this.intervalID = setInterval(() => 
      this.setState({
        time: new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true})
      })
      ,1000);
      
    }
    componentWillUnmount() {
      clearInterval(this.intervalID);
    }
    
    changeBG()
    {
        return Math.floor(Math.random()*16777215).toString(16);
    }
    onClickChange()
    {
        this.setState(state => ({
            bgCondition: this.changeBG(),
            formatCondition: this.state.formatCondition < FORMATVIEW.FORMAT_LENGHT ? this.state.formatCondition + 1 : FORMATVIEW.TIME_SHORT
          }))
          switch (this.state.formatCondition) {
              case FORMATVIEW.TIME_SHORT:
              clearInterval(this.intervalID)
              this.setState({
                time: new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true})
              })
              this.intervalID = setInterval(() => 
              this.setState({
                time: new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true})
              })
              ,1000);
                  break;
              case FORMATVIEW.TIME_FULL:
              clearInterval(this.intervalID)
              this.setState({
                time: new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true , second: 'numeric'})
              })
              this.intervalID = setInterval(() => 
              this.setState({
                time: new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true , second: 'numeric'})
              })
              ,1000);
                  break;
              case FORMATVIEW.DATE_SHORT:
              clearInterval(this.intervalID)
              this.setState({
                time: new Date().toLocaleDateString('en-US')
              })
              this.intervalID = setInterval(() => 
              this.setState({
                time: new Date().toLocaleDateString('en-US')
              })
              ,1000*60);
                  break;
              case FORMATVIEW.DATE_LONG:
              clearInterval(this.intervalID)
              this.setState({
                time: new Date().toLocaleDateString('en-US',{month: 'long',day: 'numeric',year:'2-digit'})
              })
              this.intervalID = setInterval(() => 
              this.setState({
                time: new Date().toLocaleDateString('en-US',{month: 'long',day: 'numeric',year:'2-digit'})
              })
              ,1000*60);
                  break;
          
              default:
                  break;
          }
          
    }

    render() {
        const block_bg = {background:"#"+this.state.bgCondition}
      return ( 
      
      <div className={styles.mainbg} style={block_bg} onClick={()=> this.onClickChange()}>
        <div className={styles.date}>
            {this.state.time}
         </div>
      </div>
      
      )
    }
  }
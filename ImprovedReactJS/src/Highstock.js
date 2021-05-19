import React from 'react';
import ReactHighstock from 'react-highcharts/ReactHighstock';
import io from 'socket.io-client'

const socket = io('http://localhost:8000')

class Highstock extends React.Component {    
    
    
    state = {        
        config: {
            rangeSelector: {
                buttons: [{
                    count: 30,
                    type: 'second',
                    text: '30S'
                }, {
                    count: 2,
                    type: 'minute',
                    text: '2M'
                }, {
                    type: 'all',
                    text: 'All'
                }],
                inputEnabled: false,
                selected: 0,
                buttonTheme:{
                    fill: '#505053',
                    stroke: '#000000',
                    style:{
                        color: '#CCC'
                    },
                    states:{
                        hover:{
                            fill:'#707073',
                            stroke: '#000000',
                            style: {
                                color: 'white'
                            }
                        },
                        select: {
                            fill: '#000003',
                            stroke: '#000000',
                            style: {
                                color: 'white'
                            }
                        }
                    }
                },
                inputBoxBorderColor: '#505053',
                inputStyle: {
                    backgroundColor: '#333',
                    color: 'silver'
                },
                labelStyle: {
                    color: 'silver'
                }                
            },
            navigator: {
                enabled: true,
                handles: {
                    backgroundColor: '#666',
                    borderColor: '#AAA'
                },
                outlineColor: '#CCC',
                maskFill: 'rgba(255,255,255,0.1)',
                series: {
                    color: '#7798BF',
                    lineColor: '#A6C7ED'
                },
                xAxis: {
                    gridLineColor: '#505053'
                },                
            },
            scrollbar: {
                barBackgroundColor: '#808083',
                barBorderColor: '#808083',
                buttonArrowColor: '#CCC',
                buttonBackgroundColor: '#606063',
                buttonBorderColor: '#606063',
                rifleColor: '#FFF',
                trackBackgroundColor: '#404043',
                trackBorderColor: '#404043'
            },
            chart: {       
                
                backgroundColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
                    stops: [
                        [0, '#2a2a2b'],
                        [1, '#3e3e40']
                    ]
                },
                style: {
                    fontFamily: '\'Unica One\', sans-serif'
                },
                plotBorderColor: '#606063',                
                marginRight : 100,
                marginLeft: 100,                   
                events: {
                    load: function () {                                    
                            var series = this.series[0],                            
                            x = (new Date()).getTime(),                           
                            y = 1,
                            n = 10,
                            end = x + (n-1)*1000
                            for(var i = 0; i < n; i++){
                                series.addPoint([x+i*1000, null], true, true)
                            } 
                        socket.on('data', function(point){                                                       
                            if(point.length === 1){                                
                                if(point[0].V !== point[0].L){                                                                                                   
                                    y++
                                    series.data[series.data.length - (n+1)].update({x:x, y:y, marker: {enabled: true, radius: 4}}, true, false)                                                                 
                                }else{
                                    x += 1000
                                    y = 1;
                                    series.data[series.data.length - (n+1)].update({ marker: {enabled: true, radius: 4}}, true, false)                                                                 
                                    series.data[series.data.length - n].update({ x:x, y:y}, true, false)
                                    // series.addPoint({
                                    //     x: x,
                                    //     y: y,
                                    //     marker: {
                                    //         enabled: false
                                    //     }
                                    // }, true, true)
                                    series.addPoint({
                                        x: end+=1000,
                                        y: null,                                       
                                    }, true, true)                                                                                                            
                                }  
                                setTimeout(() => series.data[series.data.length - (n+1)].update({marker: {enabled: true, radius: 6, fillColor: '#25E8FE',}}, true, false), 1000)
                                                              
                            }
                        })                              
                    }
                }
            },
            xAxis: {                
                gridLineColor: '#707073',
                // maxPadding: 1500,
                // ordinal: false,
                labels: {
                    style: {
                        color: '#E0E0E3'
                    },                    
                },                       
                                
                lineColor: '#707073',
                minorGridLineColor: '#505053',
                
                tickColor: '#707073',
                title: {
                    style: {
                        color: '#A0A0A3'
                    }
                },                            
            },
            yAxis: {                               
                opposite: false,             
                gridLineColor: '#707073',                
                tickPixelInterval: 35,
                allowDecimals: false,
                floor : 0,
                labels: {
                    style: {
                        fontSize: '15px',
                        width: '200px',
                        color: '#E0E0E3'
                    }
                },
                lineColor: '#707073',
                minorGridLineColor: '#505053',                
                tickColor: '#707073',
                tickWidth: 1,
                title: {
                    style: {
                        color: '#A0A0A3'
                    }
                },                                                
            },        
            plotOptions: {
                series: {                    
                    dataLabels: {
                        allowOverlap: false,
                        enabled: true,
                        formatter: function(){
                            if(this.y < 1){
                                return null
                            }else{
                                if(this.x === this.series.data[this.series.data.length-1].x){
                                    return this.y
                                }else{
                                    return this.y
                                }
                            }                            
                        },                                       
                        align: 'center',
                        color: '#F0F0F3',
                        style: {
                            fontSize: '13px'
                        }
                    },
                    marker: {                        
                        lineColor: '#333'
                    }
                },
                boxplot: {
                    fillColor: '#505053'
                },
                candlestick: {
                    lineColor: 'white'
                },
                errorbar: {
                    color: 'white'
                }
            },
            legend: {                
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                itemStyle: {
                    color: '#E0E0E3'
                },
                itemHoverStyle: {
                    color: '#FFF'
                },
                itemHiddenStyle: {
                    color: '#606063'
                },
                title: {
                    style: {
                        color: '#C0C0C0'
                    }
                },                
            },
            labels: {
                style: {
                    color: '#707073'
                }
            },
            drilldown: {
                activeAxisLabelStyle: {
                    color: '#F0F0F3'
                },
                activeDataLabelStyle: {
                    color: '#F0F0F3'
                }
            },
            navigation: {
                buttonOptions: {
                    symbolStroke: '#DDDDDD',
                    theme: {
                        fill: '#505053'
                    }
                }
            },
            series: [{
                name: '',
                type: 'area',                
                data: (function () {
                    // generate an array of random data
                    var data = [0,0],
                        time = (new Date()).getTime(),
                        i = -299;   
                        while(i <= 0){
                            data.push([
                                time + i*1000,
                                0
                            ])
                            i++
                        }                                      
                    return data
                }()),                
                gapSize: 0,
                tooltip: {
                    valueDecimals: 0
                },      
                
                fillOpacity: 0.3,
                                        
                marker: {
                    enabled: false,                         
                },                
                threshold: null
            }]
        },            
    }

    render() {        
        // this.setState({})y      
        const { config } = this.state;

        return  <ReactHighstock config={config} />

    }
}

export default Highstock
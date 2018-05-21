/**
 * Created by siyongkang 2017/6/22.
 */
//分时线
const _timeSharing=(everydatas)=>{
    //分时图数组处理
    function splitedata (datas) {
        var timedata = [];
        var voldata = [];
        var pricedata = [];
        var avgdata = [];
        var len=datas.length;
        datas.forEach(function(value, index, arr) {
            timedata.push(value.updateTime);
            voldata.push(Number(value.volume));
            pricedata.push(Number(value.nowPrice));
            avgdata.push(Number(value.averagePrice));
        })
        // for(var i=0;i<240-len;i++){
        //     timedata.push('')
        //     voldata.push('')
        //     pricedata.push('')
        //     avgdata.push('')
        // }
        return {
            time: timedata,
            vol: voldata,
            price: pricedata,
            avg: avgdata
        }
    }
    let data=splitedata(everydatas);
    return {
        backgroundColor: localStorage.color,
        title: {
            text: '',
            left: 0,
        },
        tooltip: {
            trigger: 'axis',
            backgroundColor:'rgba(255,255,255,0.7)',
            formatter: function(params) {
                if(params[0].seriesName=="Volumn"){
                     return '时间:'+params[0].name + '<br>' +
                    '交易量:' + params[0].value 
                }else{
                    return '时间:'+params[0].name + '<br>' +
                            '价格:' + params[0].value + '<br>'
                            // '均价:' + params[1].value + '<br>'
                }
            },
            padding:10,
            textStyle:{
                color:'black'
            },
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    type: 'solid',
                    color: 'black',
                    opacity:1,
                    width: 0.6
                }
            },
            extraCssText: 'box-shadow:0 2px 4px 0 rgba(0,0,0,0.50);',
            triggerOn: 'click'
        },
        animation: false,
        legend: {
            show:false,
            inactiveColor: '#777',
            textStyle: {
                color: 'black'
            }
        },
        textStyle: {
            color: 'white'
        },
        grid: [{
                left: '0',
                right: '0',
                top: '0',
                height: '80%'
            },
            {
                left: '0',
                right: '0',
                top: '86%',
                height: '10%'
            }
        ],
        dataZoom: [{
            type: 'inside',
            xAxisIndex: [0, 1],
            start: 0,
            end: 100,
            throttle: 0,
        }],
        xAxis: [{
                type: 'category',
                data: data.time,
                splitNumber:1,
                scale: true,
                splitLine: { 
                    show: true ,
                    lineStyle:{
                        color: ['#ccc'],
                        type: 'dotted',
                    }
                },
                axisTick: {
                    lineStyle: {
                        color: '#CCCCCC'
                    }
                },
                axisLabel: {
                    show: false,
                    textStyle: {
                        color: '#CCCCCC',
                        align:'left'
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#CCCCCC'
                    }
                }
            },
            {
                type: 'category',
                gridIndex: 1,
                data: data.time,
                axisLabel: { show: false },
                splitLine: { 
                    show: true ,
                    lineStyle:{
                        color: ['#ccc'],
                        type: 'dotted',
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#CCCCCC'
                    }
                },
            }
        ],
        yAxis: [{
                scale: true,
                splitLine: { show: true ,
                    lineStyle:{
                        color: ['#ccc'],
                        type: 'dotted',
                    }
                },
                axisLine: {
                    show:false,
                    lineStyle: {
                        color: '#CCCCCC'
                    }
                },
                axisTick: {
                    show:false,
                    lineStyle: {
                        color: 'black'
                    }
                },
                axisLabel: {
                    show: false,
                    textStyle: {
                        color: '#fff'
                    }
                }
            },
            {
                gridIndex: 1,
                splitNumber:1,
                axisTick: { show: false },
                splitLine: { 
                    show: true ,
                    lineStyle:{
                        color: ['#ccc'],
                        type: 'dotted',
                    }
                },
                axisLabel: { show: true },
                axisLine: {
                    show:false,
                    lineStyle: {
                        color: '#CCCCCC'
                    }
                },
            }
        ],
        series: [
            {
                name: 'Volumn',
                type: 'bar',
                xAxisIndex: 1,
                yAxisIndex: 1,
                data: data.vol,
                barMaxWidth:20,
                itemStyle: {
                    normal: {
                        color: function(params) {
                            var colorList;
                                if (data.price[params.dataIndex + 1] > data.price[params.dataIndex]) {
                                    colorList = '#ef232a';
                                } else {
                                    colorList = '#14b143';
                                }
                            return colorList;
                        },
                    }
                },

            },
            {
                name:'价格',
                type: 'line',
                data: data.price,
                smooth: true,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 1,
                        color: '#378AD6'
                    }
                }
            },
            {
                name: 'MA5',
                type: 'line',
                data: '',
                smooth: true,
                show:false,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 0.5,
                        color:'rgb(49,49,49)'
                    }
                }
            },
            {
                name: 'MA10',
                type: 'line',
                data: '',
                show:false,
                smooth: true,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 0.5,
                        color:'#E9A113'
                    }
                }
            },
            // {
            //     name:'均价',
            //     type: 'line',
            //     data: data.avg,
            //     smooth: true,
            //     showSymbol: false,
            //     lineStyle: {
            //         normal: {
            //             width: 1,
            //             color: '#FFBE45'
            //         }
            //     }
            // },
        ],
    };
}

//蜡烛图
                //数据 开始% 结束%
const _candle=(_data, start, end)=>{
    //数组处理
    function splitData (rawData) {
        var datas = [];
        var times = [];
        var vols = [];
        
        rawData.forEach(function(value, index, arr) {
            datas.push([Number(value.openPrice),Number(value.closePrice),Number(value.floorPrice),Number(value.highPrice)]);
            if(value==''){
                times.push('');
            }else{
                times.push(value.updateTime);
            }
            vols.push(Number(value.volume));
        })
        return {
            datas: datas,
            times: times,
            vols: vols,
        }
    }
    var data = splitData(_data);
        //MA计算公式
    function calculateMA(dayCount) {
        var result = [];
        for (var i = 0, len = data.times.length; i < len; i++) {
            if (i < dayCount) {
                result.push('-');
                continue;
            }
            var sum = 0;
            for (var j = 0; j < dayCount; j++) {
                sum += data.datas[i - j][1];
            }
            result.push((sum / dayCount).toFixed(2));
        }
        return result;
    }
    return {
        backgroundColor: localStorage.color,
        title: {
            text: '',
            left: 0
        },
        tooltip: {
            trigger: 'item',
            formatter: function(params) {
                if(params.seriesName=="Volumn"){
                    return '时间:'+params.name + '<br>' +
                    '交易量:' + params.value 
            
                }else{
                    return '时间:'+params.name + '<br>' +
                        '开盘:' + params.value[1] + '<br>' +
                        '收盘:' + params.value[2] + '<br>' +
                        '最低:' + params.value[3] + '<br>' +
                        '最高:' + params.value[4]
                }
                
            },
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    type: 'solid',
                    color: 'black',
                    width: 0.6
                }
            },
            triggerOn: 'mousemove'
        },
        animation: false,
        legend: {
            //data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30'],
            show:false,
            inactiveColor: '#777',
            textStyle: {
                color: 'black'
            }
        },
        textStyle: {
            color: 'white'
        },
        grid: [{
                left: '0',
                right: '0',
                top: '0',
                height: '80%'
            },
            {
                left: '0',
                right: '0',
                top: '86%',
                height: '10%'
            }
        ],
        dataZoom: [{
            type: 'inside',
            xAxisIndex: [0, 1],
            start: start,
            end: end,
            throttle: 0,
        }],
        xAxis: [{
                type: 'category',
                data: data.times,
                scale: true,
                splitLine: { 
                    show: true ,
                    lineStyle:{
                        color: ['#ccc'],
                        type: 'dotted',
                    }
                },
                splitNumber: 1,
                axisTick: {
                    lineStyle: {
                        color: '#CCCCCC'
                    }
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#CCCCCC',
                        align:'left'
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#CCCCCC'
                    }
                }
            },
            {
                type: 'category',
                gridIndex: 1,
                data: data.times,
                axisLabel: { show: false },
                splitLine: { 
                    show: true ,
                    lineStyle:{
                        color: ['#ccc'],
                        type: 'dotted',
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#CCCCCC'
                    }
                },
            }
        ],
        yAxis: [{
                scale: true,
                splitLine: { 
                    show: true ,
                    lineStyle:{
                        color: ['#ccc'],
                        type: 'dotted',
                    }
                },
                axisLine: {
                    show:false,
                    lineStyle: {
                        color: '#CCCCCC'
                    }
                },
                axisTick: {
                    lineStyle: {
                        color: 'black'
                    }
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#fff'
                    }
                }
            },
            {
                gridIndex: 1,
                splitNumber:1,
                axisTick: { show: false },
                splitLine: { 
                    show: true ,
                    lineStyle:{
                        color: ['#ccc'],
                        type: 'dotted',
                    }
                },
                axisLabel: { show: true },
                axisLine: {
                    show:false,
                    lineStyle: {
                        color: '#CCCCCC'
                    }
                },
            }
        ],
        series: [{
                name: '',
                type: 'candlestick',
                data: data.datas,
                itemStyle: {
                    normal: {
                        color: '#ef232a',
                        color0: '#14b143',
                        borderColor: '#ef232a',
                        borderColor0: '#14b143',
                        borderWidth: '1'
                    },
                },
            },
            {
                name: 'MA5',
                type: 'line',
                data: calculateMA(5),
                smooth: true,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 0.5,
                        color:'rgb(49,49,49)'
                    }
                }
            },
            {
                name: 'MA10',
                type: 'line',
                data: calculateMA(10),
                smooth: true,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 0.5,
                        color:'#E9A113'
                    }
                }
            },
            // {
            //     name: 'MA20',
            //     type: 'line',
            //     data: calculateMA(30),
            //     smooth: true,
            //     showSymbol: false,
            //     lineStyle: {
            //         normal: {
            //             width: 0.5,
            //             color:'purple'
            //         }
            //     }
            // },
            {
                name: 'Volumn',
                type: 'bar',
                xAxisIndex: 1,
                yAxisIndex: 1,
                barMaxWidth:20,
                color: 'red',
                data: data.vols,
                itemStyle: {
                    normal: {
                        color: function(params) {
                            var colorList;
                            if (data.datas[params.dataIndex][1] > data.datas[params.dataIndex][0]) {
                                colorList = '#ef232a';
                            } else {
                                colorList = '#14b143';
                            }
                            return colorList;
                        },
                    }
                },

            }
        ],
        animationEasing: 'linear',
    };
}

export default{
    _timeSharing,
    _candle
}
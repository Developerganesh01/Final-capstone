import { useEffect, useRef } from "react";
import * as echarts from 'echarts';
import db from "../firebase";
import {ref,onValue,off} from "firebase/database";

export default function Graph({firebaseRTDBPath}) {

  const chartRef = useRef(null);
  const dataX = [];
  const dataY = [];

  useEffect(() => {
    const myChart = echarts.init(chartRef.current);
    const sensorRef=ref(db,"sensors/"+firebaseRTDBPath);
    onValue(sensorRef, (snapshot) => {
      if (snapshot.val()) {
        const newTime = new Date();
        dataX.push(newTime);
        const newValue = snapshot.val().value;
        dataY.push(newValue);

        if (dataX.length > 100) {
          dataX.shift();
          dataY.shift();
        }

        const option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'cross' },
            backgroundColor: 'rgba(50, 50, 50, 0.8)', 
            textStyle: { color: '#fff' },  
            borderWidth: 1,
            borderColor: '#333'
          },
          grid: {
            left: '3%',
            right: '3%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'time',
            axisTick: { alignWithLabel: true },
            axisLabel: { rotate: 45, color: '#888' }, 
            splitLine: { show: false },  
          },
          yAxis: {
            type: 'value',
            name: `${firebaseRTDBPath}`,
            position: 'left',
            axisLabel: { formatter: '{value}', color: '#888' },  
            splitLine: {
              lineStyle: { type: 'dashed', color: '#ddd' } 
            }
          },
          series: [
            {
              name: `${firebaseRTDBPath}`,
              type: 'line',
              smooth: false, 
              data: dataY.map((y, index) => [dataX[index], y]),  
              showSymbol: true,  
              itemStyle: { color: '#007AFF' }, 
              lineStyle: { width: 3 },  
              animationDuration: 1000,  
              animationEasing: 'cubicOut'  
            }
          ],
          animationDurationUpdate: 300,  
          animationEasingUpdate: 'linear'  
        };

        myChart.setOption(option);
      }
    });
    return () => {
      off(sensorRef);
      if (myChart) {
        myChart.dispose();
      }
    };
  }, [firebaseRTDBPath]);

  return (
    <>
    <div
      id="echart-graph-container"
      ref={chartRef}
      style={{ height: "75vh", width: "100vw" }}
    ></div>
    </>
  );
}

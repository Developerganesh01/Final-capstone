import { useEffect, useRef } from "react";
import * as echarts from 'echarts';
import { useParams } from "react-router-dom";
function HistoricalGraph({data})
{
  const params=useParams();
  const chartRef = useRef(null);
  const dataX = [];
  const dataY = [];
  useEffect(()=>{
    const myChart = echarts.init(chartRef.current);
        data.forEach((obj)=>{
          dataX.push(new Date(obj.current_time));
          dataY.push(obj.value);
        })
        const option = {
          tooltip: {
            trigger: 'item',
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
            name: `${params.sensor}`,
            position: 'left',
            axisLabel: { formatter: '{value}', color: '#888' },  
            splitLine: {
              lineStyle: { type: 'dashed', color: '#ddd' } 
            }
          },
          series: [
            {
              name: `${params.sensor}`,
              type: 'line',
              smooth: false, 
              data: dataY.map((y, index) => [dataX[index], y]),  
              showSymbol: true,  
              itemStyle: { color: '#007AFF' }, 
              lineStyle: { width: 3 },  
            }
          ],
        };
        myChart.setOption(option);
        return () => {
            myChart.dispose();
        };
    },[data]);
  return(
    <div
      id="echart-graph-container"
      ref={chartRef}
      style={{ height: "70vh", width: "100%" }}
    ></div>
  )
}
export default HistoricalGraph;
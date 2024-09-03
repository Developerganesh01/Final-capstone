import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

export default function Graph({data})
{
  return (<LineChart width={900} height={500} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
    <Line type="monotone" dataKey="value" stroke="#8884d8" />
    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
    <XAxis dataKey="current_time" />
    <YAxis type='number' domain={[0,14]} label={{value:'value',angle:'-90'}}/>
    <Tooltip />
  </LineChart>)
};
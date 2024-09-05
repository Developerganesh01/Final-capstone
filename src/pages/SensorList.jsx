import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from './styles/sensorList.module.css';
import Sensor from '../components/Sensor';

export default function SensorList()
{
  const params=useParams();
  // console.log(params);
  const[sensorlist,setSensorList]=useState([]);
  // const[error,setError]=useState(false);
  // const[loading,setloading]=useState(true);
  useEffect(function(){
    async function getlist(){
      try{
        //params.type will give type
        let list=null;
        switch(params.type)
        {
          //'Nutrient dosing ','grow light ','Environment'
          case 'Nutrient dosing':list=await import('../data/nutrientMonitoringSensors.json');
                                 break;
          case 'grow light':list=await import('../data/growLightMonitoringSensors.json');
                                 break;
          case 'Environment':list=await import('../data/environmentMonitoringSensors.json');
                                 break;
          default:throw new Error('invalid url');
        }
        if(!list)
        {
          throw new Error('something went wrong try again ');
        }
        // console.log(list);
        // console.log(typeof(list));
       const newlist=list.default.map(item=>
        (
          <div className={styles.sensorcontainer}>
            <Link to={`/${item.href}/${item.collection}`}>
              <Sensor title={item.href}/>
            </Link>
         </div>
       ));
       setSensorList(newlist);
      }
      catch(err)
      {
        console.log(err);
      }
    }
    getlist();
  },[params.type]);
  return (<div className={styles.listcontainer}>
    {sensorlist}
  </div>);
}















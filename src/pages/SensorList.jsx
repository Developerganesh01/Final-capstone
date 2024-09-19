import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from './styles/sensorList.module.css';
import Sensor from '../components/Sensor';

export default function SensorList()
{
  const params=useParams();
  const[sensorlist,setSensorList]=useState([]);
  useEffect(function(){
    async function getlist(){
      try{
        let list=null;
        switch(params.type)
        {
          case 'Nutrient-dosing':
            list=await import('../data/nutrientMonitoringSensors.json');
            break;
          case 'grow-light':
            list=await import('../data/growLightMonitoringSensors.json');
            break;
          case 'Environment':
            list=await import('../data/environmentMonitoringSensors.json');
            break;
          default:
            throw new Error('invalid url');
        }
        if(!list)
        {
          throw new Error('something went wrong try again ');
        }
        let ct=0;
       const newlist=list.default.map(item=>
       {
        ct=ct+1;
         return(<div className={styles.sensorcontainer} key={ct}>
            <Link to={`/${params.type}/${item.href}/live`}>
              <Sensor firebaseRTDBPath={item.href} />
            </Link>
         </div>);
      });
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















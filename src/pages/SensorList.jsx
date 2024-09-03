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
            <Link to={`/${params.type}/${item.collection}`}>
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
















/*
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyDLOrd0VTMMhb42yDIlfQeTbEv58N3Lk",
  authDomain: "smart-farm-f342a.firebaseapp.com",
  databaseURL: "https://smart-farm-f342a-default-rtdb.firebaseio.com",
  projectId: "smart-farm-f342a",
  storageBucket: "smart-farm-f342a.appspot.com",
  messagingSenderId: "505874007318",
  appId: "1:505874007318:web:aef94dc5baedd0a0017c37",
  measurementId: "G-BEZR2EWP4Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
*/
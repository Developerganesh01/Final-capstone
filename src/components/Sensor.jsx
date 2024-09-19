import { useState,useEffect } from "react";
import styles from "../pages/styles/sensorList.module.css";
import db  from "../firebase";
import {ref,onValue,off } from "firebase/database";

export default function Sensor({firebaseRTDBPath})
{
  //e.g. firbaseRTDBPath=ph-sensor 
  const [sensorValue, setSensorValue] = useState('Fetching...');
  const[msg,setMsg]=useState(null);
  const sensorRef=ref(db,'sensors/'+firebaseRTDBPath);
  useEffect(() => {
    onValue(sensorRef,(snapshot)=>{
      const newValue=snapshot.val()?snapshot.val().value:null;
      if(sensorValue !== newValue)
      {
        setMsg(`${firebaseRTDBPath} value changed from ${sensorValue} to ${newValue}`)
        setSensorValue(newValue);
        setTimeout(()=>{
          setMsg(null);
        },1000)
      }
    })
    return () => {
      off(sensorRef);
    };
  }, []); 
  return (
  <>
  <div className={styles.sensordetailbox}>
   <div className={msg?`${styles.show}`:`${styles.hide}`}>{msg}</div>
    <div className={styles.sensorheadingbox}>{firebaseRTDBPath}</div>
    <div className={styles.sensorvaluebox}>
      <p>value : {sensorValue}</p>
    </div>
  </div>
  </>
  );
}
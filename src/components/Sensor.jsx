import { useState,useEffect } from "react";
import styles from "../pages/styles/sensorList.module.css";
import db  from "../firebase";
//import { collection, doc,onSnapshot } from "firebase/firestore";
import {ref,onValue,off } from "firebase/database";

export default function Sensor({title})
{
  const [sensorValue, setSensorValue] = useState('Fetching...');
  const[msg,setMsg]=useState(null);

  const path=title;
  useEffect(() => {
    const sensorRef=ref(db,'sensors/'+path);
    onValue(sensorRef,(snapshot)=>{
      // console.log(snapshot.val());
      const newValue=snapshot.val()?snapshot.val().value:null;
      if(sensorValue !== newValue)
      {
        setMsg(`${title} value changed from ${sensorValue} to ${newValue}`)
        setSensorValue(newValue);
        setTimeout(()=>{
          setMsg(null);
        },1000)
      }

    })

    return () => {
      off(sensorRef);
    };
  }, [path]); 
  return (
  <>
  <div className={styles.sensordetailbox}>
   <div className={msg?`${styles.show}`:`${styles.hide}`}>{msg}</div>
    <div className={styles.sensorheadingbox}>{title}</div>
    <div className={styles.sensorvaluebox}>
      <p>value : {sensorValue}</p>
    </div>
  </div>
  </>
  );
}
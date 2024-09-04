import { useState,useEffect } from "react";
import styles from "../pages/styles/sensorList.module.css";
import db  from "../firebase";
import { collection, doc,onSnapshot } from "firebase/firestore";


export default function Sensor({title})
{
  const [sensorValue, setSensorValue] = useState('Fetching...');
  const[msg,setMsg]=useState(null);

  const path=title;
  useEffect(() => {

    const unsubscribe=onSnapshot(doc(db,"sensors",path),(doc)=>{
      const newValue=doc.data()?doc.data().value:null;
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
      unsubscribe();
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
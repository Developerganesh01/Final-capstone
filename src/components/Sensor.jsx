import { useState,useRef,useEffect } from "react";
import styles from "../pages/styles/sensorList.module.css";
import { initializeApp } from "firebase/app";
import { getDatabase,ref,onValue } from "firebase/database";


export default function Sensor({title})
{
  const [sensorValue, setSensorValue] = useState('Fetching...');
  const[msg,setMsg]=useState(null);
  const prevSensorValueRef = useRef(null);

  const firebaseconfig={
    apiKey: "AIzaSyArbTuwXjXilfLkETLfZl-ldaukgB7mxJo",
  authDomain: "smart-farm-b287c.firebaseapp.com",
  databaseURL: "https://smart-farm-b287c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "smart-farm-b287c",
  storageBucket: "smart-farm-b287c.appspot.com",
  messagingSenderId: "6813398444",
  appId: "1:6813398444:web:2bb005658db6a7ed703609"
  };
  const app=initializeApp(firebaseconfig);
  const db=getDatabase(app);

  const path=title;
  useEffect(() => {
    const sensorRef = ref(db,'/'+path);

    const unsubscribe = onValue(sensorRef, (snapshot) => {
      // console.log(snapshot);
      const data = snapshot.val();
      if (prevSensorValueRef.current !== null && prevSensorValueRef.current !== data) {
        setSensorValue(data);
        // alert(`Value of ${title} changed from ${prevSensorValueRef.current} to ${data}`);
        setMsg(`${title} changed from ${prevSensorValueRef.current} to ${data}`);
        setTimeout(()=>{
          setMsg(null);
        },1000);
      }
      prevSensorValueRef.current = data;
    });

    return () => {
      unsubscribe();
    };
  }, [path,db,title]); 
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
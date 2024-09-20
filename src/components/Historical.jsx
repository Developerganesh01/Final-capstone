import { useEffect,useState } from "react";
import styles from "./HistoricalData.module.css";
import HistoricalGraph from "./HistoricalGraph";
import {v4 as uuidv4} from "uuid";
function Historical()
{
  const[sensorDataList,setSensorDataList]=useState([]);
  const [startDate,setStartDate]=useState("");
  const[endDate,setEndDate]=useState("");
  
  useEffect(()=>{
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const tempStartDate=`${year}-${month}-${day}T${hours}:00`;
    const tempEndDate=`${year}-${month}-${day}T${hours}:${minutes}`;
    setEndDate(tempEndDate);
    setStartDate(tempStartDate);
    getData(tempStartDate,tempEndDate);
  },[]);

  async function getData(sd,ed)
  {
    try{
      const response=await fetch("http://localhost:5050/ph-sensor/gethistoricaldata",{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          startDate:sd,
          endDate:ed
        })
      });
      const data=await response.json();
      setSensorDataList(data.obj);
    }
    catch(err)
    {
      console.log(err);
    }
  }
  function handleFetch()
  {
    try{
      new Date(startDate);
      new Date(endDate);
      //dates are valid
      getData(startDate,endDate);
    }catch(err)
    {
      console.log(err);
    }
  }
  function handleDownload()
  {
    //[{},{}]
    if(sensorDataList.length===0)return;
    const keys=Object.keys(sensorDataList[0]);
    const headRow=keys.join(",");
   // console.log(headRow);
    const dataRow=[];
    sensorDataList.map((obj)=>{
      const valueArr=Object.values(obj);
      dataRow.push(valueArr.join(","));
    });
    const totalRowData=[headRow,...dataRow];
    const csvstring=totalRowData.join("\n");
    //console.log(csvstring);
    const csvBlobObject=new Blob([csvstring],{type:"text/csv"});
    //console.log(csvBlobObject);
    const url = URL.createObjectURL(csvBlobObject);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${uuidv4()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }
  return (
    <div className={styles["historicaldata-container"]}>
      <div className={styles["historicaldata-container__heading"]}>
        <div className={styles["historicaldata-container__input-div"]}>
          <label>StartDate : </label>
          <input type="datetime-local" value={startDate} onChange={(e)=>{setStartDate(e.target.value)}}/>
        </div>
        <div className={styles["historicaldata-container__input-div"]}>
          <label>EndDate : </label>
          <input type="datetime-local" value={endDate} onChange={(e)=>{setEndDate(e.target.value)}}/>
        </div>
        <button className={styles["fetch-btn"]} onClick={handleFetch}>✔️</button>
      </div>
      <div className={styles["historicaldata-container__graph-div"]}>
        {!sensorDataList || sensorDataList.length===0?"no data found...":<HistoricalGraph data={sensorDataList}/>}
        <button className={styles["download-btn"]} onClick={handleDownload}>Download(.csv)</button>
      </div>
    </div>
  )
}
export default Historical;
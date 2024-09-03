import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import Graph from "../components/Graph";
import styles from"./styles/sensorGraph.module.css";

export default function Sensorgraph({accessToken})
{
  const params=useParams();
  const collection=params.sensor;
  const baseurl="https://ap-south-1.aws.data.mongodb-api.com/app/data-yznwp/endpoint/data/v1";
  const endpoint="action/find";
  const [data,setdata]=useState(null);
  const[loading,setloading]=useState(true);


  useEffect(function(){
    async function fetchdata()
    {
      try{
        const res=await fetch(`${baseurl}/${endpoint}`,
        {
          method:"POST",
          url:`${baseurl+'/'+endpoint}`,
          headers:{
            "Content-Type":"application/json",
            "Access-Control-Request-Headers":"*",
            'Authorization': `Bearer ${accessToken}` ,
          },
          body:JSON.stringify({
            "dataSource": "Cluster0",
            "database": "testing",
            "collection": `${collection}`,
            "limit":15
        })
      });
        if(!res.ok)
        {
          throw new Error("data retriving failed");
        }
        const result=await res.json();
        // console.log(result.documents);
        const newdata=result.documents;
        setdata(newdata);
        setloading(false);
      }
      catch(err)
      {
        setloading(true);
        console.log(err);
      }
    }
    fetchdata();
  },[collection,accessToken])

  return (
    <div className={styles.graphcontainer}>{loading?<p>loading....</p>:<Graph data={data}/>}</div>
  )
}
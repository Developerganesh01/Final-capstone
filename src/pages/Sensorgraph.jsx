import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Graph from "../components/Graph";
import styles from "./styles/sensorGraph.module.css";
import * as Realm from "realm-web";

export default function Sensorgraph() {
  const params = useParams();
  const collection = params.sensor;
  const baseurl = process.env.REACT_APP_MONGODB_ATLAS_GRAPH_BASEURL;
  const endpoint = process.env.REACT_APP_MONGODB_ATLAS_GRAPH_URLENDPOINT;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accessToken,setAccessToken]=useState(null);
  const app = new Realm.App({ id: process.env.REACT_APP_MONGODB_ATLAS_GRAPH_NAME });

  async function loginEmailPassword(email, password) {
    const credentials = Realm.Credentials.emailPassword(email, password);
    const user = await app.logIn(credentials);
    console.assert(user.id === app.currentUser.id);
    return user;
  }

  useEffect(() => {
    async function getAccesstoken()
    {
      const user = await loginEmailPassword(process.env.REACT_APP_MONGODB_ATLAS_GRAPH_USER, process.env.REACT_APP_MONGODB_ATLAS_GRAPH_PASSWORD);
      setAccessToken(user.accessToken);
    }
    async function fetchData() {
      try {
        const res = await fetch(`${baseurl}/${endpoint}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Access-Control-Request-Headers': '*',
            "Authorization": `Bearer ${accessToken}` 
          },
          body: JSON.stringify({
            "dataSource": "Cluster0",
            "database": "testing",
            "collection": collection,
            "limit": 15
          })
        });
        if (!res.ok) {
          throw new Error("Data retrieving failed");
        }
        const result = await res.json();
        const newData = result.documents;
        setData(newData);
        setLoading(false);
      } catch (err) {
        setLoading(true);
        console.log(err);
      }
    }
    try
    {
      getAccesstoken();
      fetchData();
    }
    catch(err)
    {
      console.log(err);
    }
  }, [collection]);

  return (
    <div className={styles.graphcontainer}>
      {loading ? <p>Loading....</p> : <Graph data={data} path={params.type} />}
    </div>
  );
}

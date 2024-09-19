import { Route, Routes,useParams} from "react-router-dom";
import Graph from "../components/Graph";
import styles from "./styles/sensorGraph.module.css";
import Layout from "../components/Layout";
import Historical from "../components/Historical";

export default function Sensorgraph() {
  const params=useParams();
  const firebaseRTDBPath=params.sensor;
  return (
    <div className={styles.graphcontainer}>
      <Routes>
        <Route path="/" element={<Layout/>}>
        <Route path="live" element={<Graph firebaseRTDBPath={firebaseRTDBPath}/>} />
        <Route path="historical" element={<Historical/>}/>
        </Route>
      </Routes>
    </div>
  );
}

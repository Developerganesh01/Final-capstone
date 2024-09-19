import styles from "../pages/styles/graphSubheading.module.css";
import { NavLink } from "react-router-dom";
function GraphSubheading()
{
  function getClassname(isActive)
  {
    if(isActive)
    {
      return styles["active-btn"];
    }
    else
    {
      return "";
    }
  }
  return(
    <header className={styles["subheading"]}>
      <li>
        <NavLink to="live" className={({isActive})=>{return getClassname(isActive);}}>Live Graph</NavLink>
      </li>
      <li>
        <NavLink to="historical" className={({isActive})=>{return getClassname(isActive);}}>Historic Data</NavLink>
      </li>
    </header>
  )
}
export default GraphSubheading;
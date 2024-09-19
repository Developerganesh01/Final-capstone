import Systemtype from '../components/Systemtype';
import {Link} from 'react-router-dom';
import styles from './styles/homepage.module.css'

export default function Homepage()
{
  const types=['Nutrient-dosing ','grow-light ','Environment'];
  let ct=100;
  const typecompo=types.map(typename=>{
    ct=ct+1;
    return(<Link to={typename} className={styles.childcontainer} key={ct}><Systemtype typename={typename}/></Link>)
});
  return (
    <div className={styles.container}>
      {typecompo}
    </div>
  )

}
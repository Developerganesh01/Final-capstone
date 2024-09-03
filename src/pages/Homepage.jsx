import Systemtype from '../components/Systemtype';
import {Link} from 'react-router-dom';
import styles from './styles/homepage.module.css'

export default function Homepage()
{
  const types=['Nutrient dosing ','grow light ','Environment'];
  const typecompo=types.map(typename=>(<Link to={typename} className={styles.childcontainer}><Systemtype typename={typename}/></Link>));
  return (
    <div className={styles.container}>
      {typecompo}
    </div>
  )

}
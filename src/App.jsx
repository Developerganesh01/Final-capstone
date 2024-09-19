import {React} from "react";
import {BrowserRouter,Routes,Route,NavLink} from "react-router-dom";
import Homepage from './pages/Homepage';
import About from './pages/About';
import Contact from './pages/Contact';
import styles from './App.module.css';
import SensorList from './pages/SensorList';
import Sensorgraph from './pages/Sensorgraph';

function App() {
  const getClassName=function(isActive)
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
  return (
    <>
    <BrowserRouter>
    <header>
      <nav className={styles.navheader}>
        <NavLink to="/" className={({isActive})=>{return getClassName(isActive);}}>Homepage</NavLink>
        <NavLink to="/about" className={({isActive})=>{return getClassName(isActive);}}>About</NavLink>
        <NavLink to="/contact" className={({isActive})=>{return getClassName(isActive);}}>Contact</NavLink>
      </nav>
    </header>
    <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/about" element={<About/>} />
      <Route path="/contact" element={<Contact />}/>
      <Route path="/:type"  element={<SensorList />}/>
      <Route path="/:type/:sensor/*"  element={<Sensorgraph/>} />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;

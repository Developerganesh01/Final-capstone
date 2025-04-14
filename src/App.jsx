import {React} from "react";
import {BrowserRouter,Routes,Route,NavLink} from "react-router-dom";
import Homepage from './pages/Homepage';
import About from './pages/About';
import Contact from './pages/Contact';
import styles from './App.module.css';
import SensorList from './pages/SensorList';
import Sensorgraph from './pages/Sensorgraph';
import Control from "./pages/Control";

function App() {
  const types=['Nutrient-dosing ','grow-light ','Environment'];
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
        
      {types.map((type) => (
        <NavLink
          key={type}
          to={`/${type}`} // URL-safe path
          className={({ isActive }) => getClassName(isActive)}
        >
          {type}
        </NavLink>
      ))}
        <NavLink to="/" className={({isActive})=>{return getClassName(isActive);}}>Homepage</NavLink>
        <NavLink to="/about" className={({isActive})=>{return getClassName(isActive);}}>About</NavLink>
        <NavLink to="/contact" className={({isActive})=>{return getClassName(isActive);}}>Contact</NavLink>
        <NavLink to="/control" className={({isActive})=>{return getClassName(isActive);}}>Control</NavLink>
      </nav>
    </header>
    <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/about" element={<About/>} />
      <Route path="/contact" element={<Contact />}/>
      <Route path="/:type"  element={<SensorList />}/>
      <Route path="/:type/:sensor/*"  element={<Sensorgraph/>} />
      <Route path="/control" element={<Control/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;

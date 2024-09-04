import {React} from "react";
import {BrowserRouter,Routes,Route,Link} from "react-router-dom";
import Homepage from './pages/Homepage';
import About from './pages/About';
import Contact from './pages/Contact';
import styles from './App.module.css';
import SensorList from './pages/SensorList';
import Sensorgraph from './pages/Sensorgraph';
import db from "./firebase";

function App() {
  return (
    <>
    <BrowserRouter>
    <header>
      <nav className={styles.navheader}>
        <Link to="/" >Homepage</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>
    </header>
    <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/about" element={<About/>} />
      <Route path="/contact" element={<Contact />}/>
      <Route path="/:type"  element={<SensorList db={db}/>}/>
      <Route path="/:type/:sensor" db={db} element={<Sensorgraph db={db}/>} />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;

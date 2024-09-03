import {React,useEffect,useState} from "react";
import {BrowserRouter,Routes,Route,Link} from "react-router-dom";
import Homepage from './pages/Homepage';
import About from './pages/About';
import Contact from './pages/Contact';
import styles from './App.module.css';
import SensorList from './pages/SensorList';
import Sensorgraph from './pages/Sensorgraph';
import * as Realm from 'realm-web';

function App() {
  //authentication karlalav data api use karayla mongodb atlas data api chi
  // const[accessToken,setaccessToken]=useState(null);
  // useEffect(function(){
  //   async function getAccessToken(email,password)
  //   {
  //     const app=new Realm.App({id:'data-yznwp'});
  //     try
  //     {
  //       const credentials=Realm.Credentials.emailPassword(email,password);
  //       const user=await app.logIn(credentials);
  //       console.assert(user.id===app.currentUser.id);
  //        setaccessToken(user.accessToken);
  //       // console.log("accesstoken is :",user.accessToken);
  //     }
  //     catch(err)
  //     {
  //       console.error(err);
  //     }
  //   };
  //   getAccessToken('','');
  // },[]);
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
      <Route path="/:type" element={<SensorList/>}/>
      {/* <Route path="/:type/:sensor" element={<Sensorgraph accessToken={accessToken}/>} /> */}
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;

import './App.css';
import Home from './pages/Home/Home';
import About from './pages/Home/About';
import Footer from './pages/Home/Footer'
import Cards from './pages/SignUpCards/Cards';
import Navbar from './pages/Navbar/Navbar';
import LoginPage from './pages/login/LoginPage';
import CitizenHome from './pages/Citizen/CitizenHome';
import CitizenLogedin from './pages/Citizen/CitizenLogedin';
import CollectorLogedin from './pages/GarbageCollector/CollectorLogedin';
import PickUp from './pages/Citizen/PickUp';
import CollectorHome from './pages/GarbageCollector/CollectorHome';
import History from './pages/Citizen/History';
import Profile from './pages/Citizen/Profile';
import ScheduledPickup from './pages/GarbageCollector/ScheduledPickup';
import Map from './pages/GarbageCollector/Map';

import {
  Routes,
  Route
} from "react-router-dom";


function App() {
  
  return (
   <>
     <Navbar/>
      <Routes>
         <Route path="/" element={
          <div>
            <Home/>
            <About/>
            <Footer/>
          </div>
         }/>
         <Route path="/cards" element={<Cards/>}/>
         <Route path="/citizens" element={<CitizenHome/>}/>
         <Route path="/collector" element={<CollectorHome/>}/>
         <Route path="/login" element={<LoginPage/>}/>
         <Route path="/pickup" element={<PickUp/>}/>
         <Route path="/citizenslogedin" element={<CitizenLogedin/>}/>
         <Route path="/collectorlogedin" element={<CollectorLogedin/>}/>
         <Route path="/history" element={<History/>}/>
        <Route path="/schedule" element={<ScheduledPickup/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/map" element={<Map/>}/>
      </Routes>
    </>
  );
}

export default App;

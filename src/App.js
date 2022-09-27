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
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
function App() {
  
  return (
   <Router>
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
      </Routes>
    </Router>
  );
}

export default App;

import './App.css';
import Home from './components/Home';
import Form from './components/Form';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
function App() {
  return (
   <Router>
      <Routes>
         <Route path="/" element={
          <div>
            <Home/>
            <Form/>
          </div>
         
         }/>
      </Routes>
    </Router>
  );
}

export default App;

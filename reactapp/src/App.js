import './App.css';
import AddProduct from './pages/AddProduct';
import Navbar from './pages/Navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import axios from 'axios';
import ViewProduct from './pages/ViewProduct';
axios.defaults.baseURL = "http://localhost:8000/";

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar/>{<br/>}
      <Routes>
          <Route exact path = "/products" element={<ViewProduct/>}></Route>
          <Route exact path = "/addproduct" element={<AddProduct/>}></Route>
      </Routes>
      </Router>
    </div>
  );
}

export default App;

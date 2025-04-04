
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Login from './components/login'
import Signup from './components/signup'
import Dashboard from './components/dashboard'

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
    </Router>
  )
}

export default App

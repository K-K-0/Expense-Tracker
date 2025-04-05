
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Login from './components/login'
import Signup from './components/signup'
import Dashboard from './components/dashboard'
import AddExpense from "./components/addExpense";

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/addExpense' element={<AddExpense/>} />

      </Routes>
    </Router>
  )
}

export default App

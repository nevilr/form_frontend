import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './page/LoginForm';
import Register from './page/Register';
import Home from './page/Home';
import Protected from './Protected';
import Errorpage from './page/Errorpage';
import Test from './page/Devloped'
import Greeting from './for information/demo';
import Backup from './Bacup/Validation'
import View from './page/ViewPage'
import Fetch from './for information/fetch';

function App() {

  return (
    <>
    {/* <Router>
      <Routes>
      <Route path='/home' element={<Protected ><Home/></Protected>} />     

      <Route path='/' element={<Register />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='*' element= {<Errorpage/>}/>
      </Routes>
    </Router> */}

<Router>
  <Routes>
  <Route  path="/" element={<Home/>} />
        <Route path="/devlop/:id?" element={<Test/>} />
        <Route path="/view/:id" element={<View/>} />
  </Routes>
</Router>


   {/* <Home/> */}
   
    {/* <Backup/> */}
  {/* <Greeting/> */}
   {/* <Test/> */}
  {/* <Check/> */}

{/* <Fetch/> */}

    </>
    
  );
}

export default App;










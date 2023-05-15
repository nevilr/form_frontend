import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Protected from './Protected';
import LoginPage from './page/LoginForm';
import Register from './page/Register';
import Home from './page/Home';
import Test from './page/Devloped'
import Formpage from './page/FormPage'
import UserForms from './page/UserForms';
import Errorpage from './page/Errorpage';

import Fetch from './for information/fetch';
import Backup from './Bacup/Validation'
import Greeting from './for information/demo';

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
          <Route path="/" element={<Home />} />
          <Route path="/devlop/:slug?" element={<Test />} />
          <Route path="/formpage/:slug" element={<Formpage />} />
          <Route path="/userforms/:slug" element={<UserForms />} />
          <Route path='*' element={<Errorpage />} />
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










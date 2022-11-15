import React from 'react';
import { Route, Routes} from 'react-router-dom';
import './components/css/style.scss';

import Home from './components/pages/Home';
import Header from './components/Header/index';
import Genres from './components/pages/Genres';
import Profile from './components/pages/Profile';
import Footer from "./components/Footer";



function App() {
  return (<>
    <Header/>

    <div className="content">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/genres" element={<Genres />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
      </Routes>
      <Footer/>
  </div>

  </>
  );
}

export default App;

import React from 'react';
import { Route, Routes} from 'react-router-dom';
import './components/css/style.scss';


import Home from './components/pages/Home';
import Header from './components/Header/index';
import Genres from './components/pages/Genres';
import Profile from './components/pages/Profile';
import Footer from "./components/Footer";
import Films from "./components/pages/Films";
import BuyTicket from "./components/pages/BuyTicket";



function App() {
  return (<>
    <Header/>

    <div className="content">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/genres" element={<Genres />}></Route>
        <Route path="/films" element={<Films />}></Route>
        <Route path="/film/:id" element={<BuyTicket />}/>
        <Route path="/profile" element={<Profile />}></Route>
      </Routes>
  </div>

    <Footer/>
  </>
  );
}

export default App;

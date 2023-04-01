
import './App.css';
import {useContext } from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './views/Home';
import { AuthContext } from './contexts/AuthProvider';
import Search from './views/Search';
import Portfolio from './views/Portfolio';
import StockSingle from './views/StockSingle';

function App() {
  const {user, logout} = useContext(AuthContext)
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="/">Stock App</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
        <a className="nav-link active" aria-current="page" href="/">Home</a>
        <a className="nav-link active" href="/search">Search</a>
        {
          (user.loggedIn) ?
          <a className="nav-link active" href={`/portfolio/${user.uid}`}>My Portfolio</a>
          :
          <></>
        }
        {
          (user.loggedIn) ?
          <button className='border border-0 btn' id='btn' onClick={logout}>Logout</button>
          :
          <></>
        }
        
      </div>
    </div>
  </div>
</nav>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/search' element={<Search />}/>
        <Route path='/portfolio/:uid' element={<Portfolio />}/>
        <Route path='/stock/:ticker' element={<StockSingle />}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;

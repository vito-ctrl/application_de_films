import './App.css'
import { BrowserRouter, Router, Route, Routes } from 'react-router-dom'
import Home from './Home'
import Trending from './Tranding'
import Favorites from './Favorits'
import Sresults from './Sresults'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/tranding' element={<Trending/>}/>
        <Route path='/favorits' element={<Favorites/>}/>
        <Route path='/Sresults' element={<Sresults/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App

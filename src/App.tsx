import {BrowserRouter, Route, Routes } from   'react-router-dom'
import { NotFound } from './pages/NotFound'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { useEffect, useState } from 'react';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
      const [isDarkMode, setIsDarkMode] = useState(true);
      
      useEffect(()=>{
          const handleScroll = () =>{
              setIsScrolled(window.scrollY > 10);
          }
          window.addEventListener('scroll', handleScroll);
          return ()=> window.removeEventListener('scroll', handleScroll)
      }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route index element={<Home isScrolled={isScrolled} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
          <Route path='about' element={<About isScrolled={isScrolled} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
          <Route path='*' element={<NotFound />} />
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

import {BrowserRouter, Route, Routes } from   'react-router-dom'
import { NotFound } from './pages/NotFound'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { useEffect, useState } from 'react';
import { SignIn } from './auth/SignIn';
import { SignUp } from './auth/SignUp';

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
          <Route path='login' element={<SignIn isScrolled={isScrolled} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
          <Route path='signup' element={<SignUp isScrolled={isScrolled} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
          <Route path='*' element={<NotFound />} />
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

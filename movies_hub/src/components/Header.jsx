import { Disclosure } from '@headlessui/react'
import React, {useState, useEffect} from 'react'
import DhubImage from '../assets/ChatGPT_Image_Apr_8__2025__01_00_35_PM-removebg-preview.png'
import LhubImage from '../assets/ChatGPT_Image_Apr_11__2025__03_35_56_PM-removebg-preview.png'
import './Header.css'
import Msearch from '../Msearch'
import { SunIcon } from '@heroicons/react/16/solid'
export default function Header() {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || 'light');
  
    useEffect(() => {
      // Add or remove dark mode class on <html> tag
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      // Store user preference in localStorage
      localStorage.setItem('theme', theme);
    }, [theme]);
  
    const toggleTheme = () => {
      setTheme(theme === 'dark' ? 'light' : 'dark');
    };
  return (
    <Disclosure as="nav" id='navbar' className="bg-black dark:bg-white absolute w-full z-20">
      <div className="sticky mx-auto max-w-7xl px-2 sm:px-5 lg:px-7 z-20">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-between">
            <div className="flex items-center">
              <img
                alt="Movieahub"
                src={theme === 'dark' ?  LhubImage :DhubImage}
                className="h-20 w-auto"
              />
            </div>
            <div className="w-full max-w-sm min-w-[200px] mx-6">
              <Msearch/>
            </div>
            <button
              onClick={toggleTheme}>
              <SunIcon className='h-6 w-6 text-orange-400'/>
            </button>
          </div>
        </div>
      </div>
    </Disclosure>
  )
}
import { Disclosure } from '@headlessui/react'
import React from 'react'
import hubImage from '../assets/ChatGPT_Image_Apr_8__2025__01_00_35_PM-removebg-preview.png'


export default function Header() {
  return (
    <Disclosure as="nav" className="bg-zinc-900">
      <div className="mx-auto max-w-7xl px-2 sm:px-5 lg:px-7">
        <div className="relative flex h-12 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center ">
              <img
                alt="Your Company"
                src={hubImage}
                className="h-40 w-auto"
              />
          <div className="w-full max-w-sm min-w-[200px]">
            <div className="relative flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600">
                <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
              </svg>
          
              <input
              className="w-full bg-transparent placeholder:text-slate-400 text-slate-300 text-sm pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              placeholder="Search Movieahub" 
              />
            </div>
          </div>
            </div>
          </div>
          
        </div>
      </div>
    </Disclosure>
  )
}


import { SearchIcon } from 'lucide-react'
import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Sresults from './Sresults';
// import { Stats } from 'fs';

export default function Msearch () {
    const [Search, setSearch] = useState({})
    const [data, setData] = useState()
    const navigate = useNavigate()

    const handleChange = (e) => {
        setSearch({
            ...Search,
            [e.target.name]: e.target.value
        })
    }
    // console.log(Search)
    
    const handleClick = async() => {
        navigate('/Sresults', { state: { query: Search.search } });
    }
    console.log(data)

    return (
        <>
        <div className="relative flex items-center">
            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600">
                <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
            </svg> */}
            <input
                name='search'
                className="w-full bg-white bg-opacity-10 border border-gray-700 rounded-sm placeholder:text-slate-400 text-slate-300 text-sm pl-4 pr-3 py-2 transition duration-300 focus:outline-none focus:border-orange-500 hover:border-orange-400 dark:text-slate-900 dark:bg-gray-200"
                placeholder="Search Movieahub" 
                onChange={handleChange}
            />
                <button onClick={handleClick}>
                <SearchIcon className='h-6 w-6 m-2 text-orange-400'/>
                </button>
        </div>
        </>
    )
}

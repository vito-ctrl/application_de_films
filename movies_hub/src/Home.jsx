import './Home.css'
import { useState, useEffect } from 'react'
import vid from "./assets/4010131-uhd_4096_2160_25fps.mp4"
const Home = () => {
    const [Data, setData] = useState()

    useEffect(() => {
        getdata()
    },[])

    const getdata = async() => {
        try{
            const res = await fetch('http://www.omdbapi.com/?t=game&apikey=f93e5905')
            if(!res.ok){
                throw new Error(`HTTP ERROR! STATUS: ${res.status}`)   
            }
            const data = await res.json()
            console.log("geted data: ", data.Title)
            setData(data)
        } catch (error){
            console.log(error);
        }
    }

    return(
        <div className="video-container">
            <video className='w-full videoTag' autoPlay loop muted>
                <source src={vid} type='video/mp4' />
            </video>
            <div className="video-overlay">
                <h1 className='color-white'>Your Text Here</h1>
                <p>Additional text can go here</p>
            </div>
        </div>
    )
}

export default Home
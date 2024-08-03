import React, { useState } from 'react'
import search from '../assets/search.png'
import clouds from '../assets/clouds.png'
import clear from '../assets/clear.png'
import drizzle from '../assets/drizzle.png'
import mist from '../assets/mist.png'
import rain from '../assets/rain.png'
import snow from '../assets/snow.png'
import wind from '../assets/wind.png'
import humidity from '../assets/humidity.png'

function Weather() {
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState([]);
    const [imgage, setImage] = useState(clear)

    const apiKey = String(import.meta.env.VITE_API_KEY)
    const apiId = String(import.meta.env.VITE_API_ID)

    async function searchWeather() {
        try {
            const response = await fetch(`${apiKey}${input}${apiId}`);
            const result = await response.json();
            if (data) {
                console.log(result);
                setData(result);
                setLoading(false)
                if (data?.weather?.[0].main === 'Clouds') {
                    setImage(clouds)
                } else if (data?.weather?.[0].main === 'Clear') {
                    setImage(clear)
                } else if (data?.weather?.[0].main === 'Drizzle') {
                    setImage(drizzle)
                } else if (data?.weather?.[0].main === 'Mist') {
                    setImage(mist)
                } else if (data?.weather?.[0].main === 'Rain') {
                    setImage(rain)
                } else if (data?.weather?.[0].main === 'Snow') {
                    setImage(snow)
                }
            } else {
                setError(true)
            }
        } catch (err) {
            console.log("Error:: Error in api calling::", err);
            setTimeout(() => {
                setLoading(false)
                setError(true)
            }, 1000);
        }
    }

    const handleweather = () => {
        if (input === '') {
            alert("Please enter city name first");
        } else {
            searchWeather();
            setInput('');
        }
    }

    return (
        <div className='pt-4' >
            <div className='h-96 w-80 m-auto rounded-xl text-white bg-gradient-to-b from-blue-400 to-green-400 ' >
                <div className='w-full flex justify-evenly m-auto pt-4'>
                    <input value={input} onChange={(e) => setInput(e.target.value)} className='h-10 w-4/5 ml-2 pl-3 rounded-3xl outline-none border-none text-black ' type="text" placeholder='Search Here' />
                    <button onClick={handleweather} className='h-10 w-10 rounded-3xl bg-white'> <img className='h-5 w-5 ml-2' src={search} alt="" /> </button>
                </div>
                {
                    loading ? <h1 className='text-center pt-5 font-semibold text-xl text-black' >Enter city name</h1> :
                        <>
                            {
                                error ? <h1 className='text-center font-semibold text-xl mt-5 text-red-500'>Get an Error...</h1> :
                                    <>
                                        <div className='h-20 w-full' >
                                            <img className='h-20 w-20 m-auto mt-4 ' src={imgage} alt="" />
                                        </div>
                                        <div className='w-1/2 m-auto text-center mt-2 '>
                                            <h1 className='font-bold text-4xl'>{data?.main?.temp}c</h1>
                                            <h1 className='font-semibold text-2xl'>{data?.name}</h1>
                                            <p className='font-semibold text-md mt-4'>{data?.weather?.[0].main}</p>
                                        </div>
                                        <div className='w-full flex justify-around m-auto text-center pt-4 pb-2' >
                                            <div className='flex justify-center items-center  '>
                                                <img className='h-6 w-6 mr-2 mt-1' src={wind} alt="" />
                                                <div>
                                                    <h1 className='font-semibold text-lg' >{data?.wind?.speed} <span className='text-sm from-neutral-400' >Km/h</span></h1>
                                                    <p className='font-semibold text-sm' >Wind Speed</p>
                                                </div>
                                            </div>
                                            <div className='flex justify-center items-center ' >
                                                <img className='h-5 w-6 mr-2 mt-1 ' src={humidity} alt="" />
                                                <div>
                                                    <h1 className='font-bold text-lg' >{data?.main?.humidity}%</h1>
                                                    <p className='font-semibold text-sm' >Humidity</p>
                                                </div>
                                            </div>

                                        </div>
                                    </>
                            }

                        </>
                }
            </div >
        </div>
    )
}

export default Weather
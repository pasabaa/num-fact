import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { months } from '../data/months';

export const NumFact = () => {

    const [data, setData] = useState(['']);
    const [fact, setFfact] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const [change, setChange] = useState(false);

    const [month, setMonth] = useState('12');
    const [day, setDay] = useState('29');

    const getData = () => {

        setData('');
        setLoading(true);
        setError(false);
        setChange(false);

        const options = {
            method: 'GET',
            url: `https://numbersapi.p.rapidapi.com/${month}/${day}/date`,
            params: {fragment: 'true', json: 'true'},
            headers: {
              'X-RapidAPI-Key': '5ff69d6c00msh9eec15b597770dap1d4f41jsn8b588032000d',
              'X-RapidAPI-Host': 'numbersapi.p.rapidapi.com'
            }
          };
          

          if(day > 31 || day <= 0) {
            setError(true);
            setLoading(false);
          } else {
            axios.request(options)
            .then(res => setData(res.data))
            .catch(error => console.log(error))
            .finally(()=>setLoading(false))
          }
          
    }

    const handleOnChangeMonth = (e) => {
        setChange(true);
        let result = e.target.value;
        setMonth(result);
    }

    const handleOnChangeDay = (e) => {
        setChange(true);
        let result = e.target.value;
        setDay(result);
    }

    useEffect(()=>{
        getData();
    }, [fact])


  return (
    <section>
        <h1 className='font-bold text-4xl'>NumFact</h1>
        <p className='text-lg mt-2'>Obten datos interesantes sobre los números. NumFact proporciona curiosidades, datos matemáticos, fechas y años sobre los números.</p>
        <hr className='mt-4' />
        <div className='flex flex-col justify-around items-center'>
            <h2 className='my-4'>Para empezar, coloca un mes y un día.</h2>
            <div className='flex gap-16 items-center justify-center w-full'>
                <div className='flex flex-col text-center'>
                    <label className='font-semibold' htmlFor="month">Mes</label>
                    <select
                        value={month}
                        onChange={handleOnChangeMonth} 
                        className='rounded-xl bg-blue-100 text-2xl font-bold text-center text-blue-400 p-2 border mt-2 w-full h-20' type="number" 
                        name="month" 
                        id="month">
                            {
                                months.map((item, i) => {
                                    return(
                                        <option key={i} value={i + 1}>{item.name}</option>
                                    )
                                })
                            }
                    </select>
                </div>
                <div className='flex flex-col text-center'>
                    <label className='font-semibold' htmlFor="day">Día</label>
                    <input value={day} onChange={handleOnChangeDay} max={31} min={1} className='rounded-xl bg-blue-100 text-2xl font-bold text-center text-blue-400 p-2 border mt-2 w-24 h-20' type="number" name="day" id="day" />
                </div>
            </div>
        </div>
        {error && <p className='mt-4 text-red-500 text-center'>Debe ser un día del mes válido.</p>}
        {
            loading || change || error ? <div className='mt-4 flex items-center justify-center relative'>{loading ? <span className="loader my-6"></span> : 'Coloca una fecha para buscar un increíble dato curioso.'}</div> :
            <div className='mt-8'>
                <div>
                    <h1 className='text-lg font-bold'>¿Qué pasó...?</h1>
                    <p className='text-base mt-4 capitalize'>El {day} de {months[month-1].name} de {data.year} - {data.text}</p>
                </div>
            </div>
        }
        <button className='mt-4 bg-blue-600 text-white font-semibold px-2 py-3 w-full rounded-xl' onClick={()=>{setFfact(!fact)}}>Otro Dato</button>
    </section>
  )
}

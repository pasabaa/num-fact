import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { months } from '../data/months';

export const NumFact = () => {

    const [data, setData] = useState(['']);
    const [fact, setFfact] = useState(false);
    const [loading, setLoading] = useState(false);
    const [change, setChange] = useState(false);

    const [month, setMonth] = useState('12');
    const [day, setDay] = useState('29');

    const getData = () => {

        setData('');
        setLoading(true);
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
          
          axios.request(options)
          .then(res => setData(res.data))
          .catch(error => console.log(error))
          .finally(()=>setLoading(false))
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
                    <input onChange={handleOnChangeMonth} max={12} min={1} className='rounded-xl bg-blue-100 text-4xl font-bold text-center text-blue-400 p-2 border mt-2 w-24 h-24' type="number" name="month" id="month" />
                </div>
                <div className='flex flex-col text-center'>
                    <label className='font-semibold' htmlFor="day">Día</label>
                    <input onChange={handleOnChangeDay} max={31} min={1} className='rounded-xl bg-blue-100 text-4xl font-bold text-center text-blue-400 p-2 border mt-2 w-24 h-24' type="number" name="day" id="day" />
                </div>
            </div>
        </div>
        {
            loading || change ? <p className='mt-4'>{loading ? 'Cargando...' : 'Coloca una fecha para buscar un increíble dato curioso.'}</p> :
            <div className='mt-8'>
                <div>
                    <h1 className='text-lg font-bold'>¿Qué pasó...?</h1>
                    <p className='text-base mt-4 capitalize'>El {day} de {months[month-1].name} de {data.year} - {data.text}</p>
                </div>
            </div>
        }
        <button className='mt-4 bg-blue-600 text-white font-semibold px-2 py-3 w-full rounded-xl' onClick={()=>{setFfact(!fact)}}>Otro Dato</button>

        <div className='p-3 bg-blue-100 rounded-xl mt-2'>
            <div className='grid grid-cols-3 gap-2'>
                {
                    months.map((item, i)=>{
                        return(
                            <button className='h-24 text-center bg-blue-200 font-bold text-lg text-blue-400 rounded-lg' key={i}>{item.name}</button>
                        )
                    })
                }
            </div>
            
        </div>
    </section>
  )
}

import React, { useState } from 'react'
import logo from '../assets/logo.png'
import DarkMode from "../hooks/DarkMode"
import { motion } from 'framer-motion'
import moon from '../assets/icon-moon.svg'
import sun from '../assets/icon-sun.svg'
import useDarkMode from '../hooks/DarkMode'
import profile from '../assets/p4.jpeg'

function Header() {

    const [colorTheme, setTheme] = useDarkMode();
    const [darkSide, setDarkSide] = useState(
        colorTheme === 'light' ? true : false
    );

    const toggleDarkMode = () => {
        setTheme(colorTheme);
        setDarkSide((state) => !state)
    }

    const transition = {
        type: 'spring',
        stifness: 200,
        damping: 10
    }
    return (
        <div className='h-[80px] z-50 duration-300 ease-in-out p-4 dark:bg-[#1e2124]  bg-[#36393e] flex items-center justify-end'>

            <img src={logo} alt="logo" className='h-[80px] absolute top-0 left-0 rounded-tr-2xl rounded-br-2xl'/>

            <div className='flex items-center'>

                {colorTheme === "light" ?
                    <motion.img initial={{ scale: 0.6, rotate: 90 }} animate={{ scale: 1, rotate: 360, transition }} whileTap={{ scale: 0.9, rotate: 15 }} onClick={toggleDarkMode} className='cursor-pointer h-6 ml-8 ' src={moon} />

                    :

                    <motion.img initial={{ scale: 0.6, rotate: 45 }} animate={{ scale: 1, rotate: 180, transition }} whileTap={{ scale: 0.9, rotate: 15 }} className='cursor-pointer h-7 ml-8' onClick={toggleDarkMode} src={sun} />

                }

                <div className=' h-[80px] border-dotted border-l border-[#494e6e] mx-6'>
                </div>
                <div className='relative'> 
                    <img src={profile} alt="profile" className='h-[80px] top-0 left-0 rounded-full'/>
                </div>
            </div>
        </div>
    )
}


export default Header;
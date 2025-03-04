'use client'
import { useState, useEffect } from 'react'
import {motion } from 'framer-motion'

const LoadingScreen = ({ children }) => {

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const loadingTime = setTimeout(() => {
            setIsLoading(false)
        }, 3000)
        return () => {
            clearTimeout(loadingTime)
        }
    }, [isLoading])

    return (
        <div>
            {isLoading ? <div className='h-screen flex justify-center items-center p-2'>
                <motion.div
                    className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                /></div> : children}
        </div>
    )
}

export default LoadingScreen

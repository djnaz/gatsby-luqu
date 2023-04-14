import React from 'react'
import MainNav from './MainNav'

export default function Layout({ children }) {
  return (
    <div className='layout'>
        <MainNav />
        <div className='content'>
            { children }
        </div>
    </div>
  )
}

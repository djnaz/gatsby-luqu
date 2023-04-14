import React from 'react'
import { Link } from 'gatsby'

export default function MainNav() {
  return (
    <nav>
        <Link to="/">Home</Link>
        <Link to="/demo/">Demo</Link>
    </nav>
  )
}

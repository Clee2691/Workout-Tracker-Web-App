import React from 'react';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
    return (
        <nav className="navbar navbar-expand-lg">
            <Link to="/" className="navbar-brand">Workout Tracker</Link>
        </nav>
    )
}

export default NavigationBar;
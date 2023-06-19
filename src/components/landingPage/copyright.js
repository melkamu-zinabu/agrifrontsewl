import React from 'react';
import './style.css'

function Footer()
{
    return (
        <footer className="bg-dark text-center p-2  mb-0">
            <div className="container">
                <p className="text-white"> All rights reserved By AISS &copy; {new Date().getFullYear()}.</p>
            </div>
        </footer>
    );
}

export default Footer;
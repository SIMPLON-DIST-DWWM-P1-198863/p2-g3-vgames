import { useState } from "react";


export default function EnTete() {
    return(
        <>
        <div className="for-header-align">
            <div className="for-header-logo">
                <img 
                className="image-header"
                src="./logo.png" alt="logo-header" />
                Gaming
            </div>

             <div className="for-header-mid">
                <input 
                    className="nav-bar-input"
                    placeholder="Counter strike..."
                    type="text" 
                    name="search"
                />
            </div>

             <div className="for-header-end">
                <img 
                className="github-header"
                src="./github-logo.png" alt="github-logo" />
            </div>
        </div>
        </>
    )
}
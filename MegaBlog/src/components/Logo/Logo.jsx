import React from 'react'

function Logo({width = '60px',className}){

    return (      <div className={`${className}`}>
        <img src='blogger-logo-icon-png-10177.png' alt="Logo" width={width} />
    </div>
                
           
    )
}

export default Logo
import React from 'react'

function Container({children , className =''}) {
  return (
    <div className={`${className} w-[50%] mx-auto px-4 py-4`}>{children}</div>
  )
}

export default Container
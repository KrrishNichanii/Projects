import React , {useId} from 'react'

function Input({
    label ,
    type='text' ,
     className = '' ,
    ...props 
    
} ,ref) {

    const id = useId()
  return (
    <div className="">
        {
            label && (<label id={id} className='w-full font-semibold block'>{label}</label>)
            
        }
        <input 
        type={type} 
        ref={ref}
        {...props}
        id={id} 
        className={`mt-1.5  px-3 py-2 rounded-lg bg-white 
        text-black outline-none focus:bg-gray-50 duration-200 
        border border-gray-200 w-full  ${className}`}/>
    </div>
          
  )
}

export default React.forwardRef(Input)
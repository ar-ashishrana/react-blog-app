import React, { useId } from 'react'

const Select = React.forwardRef(({
    options,
    label,
    className='',
    ...props
}, ref)=> {
    const id= useId();
  return (
    <div className='w-full'>
        {label && <label htmlFor={id}>{label}</label>}
        <select id={id} {...props} className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-500 duration-200 border border-gray-200 w-full ${className}`} ref={ref}>
            {options?.map((item)=>(
                <option value={item} key={item}>{item}</option>
            ))}
        </select>
    </div>
  )
})

export default Select
// export default React.forwardRef(Select)

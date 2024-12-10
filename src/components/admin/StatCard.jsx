import React from 'react'

const StatCard = ({title = 'Employees', total = 24, color = 'text-sky-500'}) => {
  return (
    <div className='neumorph w-[150px] h-[150px] rounded-[50px] flex flex-col items-center justify-center'>
        <h1 className={color}>{total}</h1>

        <h2>
            {title}
        </h2>
    </div>
  )
}

export default StatCard
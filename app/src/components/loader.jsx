import React from 'react'

const Loader = ({ size }) => {
  if (size === 'small') {
    return (
      <div className='flex items-center justify-center space-x-2'>
        <div className='border-l-primary animate-spin inline-block h-4 w-4 border-2 rounded-full' role='status' />
      </div>
    )
  }
  return (
    <div className='flex items-center justify-center space-x-2 m-20'>
      <div className='border-l-primary animate-spin inline-block w-16 h-16 border-[6px] rounded-full' role='status' />
    </div>
  )
}

export default Loader

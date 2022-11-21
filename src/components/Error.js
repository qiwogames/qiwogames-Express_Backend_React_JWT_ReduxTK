import React from 'react';



const Error = ({children, ...props}) => {
  
  return(
    <div className='alert alert-danger' {...props}>
      {children}
    </div>
  )
}


export default Error;

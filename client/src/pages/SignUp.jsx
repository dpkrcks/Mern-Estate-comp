import React from 'react';
import {Link} from 'react-router-dom';

export default function SignUp() {
  return (
    <div className='max-w-lg mx-auto p-3'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form className='flex flex-col gap-4'>
        <input type='text' placeholder='username' 
               className='border p-3 rounded-lg' id='username' />
        <input type='email' placeholder='email' 
               className='border p-3 rounded-lg' id='email' />
        <input type='password' placeholder='password' 
               className='border p-3 rounded-lg' id='password' />
        <button className='bg-slate-700 text-white rounded-lg p-3 uppercase'>sign Up</button>       
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Already have an account?</p>
        <Link to='/sign-in' className='text-blue-700'>Sign in</Link>
      </div>      
    </div>
  )
}

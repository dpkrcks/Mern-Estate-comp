import React , {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useDispatch,useSelector } from 'react-redux';
import { signInStart,signInSuccess,signIinFailure } from '../redux/user/userSlice.js';

export default function SignIn() {

  const [formData , setFormData] = useState({});
  const {loading , error} = useSelector((state)=>state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e)=>{
    setFormData({
      ...formData , 
      [e.target.id] : e.target.value,
    });
  };
  console.log(formData);

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      dispatch(signInStart());
       const res = await fetch('/api/auth/signin',{
        method : 'POST',
        headers :{
          'Content-Type' : 'application/json'
        },
        body:JSON.stringify(formData)
       });

       const data = await res.json();
       console.log('active user ___________',data);

       if(data.Success===false){
        dispatch(signIinFailure(data.message));
        return;
       }
       dispatch(signInSuccess(data));
       navigate('/');
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className='max-w-lg mx-auto py-3 '>
      <h1 className='text-3xl font-semibold text-center my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type='email' placeholder='email' className='border rounded-lg p-3' id='email' onChange={handleChange} />
        <input type='password' placeholder='password' className='border rounded-lg p-3' id='password' onChange={handleChange} />
        <button disabled={loading}  className='rounded-lg bg-slate-700 text-white py-3 uppercase hover:opacity-95 disabled:opacity-95'>{loading ? 'Loading...' : 'Sign In'}</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Dont have an account?</p>
        <Link to='/sign-up' className='text-blue-700'>Sign up</Link>
      </div>
      {error && <p className='text-red-700 mt-5'>{error}</p>}
    </div>
  )
}

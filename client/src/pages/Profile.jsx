import React, { useEffect, useState } from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { useRef } from 'react';
import { app } from '../firebase';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { updateUserFailure, updateUserStart, updateUserSuccess } from '../redux/user/userSlice.js';

export default function Profile() {

  const {currentUser ,  loading , error} = useSelector((state)=>state.user);
  const [file,setFile] = useState(undefined);
  const [filePerc , setFilePerc] = useState(0);
  const [fileUploadError,setFileUploadError] = useState(false);
  const [formData,setFormData] = useState({});
  const [updateStatus , setUpdateStatus] = useState(false);
  const fileRef = useRef();
  const disptach = useDispatch();

  console.log(formData);
  console.log('currentUser__________',currentUser)

  useEffect(()=>{
    if(file)
      handleUploadFile(file);
  },[file]);

  const handleUploadFile = (file)=>{
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage,fileName);
    const uploadTask = uploadBytesResumable(storageRef,file);

    uploadTask.on('state_changed',
         (snapshot)=>{
          const progress = (snapshot.bytesTransferred/snapshot.totalBytes)* 100;
          console.log('Upload is in ',progress,'% progress');
          setFilePerc(Math.round(progress));
         },
         (error)=>{
           setFileUploadError(false);
         },
         ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
               setFormData({...formData , avatar : downloadURL});
          });
         }
         );
  };


  const handleChange = (e)=>{
    setFormData({...formData , [e.target.id] : e.target.value});
  };

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
         disptach(updateUserStart);
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
           method : 'POST',
           headers :{
             'Content-Type' : 'application/json',
           },
           body: JSON.stringify(formData),
      });

      const data = await res.json();
      if(data.Success=== false){
        disptach(updateUserFailure(data.message));
        return;
      }
      disptach(updateUserSuccess(data));
      setUpdateStatus(true);
    } catch (error) {
      console.log(error);
      disptach(updateUserFailure(error.message));
    }
  };



  return ( 
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input onChange={(e)=>setFile(e.target.files[0])} type='file' ref={fileRef} hidden accept='image/*' />
        <img onClick={()=> fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt='Profile' className='h-24 w-24 rounded-full self-center mt-2 cursor-pointer'  />
        <p className='text-sm self-center'>
         {fileUploadError ? (
          <span className='text-red-700'>Error Image Upload(size must be less than 2 MB)
           </span>) : filePerc >0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
           ) : filePerc === 100 ? (
           <span className='text-green-700'>Image Successfully uploaded.</span>) :
           ("")}
        </p>
        <input defaultValue={currentUser.username} onChange={handleChange} type='text' placeholder='username' id='username' className='border rounded-lg p-3' />
        <input defaultValue={currentUser.email} onChange={handleChange} type='email' placeholder='email' id='email' className='border rounded-lg p-3'  />
        <input onChange={handleChange} type='text' placeholder='password' id='password' className='border rounded-lg p-3'/>
        <button disabled={loading} className='border rounded-lg p-3 uppercase bg-slate-700 text-white hover:opacity-95 disabled:opacity-85'>{loading ? 'loading....' : 'Update'}</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete account</span>
        <span className='text-red-700 cursor-pointer'>Sign out</span>
      </div>
      <p className='text-red-700 mt-5'>{error ? error : ""}</p>
      <p>{updateStatus ? "User Updated Successfully" : ""}</p>
    </div>
  )
}

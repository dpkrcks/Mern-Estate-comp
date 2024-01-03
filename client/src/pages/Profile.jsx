import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRef } from 'react';
import { app } from '../firebase';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'

export default function Profile() {

  const {currentUser} = useSelector((state)=>state.user);
  const [file,setFile] = useState(undefined);
  const [filePerc , setFilePerc] = useState(0);
  const [fileUploadError,setFileUploadError] = useState(false);
  const [formData,setFormData] = useState({});
  const fileRef = useRef();

  console.log(formData);

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

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <input onChange={(e)=>setFile(e.target.files[0])} type='file' ref={fileRef} hidden accept='image/*' />
        <img onClick={()=> fileRef.current.click()} src={currentUser.avatar} alt='Profile' className='h-24 w-24 rounded-full self-center mt-2 cursor-pointer'  />
        <p className='text-sm self-center'>
         {fileUploadError ? (
          <span className='text-red-700'>Error Image Upload(size must be less than 2 MB)
           </span>) : filePerc >0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
           ) : filePerc === 100 ? (
           <span className='text-green-700'>Image Successfully uploaded.</span>) :
           ("")}
        </p>
        <input type='text' placeholder='username' id='username' className='border rounded-lg p-3' />
        <input type='email' placeholder='email' id='email' className='border rounded-lg p-3'  />
        <input type='text' placeholder='password' id='password' className='border rounded-lg p-3'/>
        <button className='border rounded-lg p-3 uppercase bg-slate-700 text-white hover:opacity-95 disabled:opacity-85'>Update</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete account</span>
        <span className='text-red-700 cursor-pointer'>Sign out</span>
      </div>
    </div>
  )
}

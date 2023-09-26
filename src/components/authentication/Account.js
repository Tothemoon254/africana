import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../contexts/AuthContext';



const Account = () => {
  const { user, logout, updateUserProfile } = UserAuth();
  const [name, setName] = useState('John Doe');
  const [profilePic, setProfilePic] = useState('"https://example.com/jane-q-user/profile.jpg"');
  
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      console.log('You are logged out')
    } catch (e) {
      console.log(e.message);
    }
  };
  const handleUpdateProfile = async () => {
    
    
    try {
      updateUserProfile(profilePic, name)
    } catch (e) {
      console.log(e.message);
    }
  };
  const initials = (name) =>
  name
    ? name
        .split(" ")
        .map((n) => n.charAt(0))
        .join("")
    : "";

    
  
  

  
  return (
    <div className='max-w-[600px] mx-auto mt-16 p-4 dark:bg-black dark:text-white dark:border-white '>
      
      
      <h1 className='text-2xl font-bold py-4'>Account</h1>
      <div className=' flex rounded-[100%] border-2 shadow-lg h-[75px] w-[75px] border-black place-items-center text-lg font-bold justify-center  dark:border-white dark:border-[1px]  '>{initials(user.displayName)}</div>
      
      <p>Username: {user && user.displayName}</p>
      <form onSubmit={handleUpdateProfile}>
        <div className='flex flex-col py-2'>
          <label className='py-2 font-medium'>Username </label>
          <input onChange={(e) => setName(e.target.value)} className='border p-3 text-black' type='text' />
        </div>
       
        <button className='border bg-black hover:bg-grey w-full p-4 my-2 text-white'>
          Change UserName
        </button>
      </form>
      

      

      <button onClick={handleLogout} className='border px-6 py-2 my-4'>
        Logout
      </button>
      
    </div>
  );
};

export default Account;
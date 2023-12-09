"use client"
import DataForm from './components/DataForm';
import Landing from './components/Landing';
import { useState } from 'react';

export default function Home() {
  const [navigation, setNavigation] = useState(0);

  const nextPage = () => {
    setNavigation(navigation+1);
  };

  const prevPage = () => {
    setNavigation(navigation-1);
  };

  return (
    <div className='relative h-screen flex flex-col justify-center items-center overflow-hidden  '>
      <img
        className='absolute inset-0 w-full h-full object-cover z-0'
        src={'paper.jpg'}
        alt='Background'
      />
      <div className='relative top-0 w-full h-screen py-44 px-96 z-10'>
        {navigation == 0 && <Landing onProgress={nextPage} />}
        {navigation == 1 && <DataForm onProgress={nextPage} onReturn={prevPage}/>}
      </div>
    </div>
  );
}

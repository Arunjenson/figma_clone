'use client'

import Room from './Room';
import {CollaborativeApp} from './CollaborativeApp';
import Live from '@/components/Live';

export default function Page() {
  return (

    <div className="h-screen w-full flex justify-center items-center text-center">
      <h1 className='text-5xl text-white'>hello figma clone</h1>
      <Live />
    </div>
  )
}
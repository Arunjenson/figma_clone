import React, { useCallback } from 'react'
import LiveCursors from './cursor/LiveCursors'
import { useMyPresence, useOthers } from '@/liveblocks.config'

const Live = () => {
  const others = useOthers();
  const [{ cursor }, updateMyPresence] = useMyPresence() as any;

  const handlePointerMove = useCallback((event: React.PointerEvent) => {
    event.preventDefault();
    const x = event.clientX - event.currentTarget.getBoundingClientRect().x
    const y = event.clientY - event.currentTarget.getBoundingClientRect().y
    updateMyPresence({cursor:{x,y}})
  }, [])
  
  const handlePointerDown = useCallback((event: React.PointerEvent) => {
    const x = event.clientX - event.currentTarget.getBoundingClientRect().x
    const y = event.clientY - event.currentTarget.getBoundingClientRect().y
    updateMyPresence({cursor:{x,y}})
  }, [])
  
  const handlePointerLeave = useCallback((event: React.PointerEvent) => {
    event.preventDefault();
    updateMyPresence({cursor:null,message:null})
  },[])
  return (
    <div onPointerDown={handlePointerDown} onPointerLeave={handlePointerLeave} onPointerMove={handlePointerMove}
    className="h-screen w-full flex justify-center items-center text-center"
    >
      <h1 className='text-5xl text-white'>hello figma clone</h1>
      <LiveCursors others={others} />
    </div>
  )
}

export default Live
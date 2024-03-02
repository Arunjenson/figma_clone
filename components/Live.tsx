import React, { useCallback, useEffect, useState } from 'react'
import LiveCursors from './cursor/LiveCursors'
import { useMyPresence, useOthers } from '@/liveblocks.config'
import CursorChat from './cursor/CursorChat';
import { CursorMode } from '@/types/type';

const Live = () => {
  const others = useOthers();
  const [{ cursor }, updateMyPresence] = useMyPresence() as any;
  const [cursorState, setCursorState] = useState({
    mode: CursorMode.Hidden
  });

  const handlePointerMove = useCallback((event: React.PointerEvent) => {
    event.preventDefault();
    const x = event.clientX - event.currentTarget.getBoundingClientRect().x
    const y = event.clientY - event.currentTarget.getBoundingClientRect().y
    updateMyPresence({ cursor: { x, y } })
  }, [])

  const handlePointerDown = useCallback((event: React.PointerEvent) => {
    const x = event.clientX - event.currentTarget.getBoundingClientRect().x
    const y = event.clientY - event.currentTarget.getBoundingClientRect().y
    updateMyPresence({ cursor: { x, y } })
  }, [])

  const handlePointerLeave = useCallback((event: React.PointerEvent) => {
    setCursorState({ mode: CursorMode.Hidden })
    updateMyPresence({ cursor: null, message: null })
  }, [])

  useEffect(() => {
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === '/') {
        setCursorState({
          mode: CursorMode.Chat,
          previousMessage: null,
          message: ''
        })
      }
      else if (e.key === 'Escape') {
        updateMyPresence({ message: '' })
        setCursorState({
          mode: CursorMode.Hidden
        })
      }
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' /') {
        e.preventDefault();

      }
    }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup',onKeyUp)
    }
  }, [updateMyPresence])
  return (
    <div onPointerDown={handlePointerDown} onPointerLeave={handlePointerLeave} onPointerMove={handlePointerMove}
      className="h-screen w-full flex justify-center items-center text-center"
    >
      <h1 className='text-5xl text-white'>hello figma clone</h1>
      {cursor && (
        <CursorChat cursor={cursor} cursorState={cursorState} setCursorState={setCursorState} updateMyPresence={updateMyPresence} />
      )}
      <LiveCursors others={others} />
    </div>
  )
}

export default Live
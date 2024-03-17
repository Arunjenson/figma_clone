import React, { useCallback, useEffect, useState } from 'react'
import LiveCursors from './cursor/LiveCursors'
import { useMyPresence, useOthers } from '@/liveblocks.config'
import CursorChat from './cursor/CursorChat';
import { CursorMode, CursorState, Reaction } from '@/types/type';
import ReactionSelector from './reaction/ReactionButton';

const Live = () => {
  const others = useOthers();
  const [{ cursor }, updateMyPresence] = useMyPresence() as any;
  const [cursorState, setCursorState] = useState<CursorState>({
    mode: CursorMode.Hidden
  });

  const [reaction,setReaction] = useState<Reaction[]>([])
  const handlePointerMove = useCallback((event: React.PointerEvent) => {
    event.preventDefault();

    if (cursor == null || cursorState.mode !== CursorMode.ReactionSelector) {
          const x = event.clientX - event.currentTarget.getBoundingClientRect().x
    const y = event.clientY - event.currentTarget.getBoundingClientRect().y
    updateMyPresence({ cursor: { x, y } })
    }


  }, [])

  const handlePointerDown = useCallback((event: React.PointerEvent) => {
    const x = event.clientX - event.currentTarget.getBoundingClientRect().x
    const y = event.clientY - event.currentTarget.getBoundingClientRect().y
    updateMyPresence({ cursor: { x, y } })
    setCursorState((state: CursorState) =>
      cursorState.mode === CursorMode.Reaction ? { ...state, isPressed: true } : state
    )
  }, [cursorState.mode, setCursorState]);
  
  const handlePointerUp = useCallback((event: React.PointerEvent) => {
    setCursorState((state: CursorState) =>
    cursorState.mode === CursorMode.Reaction ? {...state,isPressed:true} :state  
    )
  }, [cursorState.mode,setCursorState])

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
      else if (e.key === 'e') {
        setCursorState({
          mode: CursorMode.ReactionSelector
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

  const setReactions = useCallback((reaction:string) => {
    setCursorState({mode:CursorMode.Reaction,reaction,isPressed:false})
  },[])

  return (
    <div onPointerDown={handlePointerDown} onPointerLeave={handlePointerLeave} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp}
      className="h-screen w-full flex justify-center items-center text-center"
    >
      <h1 className='text-5xl text-white'>hello figma clone</h1>
      {cursor && (
        <CursorChat cursor={cursor} cursorState={cursorState} setCursorState={setCursorState} updateMyPresence={updateMyPresence} />
      )}
      {cursorState.mode === CursorMode.ReactionSelector && (
        <ReactionSelector
          setReaction={setReactions}/>
      )}
      <LiveCursors others={others} />
    </div>
  )
}

export default Live
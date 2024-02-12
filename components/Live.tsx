import React from 'react'
import LiveCursors from './cursor/LiveCursors'
import { useMyPresence, useOthers } from '@/liveblocks.config'

const Live = () => {
    const others = useOthers();
    const [{ cursor }, setMyPresence] = useMyPresence() as any;
    return (
      <div>
            <LiveCursors others={others} />
        </div>
  )
}

export default Live
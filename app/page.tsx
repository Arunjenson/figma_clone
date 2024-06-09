'use client'

import Room from './Room';
import {fabric} from  "fabric"
import { CollaborativeApp } from './CollaborativeApp';
import LeftSideBar from '../components/LeftSidebar'
import RightSideBar from '../components/RightSideBar'
import Live from '@/components/Live';
import Navbar from '@/components/Navbar';
import { useEffect, useRef, useState } from 'react';
import { handleCanvasMouseDown, handleResize, initializeFabric } from '@/lib/canvas';
import { ActiveElement } from '@/types/type';

export default function Page() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fabricRef = useRef<fabric.Canvas | null>(null)
  const isDrawing = useRef(false)
  const shapeRef = useRef<fabric.Object | null>(null)
  const selectedShapeRef = useRef<string | null>(null)
  const [activeElement, setActiveElement] = useState<ActiveElement>({
    name: "",
    value: "",
    icon:""
  })

  const handleActiveElement = (elem: ActiveElement) => {
    setActiveElement
      (elem);
    selectedShapeRef.current = elem?.value as string
  }
  
  useEffect(() => {
    const canvas = initializeFabric({ canvasRef, fabricRef })
    canvas.on("mouse:down", (options) => {
      handleCanvasMouseDown({options,canvas,isDrawing,shapeRef,selectedShapeRef})
    })
    window.addEventListener("resize", () => {
      handleResize({fabricRef})
    })
  },[])

  return (
    <main className='h-screen overflow-hidden'>
      <Navbar activeElement={activeElement} handleActiveElement={handleActiveElement} />

      <section className='flex h-full flex-row'>
        <LeftSideBar />
        <Live canvasRef={canvasRef} />
        <RightSideBar />
      </section>
     
    </main>
  )
}
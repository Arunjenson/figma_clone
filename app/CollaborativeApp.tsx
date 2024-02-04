"use client"

import { useOthers } from "@/liveblocks.config"
import { use } from "react"

export function CollaborativeApp() {
    const others = useOthers();
    const userCount = others.length;
    return <div>There are {userCount} other user(s) online </div>
}
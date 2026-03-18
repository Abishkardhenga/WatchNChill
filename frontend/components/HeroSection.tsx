"use client"

import { FaArrowRight } from "react-icons/fa6"
import { LuUsers } from "react-icons/lu"
import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [createRoomName, setCreateRoomName] = useState("")
  const [name, setName] = useState("")
  const [joinRoomId, setJoinRoomId] = useState("")
  const router = useRouter()

  const getRoomIdFromName = (roomName: string) => {
    return roomName
      .trim()
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "")
      .slice(0, 8)
  }

  const handleCreateRoom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const generatedId = getRoomIdFromName(createRoomName) || "ROOM001"
    router.push(`/room/${generatedId}`)
  }

  const handleJoinRoom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const sanitizedId = joinRoomId.trim().toUpperCase()
    if (!sanitizedId) return
    const trimmedName = name.trim()
    const query = trimmedName
      ? `?name=${encodeURIComponent(trimmedName)}`
      : ""
    router.push(`/room/${sanitizedId}${query}`)
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()

      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }

    const section = sectionRef.current
    if (!section) return

    section.addEventListener("mousemove", handleMouseMove)
    return () => section.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-linear-to-b from-black via-black to-blue-950/20 py-20 text-white md:py-32"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-96 w-1/2 -translate-x-1/2 rounded-full bg-linear-to-b from-blue-600/30 via-blue-500/20 to-transparent blur-3xl" />

        <div className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-purple-600/15 blur-3xl" />

        <div
          className="absolute h-96 w-96 rounded-full bg-blue-500/5 blur-3xl transition-transform duration-300"
          style={{
            left: `${mousePosition.x - 192}px`,
            top: `${mousePosition.y - 192}px`,
          }}
        />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-4 text-center sm:px-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-pulse rounded-full bg-blue-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
          </span>
          <span className="text-sm font-medium text-blue-200">
            Watch parties are live
          </span>
        </div>

        <h1 className="mt-8 max-w-5xl text-5xl font-bold leading-tight sm:text-6xl md:text-7xl">
          <span className="bg-linear-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
            Watch Together,
          </span>
          <br className="hidden sm:block" />
          <span className="bg-linear-to-r from-blue-200 via-blue-300 to-blue-400 bg-clip-text text-transparent">
            Stay Connected
          </span>
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-white/60 sm:text-xl">
          Experience synchronized YouTube watch parties with friends.{" "}
          <span className="text-white/90">One link. Infinite moments.</span>
        </p>

        <div className="mx-auto mb-8 mt-12 grid w-full max-w-2xl grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400">0ms</div>
            <div className="mt-1 text-xs text-white/50">Sync Delay</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400">∞</div>
            <div className="mt-1 text-xs text-white/50">Watch Time</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400">Free</div>
            <div className="mt-1 text-xs text-white/50">Forever</div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Dialog>
            <form onSubmit={handleCreateRoom}>
              <DialogTrigger
                render={
                  <Button
                    type="button"
                    className="group relative h-auto rounded-2xl bg-linear-to-r from-blue-600 to-blue-500 px-8 py-4 font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:scale-105 hover:shadow-blue-500/50 active:scale-95"
                  />
                }
              >
                <span>Create a Room</span>
                <FaArrowRight className="transition-transform group-hover:translate-x-1" />
              </DialogTrigger>
              <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                  <DialogTitle>Create Room</DialogTitle>
                  <DialogDescription>
                    Enter a room name to generate your room and start watching.
                  </DialogDescription>
                </DialogHeader>
                <FieldGroup>
                  <Field>
                    <Label htmlFor="create-room-name">Your Name</Label>
                    <Input
                      id="create-name"
                      name="name"
                      placeholder="Your name"
                      value={createRoomName}
                      onChange={(e) => setCreateRoomName(e.target.value)}
                    />
                  </Field>
                  <Field>
                    <Label htmlFor="create-room-name">Room Name</Label>
                    <Input
                      id="create-room-name"
                      name="room-name"
                      placeholder="Friends Night"
                      value={createRoomName}
                      onChange={(e) => setCreateRoomName(e.target.value)}
                    />
                  </Field>
                </FieldGroup>
                <DialogFooter>
                  <DialogClose
                    render={<Button variant="outline" type="button" />}
                  >
                    Cancel
                  </DialogClose>
                  <Button type="submit">Create</Button>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>

          <Dialog>
            <form onSubmit={handleJoinRoom}>
              <DialogTrigger
                render={
                  <Button
                    variant="outline"
                    type="button"
                    className="h-auto rounded-2xl border-white/20 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all hover:scale-105 hover:border-white/30 hover:bg-white/10 active:scale-95"
                  />
                }
              >
                <LuUsers className="h-5 w-5" />
                <span>Join a Room</span>
              </DialogTrigger>
              <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                  <DialogTitle>Join Room</DialogTitle>
                  <DialogDescription>
                    Paste your room ID and join your friends instantly.
                  </DialogDescription>
                </DialogHeader>
                <FieldGroup>
                  <Field>
                    <Label htmlFor="join-name">Your Name</Label>
                    <Input
                      id="join-name"
                      name="name"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Field>
                  <Field>
                    <Label htmlFor="join-room-id">Room ID</Label>
                    <Input
                      id="join-room-id"
                      name="room-id"
                      placeholder="ZPE3EG"
                      value={joinRoomId}
                      onChange={(e) => setJoinRoomId(e.target.value)}
                    />
                  </Field>
                </FieldGroup>
                <DialogFooter>
                  <DialogClose
                    render={<Button variant="outline" type="button" />}
                  >
                    Cancel
                  </DialogClose>
                  <Button type="submit">Join</Button>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>
        </div>

        <div className="mt-20 h-px w-96 bg-linear-to-r from-transparent via-blue-500/50 to-transparent" />
      </div>
    </section>
  )
}

export default HeroSection

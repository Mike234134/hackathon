"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Play, Pause, SkipBack, SkipForward, Volume2, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"

export default function MusicDNAPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(100)
  const [volume, setVolume] = useState(80)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(null)

  // In a real app, this would be actual song data
  const songData = {
    title: "Bohemian Rhapsody",
    artist: "Queen",
    album: "A Night at the Opera",
    year: "1975",
    image: "/placeholder.svg?height=300&width=300",
  }

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()

      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr

      ctx.scale(dpr, dpr)
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Animation function for the music DNA visualization
    const animate = () => {
      if (!ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      // Draw the DNA-like visualization
      const time = Date.now() / 1000
      const numBars = 100
      const barWidth = 4
      const maxBarHeight = canvas.height / 3

      for (let i = 0; i < numBars; i++) {
        const x = (i - numBars / 2) * (barWidth * 1.5)

        // Create two oscillating bars (top and bottom)
        const frequencyFactor = i % 5 === 0 ? 2 : i % 3 === 0 ? 1.5 : 1
        const heightFactor = isPlaying ? 1 : 0.3

        const topHeight = Math.abs(Math.sin(time + i * 0.1) * maxBarHeight * frequencyFactor * heightFactor)
        const bottomHeight = Math.abs(Math.cos(time + i * 0.1) * maxBarHeight * frequencyFactor * heightFactor)

        // Color gradient based on position
        const hue = (i / numBars) * 360
        ctx.fillStyle = isPlaying ? `hsla(${hue}, 80%, 60%, 0.8)` : `hsla(${hue}, 30%, 60%, 0.5)`

        // Draw top bar
        ctx.fillRect(centerX + x - barWidth / 2, centerY - topHeight, barWidth, topHeight)

        // Draw bottom bar
        ctx.fillRect(centerX + x - barWidth / 2, centerY, barWidth, bottomHeight)

        // Draw connecting dots
        ctx.beginPath()
        ctx.arc(centerX + x, centerY, barWidth / 2, 0, Math.PI * 2)
        ctx.fillStyle = isPlaying
          ? `hsla(${(hue + 180) % 360}, 80%, 60%, 0.8)`
          : `hsla(${(hue + 180) % 360}, 30%, 60%, 0.5)`
        ctx.fill()
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying])

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
    // In a real app, this would control actual audio playback
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-background">
      <div className="container px-4 py-8 md:py-12">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-medium mb-6 hover:text-purple-600 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Music DNA Visualizer</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            Experience your music in a whole new way with our unique DNA visualization
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="md:col-span-1">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <img
                    src={songData.image || "/placeholder.svg"}
                    alt={`${songData.title} by ${songData.artist}`}
                    className="w-full h-auto"
                  />
                </CardContent>
              </Card>
              <div className="mt-4">
                <h2 className="text-xl font-bold">{songData.title}</h2>
                <p className="text-gray-500 dark:text-gray-400">{songData.artist}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {songData.album} • {songData.year}
                </p>
              </div>
            </div>

            <div className="md:col-span-2">
              <Card className="h-full flex flex-col">
                <CardContent className="flex-1 p-6 flex flex-col">
                  <div className="flex-1 relative">
                    <canvas ref={canvasRef} className="w-full h-full absolute inset-0"></canvas>
                  </div>

                  <div className="mt-auto pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">{formatTime(currentTime)}</span>
                      <span className="text-sm">{formatTime(duration)}</span>
                    </div>

                    <Slider
                      value={[currentTime]}
                      max={duration}
                      step={1}
                      onValueChange={(value) => setCurrentTime(value[0])}
                      className="mb-6"
                    />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="rounded-full">
                          <SkipBack className="h-5 w-5" />
                        </Button>
                        <Button
                          onClick={togglePlayPause}
                          size="icon"
                          className="rounded-full bg-purple-600 hover:bg-purple-700 text-white"
                          
                        >
                          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                        </Button>
                        <Button variant="ghost" size="icon" className="rounded-full">
                          <SkipForward className="h-5 w-5" />
                        </Button>
                      </div>

                      <div className="flex items-center gap-2">
                        <Volume2 className="h-4 w-4 text-gray-500" />
                        <Slider
                          value={[volume]}
                          max={100}
                          step={1}
                          onValueChange={(value) => setVolume(value[0])}
                          className="w-24"
                        />
                      </div>

                      <Button variant="ghost" size="icon" className="rounded-full">
                        <Share2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">About Music DNA</h3>
                <p className="mb-4">
                  Music DNA is a unique visualization that represents the audio characteristics of a song. The
                  visualization responds to:
                </p>
                <ul className="space-y-2 list-disc pl-5 mb-4">
                  <li>Frequency patterns in the music</li>
                  <li>Beat and rhythm elements</li>
                  <li>Tonal qualities and harmonics</li>
                  <li>Dynamic range and volume changes</li>
                </ul>
                <p>
                  Each song creates a unique visual pattern, like a fingerprint or DNA sequence, that's distinctive to
                  that particular track.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">How to Use</h3>
                <ol className="space-y-2 list-decimal pl-5">
                  <li>Play a song to see its unique DNA visualization come to life</li>
                  <li>Watch how the visualization changes during different parts of the song</li>
                  <li>Compare visualizations between different songs to see their unique patterns</li>
                  <li>Share your favorite music DNA visualizations with friends</li>
                  <li>Use the visualization to discover new aspects of familiar songs</li>
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}


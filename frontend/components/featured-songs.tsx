"use client"

import { useState } from "react"
import Link from "next/link"
import { Music, Heart, MessageCircle, Share2 } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const featuredSongs = [
  {
    id: "1",
    title: "Bohemian Rhapsody",
    artist: "Queen",
    image: "/placeholder.svg?height=200&width=200",
    genre: "Rock",
    year: "1975",
    activeUsers: 42,
    likes: 1243,
    comments: 89,
  },
  {
    id: "2",
    title: "Imagine",
    artist: "John Lennon",
    image: "/placeholder.svg?height=200&width=200",
    genre: "Pop",
    year: "1971",
    activeUsers: 28,
    likes: 987,
    comments: 65,
  },
  {
    id: "3",
    title: "Billie Jean",
    artist: "Michael Jackson",
    image: "/placeholder.svg?height=200&width=200",
    genre: "Pop",
    year: "1983",
    activeUsers: 35,
    likes: 1102,
    comments: 73,
  },
  {
    id: "4",
    title: "Smells Like Teen Spirit",
    artist: "Nirvana",
    image: "/placeholder.svg?height=200&width=200",
    genre: "Grunge",
    year: "1991",
    activeUsers: 31,
    likes: 1056,
    comments: 68,
  },
]

export default function FeaturedSongs() {
  const [likedSongs, setLikedSongs] = useState<Record<string, boolean>>({})

  const toggleLike = (id: string) => {
    setLikedSongs((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {featuredSongs.map((song) => (
        <Card key={song.id} className="overflow-hidden transition-all hover:shadow-lg">
          <CardHeader className="p-0">
            <div className="relative">
              <img
                src={song.image || "/placeholder.svg"}
                alt={`${song.title} by ${song.artist}`}
                className="w-full h-48 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <Badge className="bg-purple-600 hover:bg-purple-700">{song.genre}</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <CardTitle className="text-lg mb-1">
              <Link href={`/songs/${song.id}`} className="hover:text-purple-600 transition-colors">
                {song.title}
              </Link>
            </CardTitle>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              {song.artist} • {song.year}
            </p>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
              <Music className="h-4 w-4 mr-1" />
              <span className="mr-3">{song.activeUsers} listening</span>
            </div>
            <p className="text-sm line-clamp-3">
              AI-generated insights about the song's meaning, inspiration, and historical context will appear here.
            </p>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex justify-between">
            <Button
              variant="ghost"
              size="sm"
              className={likedSongs[song.id] ? "text-red-500" : ""}
              onClick={() => toggleLike(song.id)}
            >
              <Heart className="h-4 w-4 mr-1" fill={likedSongs[song.id] ? "currentColor" : "none"} />
              {song.likes + (likedSongs[song.id] ? 1 : 0)}
            </Button>
            <Button variant="ghost" size="sm">
              <MessageCircle className="h-4 w-4 mr-1" />
              {song.comments}
            </Button>
            <Button variant="ghost" size="sm">
              <Share2 className="h-4 w-4 mr-1" />
              Share
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}


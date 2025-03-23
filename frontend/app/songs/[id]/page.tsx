"use client"
import { Suspense, useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Share2, Heart, MessageCircle, Play, Music, Calendar, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SongStoryCard from "@/components/song-story-card"
import SongDiscussion from "@/components/song-discussion"
import LoadingSpinner from "@/components/loading-spinner"
import { getArtistSong } from "@/lib/utils"

export interface songType {
  release_date: string;
  name: string;
  album_cover: string;
  album: string;
  artist: string;
  genre: string;
}
export default function SongPage({ params }: { params: { id: string } }) {
  
  const [song, setSong] = useState<songType>()
  useEffect(() => {
    async function getSongInfo() {
      const data = await getArtistSong(params.id)
      setSong(data)
      
    }
    getSongInfo()
  },[])
  // In a real app, you would fetch the song data based on the ID

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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="rounded-lg overflow-hidden shadow-lg mb-6">
                <img
                  src={song?.album_cover || "/"}
                  alt={`${song?.name} by ${song?.artist}`}
                  className="w-full h-auto"
                />
              </div>

              <h1 className="text-3xl font-bold mb-2">{song?.name}</h1>
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-4">{song?.artist}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                <Badge className="bg-purple-600">{song?.genre}</Badge>
                <Badge variant="outline">{song?.release_date}</Badge>
                <Badge variant="outline">{song?.album}</Badge>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="flex flex-col items-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow">
                  <Music className="h-5 w-5 text-purple-600 mb-1" />
                  <span className="text-xs text-gray-500 dark:text-gray-400">Genre</span>
                  <span className="font-medium">{song?.genre}</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow">
                  <Calendar className="h-5 w-5 text-purple-600 mb-1" />
                  <span className="text-xs text-gray-500 dark:text-gray-400">Released</span>
                  <span className="font-medium">{song?.release_date}</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow">
                  <Award className="h-5 w-5 text-purple-600 mb-1" />
                  <span className="text-xs text-gray-500 dark:text-gray-400">Awards</span>
                  <span className="font-medium">2</span>
                </div>
              </div>

              <div className="flex gap-2 mb-6">
                <Button className="flex-1">
                  <Play className="mr-2 h-4 w-4" />
                  Listen
                </Button>
                <Button variant="outline" className="flex-1">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>

              <div className="flex justify-between">
                <Button variant="ghost">
                  <Heart className="mr-1 h-5 w-5" />
                  984
                </Button>
                <Button variant="ghost">
                  <MessageCircle className="mr-1 h-5 w-5" />
                  2
                </Button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <Tabs defaultValue="story" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="story">AI Story</TabsTrigger>
                <TabsTrigger value="discussion">Discussion</TabsTrigger>
              </TabsList>
              <TabsContent value="story">
                <Suspense fallback={<LoadingSpinner />}>
                  <SongStoryCard songId={song?.artist} />
                </Suspense>
              </TabsContent>
              <TabsContent value="discussion">
                <Suspense fallback={<LoadingSpinner />}>
                  <SongDiscussion songId={song?.artist} />
                </Suspense>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}


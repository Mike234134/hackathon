import { Suspense } from "react"
import Link from "next/link"
import { ArrowLeft, Share2, Heart, MessageCircle, Play, Music, Calendar, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SongStoryCard from "@/components/song-story-card"
import SongDiscussion from "@/components/song-discussion"
import LoadingSpinner from "@/components/loading-spinner"

export default function SongPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the song data based on the ID
  const song = {
    id: params.id,
    title: "Bohemian Rhapsody",
    artist: "Queen",
    album: "A Night at the Opera",
    year: "1975",
    genre: "Rock",
    image: "/placeholder.svg?height=400&width=400",
    duration: "5:55",
    likes: 1243,
    comments: 89,
    awards: ["Grammy Hall of Fame", "UK Singles Chart #1"],
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="rounded-lg overflow-hidden shadow-lg mb-6">
                <img
                  src={song.image || "/placeholder.svg"}
                  alt={`${song.title} by ${song.artist}`}
                  className="w-full h-auto"
                />
              </div>

              <h1 className="text-3xl font-bold mb-2">{song.title}</h1>
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-4">{song.artist}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                <Badge className="bg-purple-600">{song.genre}</Badge>
                <Badge variant="outline">{song.year}</Badge>
                <Badge variant="outline">{song.album}</Badge>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="flex flex-col items-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow">
                  <Music className="h-5 w-5 text-purple-600 mb-1" />
                  <span className="text-xs text-gray-500 dark:text-gray-400">Genre</span>
                  <span className="font-medium">{song.genre}</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow">
                  <Calendar className="h-5 w-5 text-purple-600 mb-1" />
                  <span className="text-xs text-gray-500 dark:text-gray-400">Released</span>
                  <span className="font-medium">{song.year}</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow">
                  <Award className="h-5 w-5 text-purple-600 mb-1" />
                  <span className="text-xs text-gray-500 dark:text-gray-400">Awards</span>
                  <span className="font-medium">{song.awards.length}</span>
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
                  {song.likes}
                </Button>
                <Button variant="ghost">
                  <MessageCircle className="mr-1 h-5 w-5" />
                  {song.comments}
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
                  <SongStoryCard songId={song.id} />
                </Suspense>
              </TabsContent>
              <TabsContent value="discussion">
                <Suspense fallback={<LoadingSpinner />}>
                  <SongDiscussion songId={song.id} />
                </Suspense>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}


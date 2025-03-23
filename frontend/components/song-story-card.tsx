"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThumbsUp, ThumbsDown, RefreshCw, Lightbulb, History, Music } from "lucide-react"

interface SongStoryCardProps {
  songId: string | undefined
}

export default function SongStoryCard({ songId }: SongStoryCardProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [feedback, setFeedback] = useState<"liked" | "disliked" | null>(null)

  // In a real app, this would be fetched from an API
  const songStory = {
    inspiration: `
      "Bohemian Rhapsody" was written by Freddie Mercury for Queen's 1975 album "A Night at the Opera". 
      Mercury began writing it in the late 1960s, and it was one of the most expensive singles ever made at the time of its release.
      
      The song is a six-minute suite, consisting of several sections without a chorus: an intro, a ballad segment, an operatic passage, a hard rock part and a reflective coda.
      
      Mercury may have written "Bohemian Rhapsody" at his London home. The song was recorded in various studios, with the operatic section taking three weeks to complete.
    `,
    meaning: `
      The song's meaning has been interpreted in many ways. Some believe it's about a young man who accidentally killed someone and is dealing with the consequences, similar to Albert Camus' novel "The Stranger".
      
      Others see it as Mercury's way of dealing with personal issues, possibly his sexuality. The song uses Scaramouche, Galileo, and Bismillah as characters, adding to its operatic quality.
      
      The title combines "Bohemian" (unconventional person) and "Rhapsody" (a piece of classical music with distinct sections), reflecting the song's nature.
    `,
    impact: `
      "Bohemian Rhapsody" topped the UK charts for nine weeks and helped popularize the music video format. The song has been consistently voted one of the greatest songs of all time.
      
      It returned to the charts after Mercury's death in 1991 and again after the 2018 biopic of the same name. Its unique structure challenged conventional pop song formats.
      
      The song has been covered by many artists and has appeared in numerous films and TV shows, cementing its place in popular culture.
    `,
  }

  const handleRegenerateStory = () => {
    setIsGenerating(true)
    // In a real app, this would call an API to regenerate the story
    setTimeout(() => {
      setIsGenerating(false)
    }, 2000)
  }

  const handleFeedback = (type: "liked" | "disliked") => {
    setFeedback(type)
    // In a real app, this would send feedback to the server
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-2xl">The Story Behind the Song</CardTitle>
        <CardDescription>AI-generated insights about the song's creation, meaning, and cultural impact</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="inspiration" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="inspiration" className="flex items-center">
              <Lightbulb className="h-4 w-4 mr-2" />
              Inspiration
            </TabsTrigger>
            <TabsTrigger value="meaning" className="flex items-center">
              <Music className="h-4 w-4 mr-2" />
              Meaning
            </TabsTrigger>
            <TabsTrigger value="impact" className="flex items-center">
              <History className="h-4 w-4 mr-2" />
              Impact
            </TabsTrigger>
          </TabsList>
          <TabsContent value="inspiration" className="mt-6 space-y-4">
            <p className="leading-7 whitespace-pre-line">{songStory.inspiration}</p>
          </TabsContent>
          <TabsContent value="meaning" className="mt-6 space-y-4">
            <p className="leading-7 whitespace-pre-line">{songStory.meaning}</p>
          </TabsContent>
          <TabsContent value="impact" className="mt-6 space-y-4">
            <p className="leading-7 whitespace-pre-line">{songStory.impact}</p>
          </TabsContent>
        </Tabs>

        <div className="mt-8 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <h3 className="font-medium mb-2 flex items-center">
            <Lightbulb className="h-4 w-4 mr-2 text-purple-600" />
            Fun Fact
          </h3>
          <p className="text-sm">
            Did you know that "Bohemian Rhapsody" was initially rejected by Queen's management? The band believed in the
            song so much that they left their management rather than compromise on it.
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-6">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleFeedback("liked")}
            className={feedback === "liked" ? "bg-green-50 text-green-600 border-green-200" : ""}
          >
            <ThumbsUp className="h-4 w-4 mr-2" />
            Helpful
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleFeedback("disliked")}
            className={feedback === "disliked" ? "bg-red-50 text-red-600 border-red-200" : ""}
          >
            <ThumbsDown className="h-4 w-4 mr-2" />
            Not Accurate
          </Button>
        </div>
        <Button variant="ghost" size="sm" onClick={handleRegenerateStory} disabled={isGenerating}>
          <RefreshCw className={`h-4 w-4 mr-2 ${isGenerating ? "animate-spin" : ""}`} />
          {isGenerating ? "Generating..." : "Regenerate Story"}
        </Button>
      </CardFooter>
    </Card>
  )
}


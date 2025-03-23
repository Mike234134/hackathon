"use client"

import { Users, Music, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const activeCircles = [
  {
    id: "1",
    title: "90s Rock Classics",
    description: "Discussing the influence of grunge and alternative rock on modern music",
    members: 28,
    activity: "high",
    genre: "Rock",
    avatars: [
      { name: "JD", image: "/placeholder.svg?height=40&width=40" },
      { name: "TK", image: "/placeholder.svg?height=40&width=40" },
      { name: "AM", image: "/placeholder.svg?height=40&width=40" },
    ],
  },
  {
    id: "2",
    title: "Hip Hop Evolution",
    description: "From the Bronx to global dominance - tracing hip hop's journey",
    members: 42,
    activity: "medium",
    genre: "Hip Hop",
    avatars: [
      { name: "RJ", image: "/placeholder.svg?height=40&width=40" },
      { name: "MC", image: "/placeholder.svg?height=40&width=40" },
      { name: "DL", image: "/placeholder.svg?height=40&width=40" },
    ],
  },
  {
    id: "3",
    title: "Beatles Appreciation",
    description: "Deep dive into the Fab Four's discography and lasting impact",
    members: 35,
    activity: "high",
    genre: "Classic Rock",
    avatars: [
      { name: "PL", image: "/placeholder.svg?height=40&width=40" },
      { name: "JL", image: "/placeholder.svg?height=40&width=40" },
      { name: "GH", image: "/placeholder.svg?height=40&width=40" },
    ],
  },
  
]

export default function MusicCircles() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {activeCircles.map((circle) => (
        <Card key={circle.id} className="overflow-hidden transition-all hover:shadow-lg">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">{circle.title}</CardTitle>
                <CardDescription className="mt-1">{circle.description}</CardDescription>
              </div>
              <Badge
                variant={circle.activity === "high" ? "default" : "secondary"}
                className={circle.activity === "high" ? "bg-green-600" : ""}
              >
                {circle.activity === "high" ? "Active now" : "Moderate"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-4">
              <Music className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium">{circle.genre}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-auto flex items-center">
                <Users className="h-4 w-4 mr-1" />
                {circle.members} members
              </span>
            </div>

            <div className="flex -space-x-2 overflow-hidden">
              {circle.avatars.map((avatar, index) => (
                <Avatar key={index} className="border-2 border-background">
                  <AvatarImage src={avatar.image} alt={`${avatar.name}'s profile picture`} />
                  <AvatarFallback>{avatar.name}</AvatarFallback>
                </Avatar>
              ))}
              {circle.members > 3 && (
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-background text-xs font-medium">
                  +{circle.members - 3}
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
               <a href="group-chat">Join Circle</a>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      ))}

      <Card className="overflow-hidden border-dashed border-2 flex flex-col items-center justify-center p-6">
        <div className="rounded-full bg-purple-100 dark:bg-purple-900/20 p-3 mb-4">
          <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
        </div>
        <h3 className="text-lg font-medium mb-2"><a href="create-circle">Create a circle</a></h3>
        <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-4">
          Start your own discussion about your favorite music
        </p>
        <Button variant="outline"> <a href ="create-circle">Create Circle</a></Button>
      </Card>
    </div>
  )
}


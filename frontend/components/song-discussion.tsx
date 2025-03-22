"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageCircle, ThumbsUp, Send, FlameIcon as Fire, HeartCrackIcon as HeartBroken, Music } from "lucide-react"

interface SongDiscussionProps {
  songId: string
}

interface Comment {
  id: string
  user: {
    name: string
    avatar: string
    initials: string
  }
  text: string
  timestamp: string
  likes: number
  liked?: boolean
  reactions: {
    fire: number
    heartbreak: number
    music: number
  }
  userReaction?: "fire" | "heartbreak" | "music" | null
}

export default function SongDiscussion({ songId }: SongDiscussionProps) {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      user: {
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "AJ",
      },
      text: "The operatic section of this song is what makes it truly unique. I've never heard anything like it in rock music before or since.",
      timestamp: "2 hours ago",
      likes: 24,
      reactions: {
        fire: 12,
        heartbreak: 3,
        music: 8,
      },
    },
    {
      id: "2",
      user: {
        name: "Sam Taylor",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "ST",
      },
      text: "I think the song is about someone confessing to a murder and dealing with the guilt. The 'Bismillah' section represents the internal struggle.",
      timestamp: "1 day ago",
      likes: 18,
      reactions: {
        fire: 5,
        heartbreak: 10,
        music: 3,
      },
    },
    {
      id: "3",
      user: {
        name: "Jamie Lee",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "JL",
      },
      text: "Did you know that Freddie Mercury wrote most of this song on the piano in his bedroom? The band spent three weeks recording just the operatic section!",
      timestamp: "3 days ago",
      likes: 32,
      reactions: {
        fire: 15,
        heartbreak: 2,
        music: 14,
      },
    },
  ])

  const [newComment, setNewComment] = useState("")
  const [activePoll, setActivePoll] = useState({
    question: "What's your favorite section of Bohemian Rhapsody?",
    options: [
      { text: "Intro Ballad", votes: 42 },
      { text: "Opera Section", votes: 78 },
      { text: "Hard Rock Section", votes: 53 },
      { text: "Outro", votes: 31 },
    ],
    totalVotes: 204,
    userVote: null as number | null,
  })

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [comments])

  const handleAddComment = () => {
    if (!newComment.trim()) return

    const newCommentObj: Comment = {
      id: `comment-${Date.now()}`,
      user: {
        name: "You",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "YO",
      },
      text: newComment,
      timestamp: "Just now",
      likes: 0,
      reactions: {
        fire: 0,
        heartbreak: 0,
        music: 0,
      },
    }

    setComments([...comments, newCommentObj])
    setNewComment("")
  }

  const handleLike = (id: string) => {
    setComments(
      comments.map((comment) => {
        if (comment.id === id) {
          return {
            ...comment,
            likes: comment.liked ? comment.likes - 1 : comment.likes + 1,
            liked: !comment.liked,
          }
        }
        return comment
      }),
    )
  }

  const handleReaction = (id: string, reaction: "fire" | "heartbreak" | "music") => {
    setComments(
      comments.map((comment) => {
        if (comment.id === id) {
          // If user already reacted with this reaction, remove it
          if (comment.userReaction === reaction) {
            return {
              ...comment,
              reactions: {
                ...comment.reactions,
                [reaction]: comment.reactions[reaction] - 1,
              },
              userReaction: null,
            }
          }

          // If user had a different reaction, remove that one and add the new one
          const oldReaction = comment.userReaction
          return {
            ...comment,
            reactions: {
              ...comment.reactions,
              ...(oldReaction ? { [oldReaction]: comment.reactions[oldReaction] - 1 } : {}),
              [reaction]: comment.reactions[reaction] + 1,
            },
            userReaction: reaction,
          }
        }
        return comment
      }),
    )
  }

  const handleVote = (optionIndex: number) => {
    if (activePoll.userVote !== null) return

    const newOptions = [...activePoll.options]
    newOptions[optionIndex].votes += 1

    setActivePoll({
      ...activePoll,
      options: newOptions,
      totalVotes: activePoll.totalVotes + 1,
      userVote: optionIndex,
    })
  }

  return (
    <div className="space-y-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl">Community Poll</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="font-medium mb-4">{activePoll.question}</h3>
          <div className="space-y-3">
            {activePoll.options.map((option, index) => {
              const percentage = Math.round((option.votes / activePoll.totalVotes) * 100)
              return (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{option.text}</span>
                    <span>
                      {percentage}% ({option.votes} votes)
                    </span>
                  </div>
                  <div className="relative h-8 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div
                      className={`absolute inset-y-0 left-0 ${
                        activePoll.userVote === index ? "bg-purple-600" : "bg-purple-300 dark:bg-purple-800"
                      } transition-all`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                    <button
                      className="absolute inset-0 flex items-center justify-center text-sm font-medium text-white transition-opacity hover:bg-black/10"
                      onClick={() => handleVote(index)}
                      disabled={activePoll.userVote !== null}
                    >
                      {activePoll.userVote === index && "Your vote"}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">{activePoll.totalVotes} total votes</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <MessageCircle className="h-5 w-5 mr-2" />
            Discussion ({comments.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full mb-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All Comments</TabsTrigger>
              <TabsTrigger value="popular">Popular</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-4">
                <Avatar>
                  <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                  <AvatarFallback>{comment.user.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{comment.user.name}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{comment.timestamp}</span>
                  </div>
                  <p className="text-sm mb-3">{comment.text}</p>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`px-2 ${comment.liked ? "text-purple-600" : ""}`}
                      onClick={() => handleLike(comment.id)}
                    >
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      {comment.likes}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`px-2 ${comment.userReaction === "fire" ? "text-orange-500" : ""}`}
                      onClick={() => handleReaction(comment.id, "fire")}
                    >
                      <Fire className="h-4 w-4 mr-1" />
                      {comment.reactions.fire}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`px-2 ${comment.userReaction === "heartbreak" ? "text-red-500" : ""}`}
                      onClick={() => handleReaction(comment.id, "heartbreak")}
                    >
                      <HeartBroken className="h-4 w-4 mr-1" />
                      {comment.reactions.heartbreak}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`px-2 ${comment.userReaction === "music" ? "text-blue-500" : ""}`}
                      onClick={() => handleReaction(comment.id, "music")}
                    >
                      <Music className="h-4 w-4 mr-1" />
                      {comment.reactions.music}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
        <CardFooter className="border-t pt-6">
          <div className="flex w-full gap-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback>YO</AvatarFallback>
            </Avatar>
            <div className="flex-1 flex gap-2">
              <Textarea
                placeholder="Add to the discussion..."
                className="flex-1 min-h-[60px]"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleAddComment()
                  }
                }}
              />
              <Button className="self-end" onClick={handleAddComment} disabled={!newComment.trim()}>
                <Send className="h-4 w-4 mr-2" />
                Send
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}


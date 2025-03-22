"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  MessageCircle,
  Send,
  Music,
  Lightbulb,
  History,
  ThumbsUp,
  Users,
  Smile,
  Image,
  Paperclip,
  Search,
  Settings,
  Bell,
  Info,
  Plus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion } from "@/components/ui/motion"

// Types for our chat
interface Message {
  id: string
  content: string
  sender: {
    id: string
    name: string
    avatar: string
    initials: string
  }
  timestamp: Date
}

interface Group {
  id: string
  title: string
  description: string
  category: "inspiration" | "meaning" | "history" | "trivia" | "structure" | "opinion"
  song?: string
  artist?: string
  color: string
  lastMessage?: string
  lastMessageTime?: Date
  unreadCount?: number
  members: number
  messages: Message[]
}

interface GroupMember {
  id: string
  name: string
  avatar: string
  initials: string
  isOnline: boolean
}

export default function GroupChatPage() {
  // Sample group members
  const groupMembers: GroupMember[] = [
    {
      id: "user-1",
      name: "You",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "YO",
      isOnline: true,
    },
    {
      id: "user-2",
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "AJ",
      isOnline: true,
    },
    {
      id: "user-3",
      name: "Sam Taylor",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "ST",
      isOnline: true,
    },
    {
      id: "user-4",
      name: "Jamie Lee",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JL",
      isOnline: false,
    },
    {
      id: "user-5",
      name: "Riley Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "RS",
      isOnline: true,
    },
  ]

  // Sample initial messages for each group
  const getInitialMessages = (groupId: string, topic: string): Message[] => {
    const systemMessage: Message = {
      id: `${groupId}-system-1`,
      content: topic,
      sender: {
        id: "system",
        name: "Music Prompt",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "MP",
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * Math.floor(Math.random() * 7)), // Random time in the last week
    }

    return [systemMessage]
  }

  // Sample conversation starter groups
  const groups: Group[] = [
    {
      id: "g1",
      title: "Bohemian Rhapsody Analysis",
      description: "What's your favorite section of Bohemian Rhapsody and why?",
      category: "opinion",
      song: "Bohemian Rhapsody",
      artist: "Queen",
      color: "bg-gradient-to-br from-purple-500 to-pink-500",
      lastMessage: "I'd have to say the bridge section is my favorite part.",
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      unreadCount: 3,
      members: 28,
      messages: getInitialMessages("g1", "What's your favorite section of Bohemian Rhapsody and why?"),
    },
    {
      id: "g2",
      title: "Freddie Mercury's Storytelling",
      description: "Do you think Freddie Mercury was telling a personal story in Bohemian Rhapsody?",
      category: "meaning",
      song: "Bohemian Rhapsody",
      artist: "Queen",
      color: "bg-gradient-to-br from-blue-500 to-indigo-500",
      lastMessage: "I've always interpreted this as a commentary on society.",
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      unreadCount: 0,
      members: 15,
      messages: getInitialMessages(
        "g2",
        "Do you think Freddie Mercury was telling a personal story in Bohemian Rhapsody?",
      ),
    },
    {
      id: "g3",
      title: "Music Video Revolution",
      description: "How did Bohemian Rhapsody change music videos forever?",
      category: "history",
      song: "Bohemian Rhapsody",
      artist: "Queen",
      color: "bg-gradient-to-br from-amber-500 to-orange-500",
      lastMessage: "It was revolutionary for its time.",
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
      unreadCount: 1,
      members: 22,
      messages: getInitialMessages("g3", "How did Bohemian Rhapsody change music videos forever?"),
    },
    {
      id: "g4",
      title: "Imagine in Modern Times",
      description: "If John Lennon wrote 'Imagine' today, what current world issues would he address?",
      category: "opinion",
      song: "Imagine",
      artist: "John Lennon",
      color: "bg-gradient-to-br from-green-500 to-emerald-500",
      lastMessage: "Climate change would definitely be a major theme.",
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      unreadCount: 0,
      members: 19,
      messages: getInitialMessages(
        "g4",
        "If John Lennon wrote 'Imagine' today, what current world issues would he address?",
      ),
    },
    {
      id: "g5",
      title: "Billie Jean's Iconic Bassline",
      description: "What makes Michael Jackson's 'Billie Jean' bassline so iconic?",
      category: "structure",
      song: "Billie Jean",
      artist: "Michael Jackson",
      color: "bg-gradient-to-br from-rose-500 to-red-500",
      lastMessage: "The way it drives the whole song is just masterful.",
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
      unreadCount: 0,
      members: 31,
      messages: getInitialMessages("g5", "What makes Michael Jackson's 'Billie Jean' bassline so iconic?"),
    },
    {
      id: "g6",
      title: "Teen Spirit & Generation X",
      description: "How did 'Smells Like Teen Spirit' capture the frustration of Generation X?",
      category: "meaning",
      song: "Smells Like Teen Spirit",
      artist: "Nirvana",
      color: "bg-gradient-to-br from-cyan-500 to-blue-500",
      lastMessage: "The raw energy and apathetic lyrics really spoke to us.",
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
      unreadCount: 0,
      members: 27,
      messages: getInitialMessages("g6", "How did 'Smells Like Teen Spirit' capture the frustration of Generation X?"),
    },
    {
      id: "g7",
      title: "Perspective-Changing Songs",
      description: "What's a song that completely changed your perspective on something?",
      category: "inspiration",
      color: "bg-gradient-to-br from-violet-500 to-purple-500",
      lastMessage: "Bob Dylan's 'Blowin' in the Wind' changed how I think about social justice.",
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4), // 4 days ago
      unreadCount: 0,
      members: 24,
      messages: getInitialMessages("g7", "What's a song that completely changed your perspective on something?"),
    },
    {
      id: "g8",
      title: "Misheard Lyrics",
      description: "Share a misheard lyric that you thought was correct for years!",
      category: "trivia",
      color: "bg-gradient-to-br from-yellow-500 to-amber-500",
      lastMessage: "I always thought 'Tiny Dancer' was 'Hold me closer, Tony Danza' 😂",
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
      unreadCount: 0,
      members: 38,
      messages: getInitialMessages("g8", "Share a misheard lyric that you thought was correct for years!"),
    },
    {
      id: "g9",
      title: "Songs & Memories",
      description: "What song do you associate with your most cherished memory?",
      category: "inspiration",
      color: "bg-gradient-to-br from-pink-500 to-rose-500",
      lastMessage: "The song that played during our first dance at our wedding.",
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6), // 6 days ago
      unreadCount: 0,
      members: 21,
      messages: getInitialMessages("g9", "What song do you associate with your most cherished memory?"),
    },
    {
      id: "g10",
      title: "One Album Forever",
      description: "If you could only listen to one album for the rest of your life, what would it be?",
      category: "opinion",
      color: "bg-gradient-to-br from-teal-500 to-emerald-500",
      lastMessage: "Pink Floyd's 'Dark Side of the Moon' - it never gets old.",
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 7 days ago
      unreadCount: 0,
      members: 29,
      messages: getInitialMessages(
        "g10",
        "If you could only listen to one album for the rest of your life, what would it be?",
      ),
    },
  ]

  const [selectedGroup, setSelectedGroup] = useState<Group | null>(groups[0])
  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isTyping, setIsTyping] = useState<{ userId: string; name: string } | null>(null)
  const [animatedGroups, setAnimatedGroups] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [groupsData, setGroupsData] = useState<Group[]>(groups)

  // Filter groups based on search query
  const filteredGroups = groupsData.filter(
    (group) =>
      group.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (group.song && group.song.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (group.artist && group.artist.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  // Animate groups one by one
  useEffect(() => {
    groups.forEach((group, index) => {
      setTimeout(() => {
        setAnimatedGroups((prev) => [...prev, group.id])
      }, 100 * index) // Stagger the animations
    })
  }, [])

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [selectedGroup])

  // Handle selecting a group
  const handleSelectGroup = (group: Group) => {
    // Clear unread count when selecting a group
    const updatedGroups = groupsData.map((g) => (g.id === group.id ? { ...g, unreadCount: 0 } : g))
    setGroupsData(updatedGroups)
    setSelectedGroup(group)
  }

  // Generate responses based on the group and user
  const generateResponse = (group: Group, userId: string): string => {
    const responses: Record<string, string[]> = {
      "user-2": [
        `I've always thought ${group.song || "that song"} was about personal freedom. The way ${group.artist || "the artist"} expresses emotion is so raw.`,
        `Great question! For me, the ${group.category === "structure" ? "composition" : "lyrics"} really stand out because they're so innovative for that time period.`,
        `I remember hearing this for the first time and being completely blown away. It changed how I thought about music.`,
        `I'd have to say the bridge section is my favorite part. The way the tension builds and then releases is just masterful.`,
      ],
      "user-3": [
        `Actually, I read that ${group.artist || "they"} wrote this during a really difficult time in their life. You can hear the pain in the performance.`,
        `I've always interpreted this as a commentary on society rather than a personal story. The metaphors are pretty clear if you analyze the lyrics.`,
        `From a historical perspective, this came out right when the genre was evolving. It was revolutionary for its time.`,
        `I think what makes this timeless is how it connects emotionally with people across generations. Good music does that.`,
      ],
    }

    const userResponses = responses[userId] || responses["user-2"]
    return userResponses[Math.floor(Math.random() * userResponses.length)]
  }

  // Handle sending a message
  const handleSendMessage = () => {
    if (!inputValue.trim() || !selectedGroup) return

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      content: inputValue,
      sender: groupMembers[0], // "You"
      timestamp: new Date(),
    }

    // Add message to the selected group
    const updatedGroups = groupsData.map((group) => {
      if (group.id === selectedGroup.id) {
        return {
          ...group,
          messages: [...group.messages, newMessage],
          lastMessage: inputValue,
          lastMessageTime: new Date(),
        }
      }
      return group
    })

    setGroupsData(updatedGroups)
    setSelectedGroup((prev) =>
      prev
        ? {
            ...prev,
            messages: [...prev.messages, newMessage],
            lastMessage: inputValue,
            lastMessageTime: new Date(),
          }
        : null,
    )

    setInputValue("")

    // Simulate other group members responding after a delay
    simulateGroupResponses(selectedGroup)
  }

  // Simulate responses from other group members
  const simulateGroupResponses = (group: Group) => {
    // First response after 2 seconds
    setTimeout(() => {
      setIsTyping({
        userId: groupMembers[1].id,
        name: groupMembers[1].name,
      })

      setTimeout(() => {
        setIsTyping(null)
        const response1: Message = {
          id: `msg-${Date.now()}`,
          content: generateResponse(group, groupMembers[1].id),
          sender: groupMembers[1],
          timestamp: new Date(),
        }

        // Add response to the group
        const updatedGroups = groupsData.map((g) => {
          if (g.id === group.id) {
            return {
              ...g,
              messages: [...g.messages, response1],
              lastMessage: response1.content,
              lastMessageTime: new Date(),
            }
          }
          return g
        })

        setGroupsData(updatedGroups)

        if (selectedGroup && selectedGroup.id === group.id) {
          setSelectedGroup((prev) =>
            prev
              ? {
                  ...prev,
                  messages: [...prev.messages, response1],
                  lastMessage: response1.content,
                  lastMessageTime: new Date(),
                }
              : null,
          )
        } else {
          // If user has switched to another group, increment unread count
          const updatedGroupsWithUnread = updatedGroups.map((g) => {
            if (g.id === group.id) {
              return {
                ...g,
                unreadCount: (g.unreadCount || 0) + 1,
              }
            }
            return g
          })

          setGroupsData(updatedGroupsWithUnread)
        }

        // Second response after another 3 seconds
        setTimeout(() => {
          setIsTyping({
            userId: groupMembers[2].id,
            name: groupMembers[2].name,
          })

          setTimeout(() => {
            setIsTyping(null)
            const response2: Message = {
              id: `msg-${Date.now()}`,
              content: generateResponse(group, groupMembers[2].id),
              sender: groupMembers[2],
              timestamp: new Date(),
            }

            // Add second response to the group
            const updatedGroups2 = groupsData.map((g) => {
              if (g.id === group.id) {
                return {
                  ...g,
                  messages: [...g.messages, response2],
                  lastMessage: response2.content,
                  lastMessageTime: new Date(),
                }
              }
              return g
            })

            setGroupsData(updatedGroups2)

            if (selectedGroup && selectedGroup.id === group.id) {
              setSelectedGroup((prev) =>
                prev
                  ? {
                      ...prev,
                      messages: [...prev.messages, response2],
                      lastMessage: response2.content,
                      lastMessageTime: new Date(),
                    }
                  : null,
              )
            } else {
              // If user has switched to another group, increment unread count
              const updatedGroupsWithUnread = updatedGroups2.map((g) => {
                if (g.id === group.id) {
                  return {
                    ...g,
                    unreadCount: (g.unreadCount || 0) + 1,
                  }
                }
                return g
              })

              setGroupsData(updatedGroupsWithUnread)
            }
          }, 2000)
        }, 3000)
      }, 2000)
    }, 2000)
  }

  // Format time for display
  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const day = 24 * 60 * 60 * 1000

    if (diff < 24 * 60 * 60 * 1000) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    } else if (diff < 7 * day) {
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
      return days[date.getDay()]
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" })
    }
  }

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "inspiration":
        return <Lightbulb className="h-4 w-4" />
      case "meaning":
        return <Music className="h-4 w-4" />
      case "history":
        return <History className="h-4 w-4" />
      case "trivia":
        return <ThumbsUp className="h-4 w-4" />
      case "structure":
        return <MessageCircle className="h-4 w-4" />
      case "opinion":
        return <MessageCircle className="h-4 w-4" />
      default:
        return <MessageCircle className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-background">
      <div className="container px-0 md:px-4 py-0 md:py-8 max-w-full">
        <div className="hidden md:flex items-center mb-6 px-4">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium hover:text-purple-600 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>

        <div className="flex flex-col md:flex-row h-[calc(100vh-80px)] md:h-[calc(100vh-140px)]">
          {/* Left sidebar - Groups */}
          <div className="w-full md:w-80 border-r bg-white dark:bg-gray-900 flex flex-col">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="font-bold text-lg">Music Circles</h2>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Bell className="h-5 w-5 text-gray-500" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Settings className="h-5 w-5 text-gray-500" />
                </Button>
              </div>
            </div>

            <div className="p-3">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search groups..."
                  className="pl-8 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <ScrollArea className="flex-1">
              <div className="p-2">
                {filteredGroups.map((group) => (
                  <motion.div
                    key={group.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={animatedGroups.includes(group.id) ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{
                      duration: 0.3,
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                    }}
                  >
                    <button
                      onClick={() => handleSelectGroup(group)}
                      className={`w-full text-left p-3 rounded-lg transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 mb-1 ${
                        selectedGroup?.id === group.id
                          ? "bg-slate-100 dark:bg-slate-800 border-l-4 border-purple-500"
                          : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`${group.color} w-12 h-12 rounded-full flex items-center justify-center text-white font-bold`}
                        >
                          {getCategoryIcon(group.category)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium text-sm truncate">{group.title}</h3>
                            <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                              {group.lastMessageTime ? formatTime(group.lastMessageTime) : ""}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 truncate mt-1">
                            {group.lastMessage || group.description}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-500 flex items-center">
                              <Users className="h-3 w-3 mr-1" />
                              {group.members}
                            </span>
                            {group.unreadCount ? (
                              <Badge className="bg-purple-600 text-white text-xs h-5 min-w-5 flex items-center justify-center rounded-full">
                                {group.unreadCount}
                              </Badge>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </button>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>

            <div className="p-3 border-t">
              <Button className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Create New Circle
              </Button>
            </div>
          </div>

          {/* Main chat area */}
          <div className="flex-1 flex flex-col">
            {selectedGroup ? (
              <>
                <div className="p-4 border-b flex items-center justify-between bg-white dark:bg-gray-900">
                  <div className="flex items-center gap-3">
                    <div
                      className={`${selectedGroup.color} w-10 h-10 rounded-full flex items-center justify-center text-white`}
                    >
                      {getCategoryIcon(selectedGroup.category)}
                    </div>
                    <div>
                      <h2 className="font-bold">{selectedGroup.title}</h2>
                      <p className="text-xs text-gray-500 flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        {selectedGroup.members} members
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Search className="h-5 w-5 text-gray-500" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Info className="h-5 w-5 text-gray-500" />
                    </Button>
                  </div>
                </div>

                <ScrollArea className="flex-1 p-4 bg-slate-50 dark:bg-slate-900">
                  <div className="space-y-4 max-w-3xl mx-auto">
                    {selectedGroup.messages.map((message) => (
                      <div key={message.id} className="space-y-1">
                        {/* Special styling for prompt messages */}
                        {message.sender.id === "system" ? (
                          <div className="bg-purple-100 dark:bg-purple-900/20 rounded-lg p-4 mx-auto max-w-md text-center">
                            <div className="flex justify-center mb-2">
                              <Badge variant="outline" className="bg-purple-500 text-white border-none">
                                Discussion Topic
                              </Badge>
                            </div>
                            <p className="font-medium">{message.content}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                              {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </p>
                          </div>
                        ) : (
                          <div className={`flex ${message.sender.id === "user-1" ? "justify-end" : "justify-start"}`}>
                            <div className="flex items-start gap-2 max-w-[80%]">
                              {message.sender.id !== "user-1" && (
                                <Avatar className="h-8 w-8 mt-1">
                                  <AvatarImage src={message.sender.avatar} alt={message.sender.name} />
                                  <AvatarFallback>{message.sender.initials}</AvatarFallback>
                                </Avatar>
                              )}
                              <div>
                                {message.sender.id !== "user-1" && (
                                  <p className="text-xs font-medium text-gray-500 mb-1">{message.sender.name}</p>
                                )}
                                <div
                                  className={`rounded-2xl p-3 ${
                                    message.sender.id === "user-1"
                                      ? "bg-purple-600 text-white rounded-tr-none"
                                      : "bg-white dark:bg-gray-800 rounded-tl-none"
                                  }`}
                                >
                                  <p className="text-sm">{message.content}</p>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                </p>
                              </div>
                              {message.sender.id === "user-1" && (
                                <Avatar className="h-8 w-8 mt-1">
                                  <AvatarImage src={message.sender.avatar} alt={message.sender.name} />
                                  <AvatarFallback>{message.sender.initials}</AvatarFallback>
                                </Avatar>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}

                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="flex items-start gap-2 max-w-[80%]">
                          <Avatar className="h-8 w-8 mt-1">
                            <AvatarImage src="/placeholder.svg?height=32&width=32" alt={isTyping.name} />
                            <AvatarFallback>{isTyping.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-xs font-medium text-gray-500 mb-1">{isTyping.name}</p>
                            <div className="bg-white dark:bg-gray-800 rounded-2xl rounded-tl-none p-3">
                              <div className="flex space-x-1">
                                <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"></div>
                                <div
                                  className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                                  style={{ animationDelay: "0.2s" }}
                                ></div>
                                <div
                                  className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                                  style={{ animationDelay: "0.4s" }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                <div className="p-4 border-t bg-white dark:bg-gray-900">
                  <div className="flex gap-2">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <Smile className="h-5 w-5 text-gray-500" />
                      </Button>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <Image className="h-5 w-5 text-gray-500" />
                      </Button>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <Paperclip className="h-5 w-5 text-gray-500" />
                      </Button>
                    </div>
                    <Input
                      placeholder="Type your message..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault()
                          handleSendMessage()
                        }
                      }}
                      className="flex-1 rounded-full"
                    />
                    <Button onClick={handleSendMessage} disabled={!inputValue.trim()} className="rounded-full">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center bg-slate-50 dark:bg-slate-900">
                <div className="text-center p-8">
                  <div className="bg-purple-100 dark:bg-purple-900/20 rounded-full p-3 mx-auto w-16 h-16 flex items-center justify-center mb-4">
                    <MessageCircle className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Select a Music Circle</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md">
                    Choose a Music Circle from the sidebar to start discussing music with other enthusiasts.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}


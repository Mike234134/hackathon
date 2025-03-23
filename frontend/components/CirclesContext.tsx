

import React, { createContext, useContext, useState, useEffect } from 'react'

// Define the type for a circle
export interface Circle {
  id: string
  title: string
  description: string
  members: number
  activity: "high" | "medium" | "low"
  genre: string
  avatars: { name: string, image: string }[]
  tags?: string[]
  isPrivate?: boolean
}

// Define the context type
interface CirclesContextType {
  circles: Circle[]
  addCircle: (circle: Omit<Circle, 'id' | 'members' | 'avatars'>) => void
}

// Create the context with default values
const CirclesContext = createContext<CirclesContextType>({
  circles: [],
  addCircle: () => {},
})

// Custom hook to use the circles context
export const useCircles = () => useContext(CirclesContext)

// Initial circles data
const initialCircles: Circle[] = [
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

export const CirclesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state with circles from localStorage if available, otherwise use initialCircles
  const [circles, setCircles] = useState<Circle[]>(() => {
    if (typeof window !== 'undefined') {
      const savedCircles = localStorage.getItem('musicCircles')
      return savedCircles ? JSON.parse(savedCircles) : initialCircles
    }
    return initialCircles
  })

  // Save circles to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('musicCircles', JSON.stringify(circles))
    }
  }, [circles])

  // Function to add a new circle
  const addCircle = (newCircle: Omit<Circle, 'id' | 'members' | 'avatars'>) => {
    const circle: Circle = {
      ...newCircle,
      id: Date.now().toString(), // Generate a unique ID
      members: 1, // Start with the creator as the only member
      avatars: [
        { name: "ME", image: "/placeholder.svg?height=40&width=40" }, // Default avatar for creator
      ],
    }
    
    setCircles(prevCircles => [circle, ...prevCircles])
  }

  return (
    <CirclesContext.Provider value={{ circles, addCircle }}>
      {children}
    </CirclesContext.Provider>
  )
}
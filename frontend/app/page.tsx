import { Suspense } from "react"
import Link from "next/link"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import FeaturedSongs from "@/components/featured-songs"
import MusicCircles from "@/components/music-circles"
import LoadingSpinner from "@/components/loading-spinner"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Resonance
            </span>
          </Link>
          <div className="ml-auto flex items-center gap-4">
            <form className="relative w-full max-w-sm lg:max-w-lg">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search songs, artists or genres..." className="pl-8 w-full" />
            </form>
            <Link href="signup"><Button>Sign In</Button></Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Discover the Stories Behind Your Favorite Songs
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  AI-powered insights into song meanings, inspirations, and historical context. Join the conversation in
                  real-time Music Circles.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input type="text" placeholder="Enter a song or artist" className="flex-1" />
                  <Button type="submit">Discover</Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 container px-4 md:px-6">
          <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl mb-8">Featured Stories</h2>
          <Suspense fallback={<LoadingSpinner />}>
            <FeaturedSongs />
            
          </Suspense>
        </section>

        <section className="py-12 md:py-16 bg-slate-50 dark:bg-slate-900">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl mb-8">Active Music Circles</h2>
            <Suspense fallback={<LoadingSpinner />}>
              <MusicCircles />
            </Suspense>
          </div>
        </section>

        <section className="py-12 md:py-16 container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl mb-4">How It Works</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-purple-900 dark:bg-purple-900 dark:text-purple-100">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold">Search for a song</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Find any song you're curious about</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-purple-900 dark:bg-purple-900 dark:text-purple-100">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold">Discover its story</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      AI generates insights about inspiration and meaning
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-purple-900 dark:bg-purple-900 dark:text-purple-100">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold">Join the conversation</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Discuss with others in real-time Music Circles
                    </p>
                  </div>
                </li>
              </ul>
              <Button className="mt-6">Get Started</Button>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img
                src="/neon-heart-rates-sign-display-footage-133527926_iconl.webp?height=400&width=600"
                alt="Music Storyteller App Demo"
                className="w-full h-auto"
              />
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-gray-500 dark:text-gray-400">© 2025 Resonance. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-gray-500 hover:underline dark:text-gray-400">
              Terms
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:underline dark:text-gray-400">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:underline dark:text-gray-400">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}


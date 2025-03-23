import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export async function getArtistSong(name: string) {
  const res = await fetch(`http://localhost:8000/album?artist=${name}`)
  return await res.json()
}
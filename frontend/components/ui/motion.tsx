"use client"

import { type HTMLMotionProps, motion as framerMotion } from "framer-motion"

type MotionProps = HTMLMotionProps<"div">

// Re-export framer-motion components with the "use client" directive
export const motion = {
  div: (props: MotionProps) => <framerMotion.div {...props} />,
  button: (props: HTMLMotionProps<"button">) => <framerMotion.button {...props} />,
  span: (props: HTMLMotionProps<"span">) => <framerMotion.span {...props} />,
  img: (props: HTMLMotionProps<"img">) => <framerMotion.img {...props} />,
  a: (props: HTMLMotionProps<"a">) => <framerMotion.a {...props} />,
  ul: (props: HTMLMotionProps<"ul">) => <framerMotion.ul {...props} />,
  li: (props: HTMLMotionProps<"li">) => <framerMotion.li {...props} />,
  p: (props: HTMLMotionProps<"p">) => <framerMotion.p {...props} />,
  section: (props: HTMLMotionProps<"section">) => <framerMotion.section {...props} />,
  header: (props: HTMLMotionProps<"header">) => <framerMotion.header {...props} />,
  footer: (props: HTMLMotionProps<"footer">) => <framerMotion.footer {...props} />,
  main: (props: HTMLMotionProps<"main">) => <framerMotion.main {...props} />,
  nav: (props: HTMLMotionProps<"nav">) => <framerMotion.nav {...props} />,
  aside: (props: HTMLMotionProps<"aside">) => <framerMotion.aside {...props} />,
  article: (props: HTMLMotionProps<"article">) => <framerMotion.article {...props} />,
}


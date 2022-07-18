import { useState } from "react"

export function useHoverElevation(hovered: number = 4, unhovered: number = 2) {
  const [elevation, setElevation] = useState(unhovered)
  const onMouseOut = () => setElevation(unhovered)
  const onMouseOver = () => setElevation(hovered)

  return { elevation, onMouseOut, onMouseOver }
}

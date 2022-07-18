import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material"
import { useRouter } from "next/router"
import { PropsWithChildren, ReactNode } from "react"

type LinkCardProps = PropsWithChildren<{
  to: string
  title: string
  children: ReactNode
}>

export function LinkCard({ to, title, children }: LinkCardProps) {
  const router = useRouter()

  return (
    <Card
      onClick={() => router.push(to)}
      onMouseEnter={() => router.prefetch(to)}
    >
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {children}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

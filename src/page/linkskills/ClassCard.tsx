import { Box, Typography, Card, CardContent, CardMedia } from "@mui/material"
import { classImageData } from "class/img/portrait"
import { ClassName } from "class/types"
import classData from "class/data.yml"
import { classNameToColor } from "class/classState"
import { grey } from "@mui/material/colors"

export const ClassCard = ({ className }: { className: ClassName }) => {
  const image = classImageData[className]
  const { link, legion, group, type } = classData[className]
  const color = classNameToColor(className)
  return (
    <Card
      sx={{
        display: "flex",
        height: "100%",
        border: 2,
        borderColor: color[400],
        backgroundColor: color[100],
      }}
    >
      <CardMedia
        sx={{ width: image.width / 1.75, background: grey[50] }}
        component="img"
        alt={className}
        image={image.src}
      ></CardMedia>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent>
          <Typography variant="h4">{className}</Typography>
          <Typography variant="subtitle1">
            {group ?? "Something"} {type ?? "Unknown"}
          </Typography>
          <Typography variant="h5">Link skill</Typography>
          <Typography variant="subtitle1">{link?.name ?? "Unknown"}</Typography>
          <Typography>{link?.effect ?? "Unknown"}</Typography>
          <Typography variant="h5">Legion Effect</Typography>
          <Typography>
            {legion?.effect ?? "Unknown"}: +{(legion?.value ?? []).join("/")}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  )
}

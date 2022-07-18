import {
  Rating,
  Box,
  ButtonGroup,
  Button,
  Paper,
  Grid,
  Typography,
} from "@mui/material"
import { grey } from "@mui/material/colors"
import { useAtomValue, useSetAtom } from "jotai"
import { ClassImage } from "class/ClassImage"
import {
  classLevel,
  legionRankLetter,
  legionDecreaseRank,
  legionIncreaseRank,
  linkDecreaseRank,
  linkIncreaseRank,
  linkRank,
  classMaxStars,
  classStars,
  classNameToColor,
} from "class/classState"
import { ClassName } from "class/types"
import { useHoverElevation } from "hooks/useHoverElevation"
import { Star, StarOutlined } from "@mui/icons-material"

const ProgressMeter = ({ className }: { className: ClassName }) => {
  const color = classNameToColor(className)
  const value = useAtomValue(classStars(className))
  const max = classMaxStars(className)

  return (
    <Rating
      icon={<StarOutlined sx={{ color: color[500] }} />}
      emptyIcon={<Star sx={{ opacity: 0.55 }} />}
      value={value}
      max={max}
      readOnly
    />
  )
}

const ClassTileLegionWidget = ({ className }: { className: ClassName }) => {
  const letter = useAtomValue(legionRankLetter(className))
  const decreaseLegion = useSetAtom(legionDecreaseRank(className))
  const increaseLegion = useSetAtom(legionIncreaseRank(className))

  return (
    <Box>
      <Box>Legion: {letter}</Box>
      <Box>
        <ButtonGroup disableElevation variant="contained">
          <Button onClick={() => decreaseLegion()}>-</Button>
          <Button onClick={() => increaseLegion()}>+</Button>
        </ButtonGroup>
      </Box>
    </Box>
  )
}

const ClassTileLinkWidget = ({ className }: { className: ClassName }) => {
  const rank = useAtomValue(linkRank(className))
  const decreaselink = useSetAtom(linkDecreaseRank(className))
  const increaselink = useSetAtom(linkIncreaseRank(className))
  return (
    <Box>
      <Box>Link Lv.{rank}</Box>
      <Box>
        <ButtonGroup disableElevation variant="contained">
          <Button onClick={() => decreaselink()}>-</Button>
          <Button onClick={() => increaselink()}>+</Button>
        </ButtonGroup>
      </Box>
    </Box>
  )
}

export const LevellingCard = ({ className }: { className: ClassName }) => {
  const { elevation, onMouseOut, onMouseOver } = useHoverElevation(8)
  const level = useAtomValue(classLevel(className))
  const color = classNameToColor(className)
  return (
    <Paper
      elevation={elevation}
      onMouseOut={onMouseOut}
      onMouseOver={onMouseOver}
      sx={{
        minWidth: "100%",
        minHeight: "100%",
        border: 2,
        borderColor: color[400],
        backgroundColor: color[100],
        display: "grid",
        gridTemplateColumns: "repeat(8,1fr)",
        alignItems: "center",
        gridAutoFlow: "row",
        rowGap: 0.5,
      }}
    >
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          gridColumn: "span 8",
        }}
      >
        <Typography textAlign="center" variant="h6">
          {className}
        </Typography>
        <Typography textAlign="center">Lv.{level ?? 0}</Typography>
        <ProgressMeter className={className} />
      </Grid>
      <Box
        sx={{
          gridColumn: "span 8",
          backgroundColor: grey[100],
          borderTop: 1,
          borderBottom: 1,
          borderColor: color[200],
        }}
      >
        <ClassImage characterClassName={className} />
      </Box>

      <Box sx={{ gridColumn: "span 4", textAlign: "center" }}>
        <ClassTileLinkWidget className={className} />
      </Box>
      <Box sx={{ gridColumn: "span 4", textAlign: "center" }}>
        <ClassTileLegionWidget className={className} />
      </Box>
      <Box sx={{ gridColumn: "span 4", textAlign: "center" }}></Box>
    </Paper>
  )
}

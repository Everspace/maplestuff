import { Box, Breakpoint } from "@mui/system"
import { BoxProps } from "@mui/system/Box"
import { FunctionComponent } from "react"

type TileGridProps = {
  columns?: number | Partial<Record<Breakpoint, number>>
}

const TileGrid: FunctionComponent<BoxProps & TileGridProps> = ({
  sx,
  columns = 2,
  ...other
}) => {
  const gridTemplateColumns: Partial<Record<Breakpoint, string>> = {}
  if (typeof columns === "number") {
    gridTemplateColumns.xs = `repeat(${columns}, 1fr)`
  } else {
    const entries = Object.entries(columns) as [Breakpoint, number][]
    entries.forEach(([key, value]) => {
      gridTemplateColumns[key] = `repeat(${value}, 1fr)`
    })
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns,
        gridTemplateRows: "auto",
        gridAutoFlow: "row",
        columnGap: 1,
        rowGap: 2,
        ...sx,
      }}
      {...other}
    />
  )
}

export default TileGrid

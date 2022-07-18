import {
  Box,
  Typography,
  Paper,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Rating,
  Grid,
} from "@mui/material"
import { NextPage } from "next"
import { allClassNames, ClassName } from "../src/class/types"
import classData from "../src/class/data.yml"
import { atom, useAtom, useAtomValue } from "jotai"
import {
  isClassVisible,
  legionLevel,
  starToLevel,
  starValueGoal,
} from "../src/class/classState"
import { Fragment, useState } from "react"
import { grey } from "@mui/material/colors"
import atomWithLocalStorage from "../src/atomWithLocalStorage"
import { LevellingCard } from "page/legion/LevellingCard"
import Layout from "page/Layout"
import TileGrid from "TileGrid"

const StarGoalSelector = () => {
  const [value, setValue] = useAtom(starValueGoal)
  const [hover, setHover] = useState(-1)
  let level: any
  if (hover === -1)
    level = starToLevel[value] === 0 ? "Any" : starToLevel[value]
  else level = starToLevel[hover]
  return (
    <Box>
      <Typography component="legend" sx={{ pb: 0.25 }}>
        Goal: Lv.{level}
      </Typography>
      <Rating
        value={value}
        size="large"
        max={starToLevel.length - 1}
        onChange={(_, update) => setValue(update)}
        onChangeActive={(_, update) => setHover(update)}
      />
    </Box>
  )
}

const levellingList: Record<string, ClassName[]> = {
  "XP Boost": ["Mercedes", "Aran", "Evan"],
  "Premier Damage Increasers": ["Demon Avenger", "Kanna", "Hoyoung", "Lara"],
  Damage: [
    "Ark",
    "Cadena",
    "Zero",
    "Beast Tamer",
    "Phantom",
    "Marksman",
    "Bowmaster",
    "Pathfinder",
  ],
  Durability: ["Buccanner", "Corsair", "Cannoneer", "Kaiser"],
}

const groupOfAllgroups = allClassNames.reduce((memory, name) => {
  const group = classData[name]?.group ?? "Unknown"
  if (!memory[group]) memory[group] = []
  memory[group].push(name)
  memory[group].sort()
  return memory
}, {} as Record<string, ClassName[]>)

const lists: Record<string, Record<string, ClassName[]>> = {
  All: groupOfAllgroups,
  Levelling: levellingList,
}

const selectedListAtom = atomWithLocalStorage<keyof typeof lists>(
  "displaySelected",
  "All",
)

const filteredList = atom((get) => {
  const targetList = lists[get(selectedListAtom)]
  const result: [string, ClassName[]][] = []
  for (const [entryName, classNames] of Object.entries(targetList)) {
    const passingClasses = classNames.filter((name) =>
      get(isClassVisible(name)),
    )
    if (passingClasses.length > 0) result.push([entryName, passingClasses])
  }
  return result
})

const DisplaySelector = () => {
  const [selected, setSelected] = useAtom(selectedListAtom)
  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Display</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={selected}
        onChange={(_, value) => {
          if (lists[value]) setSelected(value)
        }}
      >
        <FormControlLabel value="All" control={<Radio />} label="All" />
        <FormControlLabel
          value="Levelling"
          control={<Radio />}
          label="Levelling"
        />
        <FormControlLabel
          disabled
          value="Bossing"
          control={<Radio />}
          label="Bossing"
        />
      </RadioGroup>
    </FormControl>
  )
}

const Legion: NextPage = (props) => {
  const level = useAtomValue(legionLevel)
  const selectedList = useAtomValue(filteredList)
  return (
    <Layout>
      <Paper sx={{ p: 3, mb: 1 }}>Total Legion: {level}</Paper>
      <Paper>
        <Box sx={{ p: 3, borderBottom: 1, borderBottomColor: grey[200] }}>
          <Typography variant="h5">Classes</Typography>
          <Grid container spacing={4}>
            <Grid item>
              <DisplaySelector />
            </Grid>
            <Grid item>
              <StarGoalSelector />
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ mt: 0, maxHeight: "70vh", overflow: "auto" }}>
          <TileGrid
            columns={{
              xs: 2,
              sm: 2,
              md: 3,
              lg: 4,
              xl: 5,
            }}
            sx={{
              p: 3,
              overflowY: "auto",
            }}
          >
            {selectedList.map(([group, names]) => (
              <Fragment key={group}>
                <Paper sx={{ p: 3, gridColumn: "1 / -1" }}>
                  <Typography variant="h5">{group}</Typography>
                </Paper>
                {names.map((name) => (
                  <LevellingCard
                    key={name as string}
                    className={name as ClassName}
                  />
                ))}
              </Fragment>
            ))}
          </TileGrid>
        </Box>
      </Paper>
    </Layout>
  )
}

export default Legion

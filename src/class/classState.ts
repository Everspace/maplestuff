import { atom } from "jotai"
import { atomFamily } from "jotai/utils"
import { allClassNames, ClassName, ClassType } from "./types"
import classData from "./data.yml"
import atomWithLocalStorage from "../atomWithLocalStorage"
import {
  red,
  orange,
  green,
  blue,
  purple,
  blueGrey,
  grey,
} from "@mui/material/colors"

// findHighestRank(251, [0, 60, 100, 140, 200, 250]) => 5
// findHighestRank(120, [0, 60, 100, 140, 200, 250]) => 2
// findHighestRank( 99, [0, 60, 100, 140, 200, 250]) => 1

const findHighestRank = (n: number, levels: number[]) => {
  for (let i = levels.length - 1; i > -1; i--) {
    if (levels[i] <= n) return i
  }
  return -1
}

export const classLevel = atomFamily(
  (
    className: ClassName, //atom(0),
  ) => atomWithLocalStorage<number>(className, 0),
)

export const legionLevel = atom((get) => {
  return allClassNames
    .map((n) => get(classLevel(n)))
    .reduce((mem, value) => mem + value, 0)
})

const rankNames = ["N/A", "B", "A", "S", "SS", "SSS"]
const legionRankLevels = [0, 60, 100, 140, 200, 250]
const zeroRankLevels = [0, 130, 160, 180, 200, 250]

export const starToLevel = [0, 70, 120, 140, 200, 210]
const starAtom = atomWithLocalStorage("starNumberGoal", 2)
export const starValueGoal = atom<number, number | null>(
  (get) => get(starAtom),
  (_, set, update) => {
    update = update ?? 0
    if (update >= 0 && update < starToLevel.length) set(starAtom, update)
  },
)

export const isClassVisible = atomFamily((className: ClassName) => {
  const levelAtom = classLevel(className)
  return atom((get) => {
    const goal = get(starValueGoal)
    if (goal === 0) return true
    if (goal > classMaxStars(className)) return false

    const level = get(levelAtom)
    const levelGoal = starToLevel[goal]
    return level < levelGoal
  })
})

export const classMaxStars = (className: ClassName) => {
  const levels = classData[className]?.link?.levels ?? []
  const is210Link = levels.length === 4 // 3 levels + 0
  let max = starToLevel.length - 1
  if (!is210Link) max -= 1
  return max
}

export const classStars = atomFamily((className: ClassName) => {
  const levelAtom = classLevel(className)
  return atom((get) => {
    const level = get(levelAtom) ?? 0
    let value = 0
    if (level >= 70) value += 1
    if (level >= 120) value += 1
    if (level >= 140) value += 1
    if (level >= 200) value += 1
    if (level >= 210) value += 1
    return value
  })
})

export const legionRankLetter = atomFamily((className: ClassName) => {
  const levelSelector = className == "Zero" ? zeroRankLevels : legionRankLevels
  const levelAtom = classLevel(className)
  return atom((get) => {
    const level = get(levelAtom)
    const result = findHighestRank(level, levelSelector) // 0->5
    return rankNames[result]
  })
})

export const legionIncreaseRank = atomFamily((className: ClassName) => {
  const levelSelector = className == "Zero" ? zeroRankLevels : legionRankLevels
  const levelAtom = classLevel(className)
  return atom(null, (get, set) => {
    const level = get(levelAtom)
    const result = findHighestRank(level, levelSelector) // 0->5
    if (result < 5) {
      set(levelAtom, levelSelector[result + 1])
    }
  })
})

export const legionDecreaseRank = atomFamily((className: ClassName) => {
  const levelSelector = className == "Zero" ? zeroRankLevels : legionRankLevels
  const levelAtom = classLevel(className)
  return atom(null, (get, set) => {
    const level = get(levelAtom)
    const result = findHighestRank(level, levelSelector) // 0->5
    if (result > 0) {
      set(levelAtom, levelSelector[result - 1])
    }
  })
})

export const linkRank = atomFamily((className: ClassName) => {
  const levelSelector = classData[className].link?.levels ?? []
  const levelAtom = classLevel(className)
  return atom((get) => {
    const level = get(levelAtom)
    const result = findHighestRank(level, levelSelector)
    if (result == -1) {
      const lastLevel = levelSelector.at(-1) ?? 0
      if (level >= lastLevel) return levelSelector.length
      return 0
    }
    return result
  })
})

export const linkIncreaseRank = atomFamily((className: ClassName) => {
  const levelSelector = classData[className]?.link?.levels ?? []
  const levelAtom = classLevel(className)
  return atom(null, (get, set) => {
    const level = get(levelAtom)
    const result = findHighestRank(level, levelSelector) // 0->5
    if (result < levelSelector.length - 1) {
      set(levelAtom, levelSelector[result + 1])
    }
  })
})

export const linkDecreaseRank = atomFamily((className: ClassName) => {
  const levelSelector = classData[className]?.link?.levels ?? []
  const levelAtom = classLevel(className)
  return atom(null, (get, set) => {
    const level = get(levelAtom)
    const result = findHighestRank(level, levelSelector) // 0->5
    if (result > 0) {
      set(levelAtom, levelSelector[result - 1])
    }
  })
})

const classTypeToColor = (classType: ClassType | undefined) => {
  switch (classType) {
    case "Warrior":
      return red
    case "Thief":
      return orange
    case "Bowman":
      return green
    case "Magician":
      return blue
    case "Pirate":
      return purple
    case "Xenon":
      return blueGrey
  }
  return grey
}

export const classNameToColor = (className: ClassName) => {
  const type = classData[className]?.type
  return classTypeToColor(type)
}

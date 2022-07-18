import { ClassName, ClassType } from "./types"

export type ClassDefinition = {
  group?: string
  type?: ClassType
  link: {
    name?: string
    type: string
    levels: number[]
    effect?: string
  }
  legion: {
    name?: string
    type?: string
    effect?: string
    value: number[]
  }
}

const data: Record<ClassName, ClassDefinition>
export default data

import { atomWithStorage } from "jotai/utils"

type AsyncStorage<T> = {
  setItem: (key: string, value: T) => void
  getItem: (key: string) => T
  removeItem: (key: string) => void
}

export const localStorageSaver: AsyncStorage<any> & { delayInit: boolean } = {
  setItem: async (key: string, value: any) =>
    localStorage.setItem(key, JSON.stringify(value)),
  getItem: async (key: string) => {
    const result = localStorage.getItem(key)
    if (!result) return 0
    return JSON.parse(result)
  },
  removeItem: async (key: string) => localStorage.removeItem(key),
  delayInit: true,
}

export default function atomWithLocalStorage<T>(key: string, defaultValue: T) {
  return atomWithStorage<T>(key, defaultValue, localStorageSaver)
}

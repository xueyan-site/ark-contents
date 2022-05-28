import { createContext, useContext } from 'react'
import type {
  ContentsOption,
  ContentsProOption,
  ContentsGetHref,
  ContentsOnClick,
  ContentsOnChange,
  ContentsOptionStruct
} from './types'

export interface ContentsItemPreset<T> {
  name?: string
  disabled?: boolean
  option?: Partial<ContentsOption<T>>
  active?: ContentsProOption<T>
  options: ContentsOptionStruct<T>
  actives: ContentsProOption<T>[]
  expands: Record<string, boolean>
  getHref?: ContentsGetHref<T>
  onClick?: ContentsOnClick<T>
  onChange?: ContentsOnChange<T>
}

const ContentsItemPresetContext = createContext<ContentsItemPreset<any>>({
  actives: [],
  expands: {},
  options: {
    tree: [],
    leafs: [],
    map: new Map()
  }
})

export const ContentsItemPresetProvider = ContentsItemPresetContext.Provider

export const useContentsItemPreset = () => useContext(ContentsItemPresetContext)

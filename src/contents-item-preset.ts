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
  /** 目录名称（本地存储缓存数据时，会被作为 key 使用） */
  name?: string
  /** 禁用 */
  disabled?: boolean
  /** 选项部分属性 */
  option?: Partial<ContentsOption<T>>
  /** 当前活跃节点选项 */
  active?: ContentsProOption<T>
  /** 所有选项 */
  options: ContentsOptionStruct<T>
  /** 当前活跃节点选项的路径 */
  actives: ContentsProOption<T>[]
  /** 展开项信息 */
  expands: Record<string, boolean>
  /** 生成链接 */
  getHref?: ContentsGetHref<T>
  /** 当点击时触发 */
  onClick?: ContentsOnClick<T>
  /** 当值需要改变时触发 */
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

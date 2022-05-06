import { LinkProps } from 'xueyan-react-link'

export interface ContentsOption<T> 
  extends Omit<LinkProps, 'children'>, Record<string, any> {
  /** 文本内容 */
  label?: React.ReactNode
  /** 选项值 */
  value: T
  /** 禁用项 */
  disabled?: boolean
  /** 子节点 */
  children?: ContentsOption<T>[]
}

export interface ContentsProOption<T> 
  extends ContentsOption<T> {
  /** 用于搜索的关键字 */
  keywords: string
  /** 子节点 */
  children: ContentsProOption<T>[]
  /** 父节点 */
  parents: ContentsProOption<T>[]
  /** 上一级节点 */
  prev?: ContentsProOption<T>
  /** 下一级节点 */
  next?: ContentsProOption<T>
}

export interface ContentsOptionStruct<T> {
  map: Map<T, ContentsProOption<T>>
  tree: ContentsProOption<T>[]
  leafs: ContentsProOption<T>[]
}

export type ContentsOnChange<T> = (
  value: T, 
  option: ContentsProOption<T>,
  options: ContentsOptionStruct<T>
) => void

export type ContentsOnClick<T> = (
  event: React.MouseEvent<HTMLElement, MouseEvent>, 
  value: T, 
  option: ContentsProOption<T>,
  options: ContentsOptionStruct<T>
) => void

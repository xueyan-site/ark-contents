import { LinkProps } from 'xueyan-react-link'

export interface ContentOption<T> 
  extends Omit<LinkProps, 'children'>, Record<string, any> {
  /** 文本内容 */
  label?: React.ReactNode
  /** 选项值 */
  value: T
  /** 禁用项 */
  disabled?: boolean
  /** 子节点 */
  children?: ContentOption<T>[]
}

export interface ContentProOption<T> 
  extends ContentOption<T> {
  /** 子节点 */
  children: ContentProOption<T>[]
  /** 父节点 */
  parents: ContentProOption<T>[]
  /** 上一级节点 */
  prev?: ContentProOption<T>
  /** 下一级节点 */
  next?: ContentProOption<T>
}

export interface ContentOptionStruct<T> {
  map: Map<T, ContentProOption<T>>
  tree: ContentProOption<T>[]
  leafs: ContentProOption<T>[]
}

export type ContentOnClick<T> = (
  event: React.MouseEvent<HTMLElement, MouseEvent>, 
  value: T, 
  option: ContentProOption<T>,
  options: ContentOptionStruct<T>
) => void

export type ContentOnChange<T> = (
  value?: T, 
  option?: ContentProOption<T>,
  options?: ContentOptionStruct<T>
) => void

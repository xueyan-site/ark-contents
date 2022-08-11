import React from 'react'
import { Article, Segment } from 'ark-markdown'

const MARK1 = `
目录组件

\`\`\`
type Contents = React.ForwardRefExoticComponent<
  ContentsProps<any> & React.RefAttributes<ContentsRef>
>
\`\`\`

## 简单示例

\`\`\`
const options: ContentsOption<number>[] = [
  {
    value: 1,
    label: '选项一',
    children: [
      {
        value: 11,
        label: '子选项一',
        icon: <LabelLineIcon/>
      },
      {
        value: 12,
        label: '子选项二',
      }
    ]
  }
]

function Example() {
  const [value, setValue] = useState<number>(11)
  return (
    <Contents
      value={value}
      options={options}
      getHref={option => {
        return '#' + option.label
      }}
    />
  )
}
\`\`\`

## ContentsRef

\`\`\`
interface ContentsRef {
  /** 根节点 */
  rootNode: HTMLDivElement | null
}
\`\`\`

## ContentsProps

继承 <a href="#contentsitempreset">ContentsItemPreset</a> 部分属性：

\`name\`、\`option\`、\`disabled\`、\`getHref\`、\`onClick\`、\`onChange\`

| 属性 | 名称 | 类型 | 说明 |
| - | - | - | - |
| style | 样式 | \`? React.CSSProperties\` |  |
| className | 类名 | \`? string\` |  |
| value | 选值 | \`? T\` |  |
| options | 选项 | \`? ContentsOption<T>[],ContentsOptionStruct<T>\` | |

## ContentsItemPreset

所有目录项共享的公共信息

\`\`\`
interface ContentsItemPreset<T> {
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
\`\`\`

## ContentsOption

外部传入的目录选项

\`\`\`
interface ContentsOption<T> extends 
  Omit<LabelLinkProps, 'children'>, 
  Record<string, any>
{
  /** 文本内容 */
  label?: React.ReactNode
  /** 选项值 */
  value: T
  /** 禁用项 */
  disabled?: boolean
  /** 子节点 */
  children?: ContentsOption<T>[]
}
\`\`\`

> 其他类型：[LabelLinkProps](/ark-link)

## ContentsProOption

组件内部，对传入的目录选项的包装

\`\`\`
interface ContentsProOption<T> extends ContentsOption<T> {
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
\`\`\`

## ContentsOptionStruct

组件内部，对传入的目录选项列表的包装

\`\`\`
interface ContentsOptionStruct<T> {
  map: Map<T, ContentsProOption<T>>
  tree: ContentsProOption<T>[]
  leafs: ContentsProOption<T>[]
}
\`\`\`

## ContentsGetHref

获取目录项链接的方法

\`\`\`
type ContentsGetHref<T> = (
  option: ContentsProOption<T>,
  options: ContentsOptionStruct<T>
) => LabelLinkProps['href']
\`\`\`

## ContentsOnChange

当目录选值需要发生改变时，调用的方法

\`\`\`
type ContentsOnChange<T> = (
  value: T, 
  option: ContentsProOption<T>,
  options: ContentsOptionStruct<T>
) => void
\`\`\`

## ContentsOnClick

当目录选项被点击时，调用的方法

\`\`\`
type ContentsOnClick<T> = (
  event: React.MouseEvent<HTMLElement, MouseEvent>, 
  value: T, 
  option: ContentsProOption<T>,
  options: ContentsOptionStruct<T>
) => void
\`\`\`
`

export default function Main() {
  return (
    <Article>
      <Segment>{MARK1}</Segment>
    </Article>
  )
}

import React, { forwardRef, useImperativeHandle, useMemo, useRef } from 'react'
import { loadExpands } from './utils'
import { ContentItem } from './content-item'
import { useContentOptions, useContentActiveInfo } from './hooks'
import type { ContentOnChange, ContentOnClick, ContentOption, ContentOptionStruct } from './types'

export interface ContentProps<T> {
  /** 类名 */
  className?: string
  /** 样式 */
  style?: React.CSSProperties
  /** 目录名 */
  name?: string
  /** 已选值 */
  value?: T
  /** 选项 */
  options?: ContentOption<T>[] | ContentOptionStruct<T>
  /** 禁止修改 */
  disabled?: boolean
  /** 点击项（包括非叶子节点） */
  onClick?: ContentOnClick<T>
  /** 改变已选值（仅仅针对叶子节点） */
  onChange?: ContentOnChange<T>
}

export interface ContentRef {
  rootNode: HTMLDivElement | null
}

export const Content = forwardRef<ContentRef, ContentProps<any>>(({
  className,
  style,
  name,
  value,
  disabled,
  onChange,
  onClick,
  ...props
}, ref) => {
  const rootRef = useRef<HTMLDivElement>(null)
  const expands = useMemo(() => loadExpands(name), [name])
  const options = useContentOptions(props.options)
  const [active, actives] = useContentActiveInfo(value, options)

  useImperativeHandle(ref, () => ({
    rootNode: rootRef.current
  }), [rootRef.current])

  return (
    <div
      ref={rootRef}
      style={style}
      className={className}
    >
      {options.tree.map((option, index) => (
        <ContentItem
          key={index}
          name={name}
          disabled={disabled}
          option={option}
          active={active}
          options={options}
          actives={actives}
          expands={expands}
          onClick={onClick}
          onChange={onChange}
        />
      ))}
    </div>
  )
})

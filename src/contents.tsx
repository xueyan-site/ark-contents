import React, { forwardRef, useImperativeHandle, useMemo, useRef } from 'react'
import { Input } from 'xueyan-react-input'
import { loadExpands } from './utils'
import { ContentsItem } from './contents-item'
import { ContentsItemPresetProvider } from './contents-item-preset'
import { useContentsOptions, useContentsActiveInfo, useContentsKeyword } from './hooks'
import type { ContentsItemPreset } from './contents-item-preset'
import type { ContentsOption, ContentsOptionStruct } from './types'

export interface ContentsProps<T> extends Pick<
  ContentsItemPreset<T>,
  | 'name'
  | 'option'
  | 'disabled'
  | 'getHref'
  | 'onClick'
  | 'onChange'
> {
  /** 类名 */
  className?: string
  /** 样式 */
  style?: React.CSSProperties
  /** 已选值 */
  value?: T
  /** 选项 */
  options?: ContentsOption<T>[] | ContentsOptionStruct<T>
}

export interface ContentsRef {
  rootNode: HTMLDivElement | null
}

export const Contents = forwardRef<ContentsRef, ContentsProps<any>>(({
  className,
  style,
  name,
  value,
  option,
  disabled,
  getHref,
  onChange,
  onClick,
  ...props
}, ref) => {
  const rootRef = useRef<HTMLDivElement>(null)
  const expands = useMemo(() => loadExpands(name), [name])
  const _options = useContentsOptions(props.options)
  const [active, actives] = useContentsActiveInfo(value, _options)
  const [options, keyword, setKeyword] = useContentsKeyword(value, _options)

  useImperativeHandle(ref, () => ({
    rootNode: rootRef.current
  }), [rootRef.current])

  return (
    <ContentsItemPresetProvider
      value={{
        name,
        disabled,
        option,
        options,
        active,
        actives,
        expands,
        getHref, 
        onClick, 
        onChange
      }}
    >
      <div
        ref={rootRef}
        style={style}
        className={className}
      >
        {_options.tree.length > 0 && (
          <Input
            placeholder="search"
            value={keyword}
            onChange={setKeyword}
            onClear={() => setKeyword('')}
            style={{ marginBottom: '8px' }}
          />
        )}
        {options.tree.map((option, index) => (
          <ContentsItem key={index} option={option} />
        ))}
      </div>
    </ContentsItemPresetProvider>
  )
})

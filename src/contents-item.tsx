import React, { Fragment, useState } from 'react'
import cn from 'classnames'
import styles from './contents-item.scss'
import { Link } from 'xueyan-react-link'
import { DirectionIcon } from 'xueyan-react-icon'
import { ExpandTransition } from 'xueyan-react-transition'
import { saveExpand } from './utils'
import type { 
  ContentsOnChange, 
  ContentsOnClick, 
  ContentsOptionStruct, 
  ContentsProOption 
} from './types'

export function ContentsItem<T>({
  name,
  option,
  active,
  options,
  actives,
  expands,
  onClick,
  onChange,
  ...props
}: {
  name?: string
  disabled?: boolean
  option: ContentsProOption<T>
  active?: ContentsProOption<T>
  options: ContentsOptionStruct<T>
  actives: ContentsProOption<T>[]
  expands: Record<string, boolean>
  onClick?: ContentsOnClick<T>
  onChange?: ContentsOnChange<T>
}) {
  const disabled = option.disabled || props.disabled
  const level = option.parents.length
  const isActive = active === option
  const inActive = actives[level] === option
  const hasChildren = option.children.length > 0
  const [expand, setExpand] = useState(
    inActive || expands[String(option.value)]
  )

  return (
    <Fragment>
      <div
        className={cn(styles.xrcontentsitem, {
          [styles.active]: inActive && (isActive || expand),
          [styles.disabled]: disabled,
        })}
        style={{ 
          paddingLeft: level * 12
        }}
        onClick={hasChildren ? (() => {
          setExpand(!expand)
          saveExpand(name, option, !expand)
        }) : undefined}
      >
        <div className={styles.icon}>
          {hasChildren ? (
            <DirectionIcon direction={expand ? 'bottom' : 'right'} />
          ) : (
            <div className={styles.line}/>
          )}
        </div>
        <Link
          {...option}
          ellipsis={{
            ...option.ellipsis,
            popover: {
              ...option.ellipsis?.popover,
              keepStyle: 1,
            }
          }}
          className={cn(styles.label, option.className)}
          onClick={event => {
            if (option.onClick) {
              option.onClick(event)
            } else {
              if (onClick) {
                onClick(event, option.value, option, options)
              }
              if (onChange && !hasChildren && !disabled && !option.href) {
                onChange(option.value, option, options)
              }
            }
          }}
        >
          {option.label}
        </Link>
      </div>
      {hasChildren && (
        <ExpandTransition value={expand}>
          {option.children.map((option, index) => (
            <ContentsItem
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
        </ExpandTransition>
      )}
    </Fragment>
  )
}

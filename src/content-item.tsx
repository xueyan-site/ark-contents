import React, { Fragment, useState } from 'react'
import cn from 'classnames'
import styles from './content-item.scss'
import { Link } from 'xueyan-react-link'
import { DirectionIcon } from 'xueyan-react-icon'
import { Shrink } from './shrink'
import type { 
  ContentOnChange, 
  ContentOnClick, 
  ContentOptionStruct, 
  ContentProOption 
} from './types'
import { saveShrink } from './utils'

export function ContentItem<T>({
  name,
  option,
  active,
  options,
  actives,
  shrinks,
  onClick,
  onChange,
  ...props
}: {
  name?: string
  disabled?: boolean
  option: ContentProOption<T>
  active?: ContentProOption<T>
  options: ContentOptionStruct<T>
  actives: ContentProOption<T>[]
  shrinks: Record<string, boolean>
  onClick?: ContentOnClick<T>
  onChange?: ContentOnChange<T>
}) {
  const [shrink, setShrink] = useState(shrinks[String(option.value)])
  const disabled = option.disabled || props.disabled
  const level = option.parents.length
  const isActive = active === option
  const inActive = actives[level] === option
  const hasChildren = option.children.length > 0

  return (
    <Fragment>
      <div
        className={cn(styles.xrcontentitem, {
          [styles.active]: inActive && (isActive || shrink),
          [styles.disabled]: disabled,
        })}
        style={{ 
          paddingLeft: level * 12
        }}
        onClick={hasChildren ? (() => {
          setShrink(!shrink)
          saveShrink(name, option, !shrink)
        }) : undefined}
      >
        <div className={styles.icon}>
          {hasChildren ? (
            <DirectionIcon direction={shrink ? 'right' : 'bottom'} />
          ) : (
            <div className={styles.line}/>
          )}
        </div>
        <Link
          {...option}
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
        <Shrink value={shrink}>
          {option.children.map((option, index) => (
            <ContentItem
              key={index}
              name={name}
              disabled={disabled}
              option={option}
              active={active}
              options={options}
              actives={actives}
              shrinks={shrinks}
              onClick={onClick}
              onChange={onChange}
            />
          ))}
        </Shrink>
      )}
    </Fragment>
  )
}

import React, { Fragment, useState } from 'react'
import cn from 'classnames'
import styles from './contents-item.scss'
import { LabelLink } from 'ark-link'
import { DirectionIcon } from 'sicon'
import { ExpandTransition } from 'ark-transition'
import { useContentsItemPreset } from './contents-item-preset'
import { saveExpand } from './utils'
import type { ContentsProOption  } from './types'

export function ContentsItem<T>(_props: {
  option: ContentsProOption<T>
}) {
  const preset = useContentsItemPreset()
  const option = { ...preset.option, ..._props.option }
  const props = { ...preset, ..._props, option }
  const { 
    active, 
    actives, 
    options,
    expands,
    getHref, 
    onClick, 
    onChange
  } = props
  const disabled = option.disabled || props.disabled
  const level = option.parents.length
  const isActive = active?.value === option.value
  const inActive = actives[level]?.value === option.value
  const hasChildren = option.children.length > 0
  const [expand, setExpand] = useState(
    inActive || expands[String(option.value)]
  )
  const href = hasChildren
    ? undefined
    : (option.href || (getHref && getHref(option, options)))

  return (
    <Fragment>
      <div
        className={cn(styles.xrcontentsitem, {
          [styles.active]: isActive || (inActive && !expand),
          [styles.disabled]: disabled,
        })}
        style={{
          paddingLeft: level * 12
        }}
        onClick={hasChildren ? (() => {
          setExpand(!expand)
          saveExpand(props.name, option, !expand)
        }) : undefined}
      >
        <div className={styles.icon}>
          {hasChildren ? (
            <DirectionIcon direction={expand ? 'bottom' : 'right'} />
          ) : (
            <div className={styles.line}/>
          )}
        </div>
        <LabelLink
          {...option}
          disabled={disabled}
          href={href}
          target={option.target || '_self'}
          className={cn(styles.label, option.className)}
          ellipsis={{
            ...option.ellipsis,
            popover: {
              ...option.ellipsis?.popover,
              keepStyle: 1,
            }
          }}
          onClick={event => {
            if (option.onClick) {
              return option.onClick(event)
            }
            if (onClick) {
              onClick(event, option.value, option, options)
            }
            if (onChange && !hasChildren) {
              onChange(option.value, option, options)
            }
          }}
        >
          {option.label}
        </LabelLink>
      </div>
      {hasChildren && (
        <ExpandTransition value={expand}>
          {option.children.map((option, index) => (
            <ContentsItem key={index} option={option} />
          ))}
        </ExpandTransition>
      )}
    </Fragment>
  )
}

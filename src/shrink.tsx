import React, { useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import { Transition } from 'xueyan-react-transition'
import styles from './shrink.scss'

export function Shrink({
  className,
  style,
  value,
  children
}: {
  className?: string
  style?: React.CSSProperties
  value?: boolean
  children?: React.ReactNode
}) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<React.CSSProperties['height']>()

  useEffect(() => {
    setHeight(rootRef.current?.scrollHeight)
  }, [])

  return (
    <Transition
      value={!value}
      initialKeep="initial"
      side={styles.side}
      initial={styles.side}
      active={styles.active}
      middleStyle={{
        height: rootRef.current
          ? rootRef.current.scrollHeight
          : height
      }}
    >
      <div
        ref={rootRef}
        style={style}
        className={cn(styles.xrshrink, className)}
      >
        {children}
      </div>
    </Transition>
  )
}

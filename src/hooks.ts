import { useMemo, useState, useEffect, useRef } from 'react'
import { parseContentsOptions, searchContentOptions } from './utils'
import type { ContentsOption, ContentsOptionStruct, ContentsProOption } from "./types"

export function useContentsOptions<T>(
  options?: ContentsOption<T>[] | ContentsOptionStruct<T>
): ContentsOptionStruct<T> {
  return useMemo(() => {
    if (!options || Array.isArray(options)) {
      return parseContentsOptions(options)
    } else {
      return options
    }
  }, [options])
}

export function useContentsActiveInfo<T>(
  value: T | undefined,
  options: ContentsOptionStruct<T>
) {
  return useMemo<[
    ContentsProOption<T> | undefined, 
    ContentsProOption<T>[]]
  >(() => {
    const active = value ? options.map.get(value) : undefined
    const actives = active ? [...active.parents, active] : []
    return [active, actives]
  }, [value, options])
}

export function useContentsKeyword<T>(
  value: T | undefined,
  options: ContentsOptionStruct<T>
): [
  ContentsOptionStruct<T>, 
  string | undefined,
  React.Dispatch<React.SetStateAction<string | undefined>>
] {
  const [keyword, setKeyword] = useState<string>()
  const [curOpts, setCurOpts] = useState<ContentsOptionStruct<T>>(options)
  const prevRef = useRef<any>()
  useEffect(() => {
    const prev = prevRef.current
    prevRef.current = options
    if (prev !== options) {
      setKeyword('')
      return setCurOpts(options)
    } else if (!keyword) {
      return setCurOpts(options)
    } else {
      const timer = setTimeout(() => {
        const o = searchContentOptions(value, keyword, options)
        setCurOpts(o.tree.length <= 0 ? options : o)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [value, keyword, options])
  return [curOpts, keyword, setKeyword]
}

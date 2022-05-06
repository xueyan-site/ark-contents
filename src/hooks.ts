import { useMemo, useState, useEffect } from 'react'
import { debounce } from 'lodash'
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

const setCurOptsDebounce = debounce((fn: () => void) => fn(), 500)

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
  useEffect(() => {
    setCurOptsDebounce(() => {
      if (!keyword) {
        setCurOpts(options)
      } else {
        const o = searchContentOptions(value, keyword, options)
        setCurOpts(o.tree.length <= 0 ? options : o)
      }
    })
  }, [keyword, options])
  return [curOpts, keyword, setKeyword]
}

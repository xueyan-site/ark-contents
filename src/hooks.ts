import { useMemo } from 'react'
import { parseContentsOptions } from './utils'
import { ContentsOption, ContentsOptionStruct, ContentsProOption } from "./types"

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

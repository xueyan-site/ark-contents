import { useMemo } from 'react'
import { parseContentOptions } from './utils'
import { ContentOption, ContentOptionStruct, ContentProOption } from "./types"

export function useContentOptions<T>(
  options?: ContentOption<T>[] | ContentOptionStruct<T>
): ContentOptionStruct<T> {
  return useMemo(() => {
    if (!options || Array.isArray(options)) {
      return parseContentOptions(options)
    } else {
      return options
    }
  }, [options])
}

export function useContentActiveInfo<T>(
  value: T | undefined,
  options: ContentOptionStruct<T>
) {
  return useMemo<[
    ContentProOption<T> | undefined, 
    ContentProOption<T>[]]
  >(() => {
    const active = value ? options.map.get(value) : undefined
    const actives = active ? [...active.parents, active] : []
    return [active, actives]
  }, [value, options])
}

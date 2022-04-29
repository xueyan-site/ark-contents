import { ContentOption, ContentProOption, ContentOptionStruct } from './types'

export function parseContentOptions<T >(
  options?: ContentOption<T>[]
): ContentOptionStruct<T> {
  const map: Map<T, ContentProOption<T>> = new Map()
  const leafs: ContentProOption<T>[] = []
  const parse = (
    list: ContentOption<T>[], 
    parents: ContentProOption<T>[]
  ): ContentProOption<T>[] => {
    const nodes: ContentProOption<T>[] = []
    list.forEach(item => {
      if (!map.get(item.value)) {
        const node: ContentProOption<T> = { 
          ...item,
          parents,
          children: []
        }
        map.set(node.value, node)
        nodes.push(node)
        if (item.children && item.children.length > 0) {
          node.children = parse(item.children, [...parents, node])
        } else {
          leafs.push(node)
        }
      }
    })
    return nodes
  }
  const tree = parse(options || [], [])
  leafs.reduce((prev, next) => {
    prev.next = next
    next.prev = prev
    return next
  })
  return {
    map,
    tree,
    leafs,
  }
}

function getShrinkKey(name: string = '') {
  return location.pathname + name
}

export function loadShrinks(
  name: string | undefined
): Record<string, boolean> {
  try {
    const key = getShrinkKey(name)
    const data = localStorage.getItem(key)
    if (data && typeof data === 'string') {
      return JSON.parse(data)
    } else {
      return {}
    }
  } catch (err) {
    console.log(err)
    return {}
  }
}

export function saveShrinks(
  name: string | undefined, 
  data?: Record<string, boolean>
): boolean {
  try {
    const key = getShrinkKey(name)
    if (data) {
      localStorage.setItem(key, JSON.stringify(data))
    } else {
      localStorage.removeItem(key)
    }
    return true
  } catch (err) {
    console.log(err)
    return false
  }
}

export function saveShrink<T>(
  name: string | undefined,
  option: ContentProOption<T>,
  shrink: boolean
) {
  const shrinks = loadShrinks(name)
  shrinks[String(option.value)] = shrink

  console.log(shrinks)
  return saveShrinks(name, shrinks)
}

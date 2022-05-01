import { ContentsOption, ContentsProOption, ContentsOptionStruct } from './types'

export function parseContentsOptions<T >(
  options?: ContentsOption<T>[]
): ContentsOptionStruct<T> {
  const map: Map<T, ContentsProOption<T>> = new Map()
  const leafs: ContentsProOption<T>[] = []
  const parse = (
    list: ContentsOption<T>[], 
    parents: ContentsProOption<T>[]
  ): ContentsProOption<T>[] => {
    const nodes: ContentsProOption<T>[] = []
    list.forEach(item => {
      if (!map.get(item.value)) {
        const node: ContentsProOption<T> = { 
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

function getExpandKey(name: string = '') {
  return location.pathname + name
}

export function loadExpands(
  name: string | undefined
): Record<string, boolean> {
  try {
    const key = getExpandKey(name)
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

export function saveExpands(
  name: string | undefined, 
  data?: Record<string, boolean>
): boolean {
  try {
    const key = getExpandKey(name)
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

export function saveExpand<T>(
  name: string | undefined,
  option: ContentsProOption<T>,
  expand: boolean
) {
  const expands = loadExpands(name)
  expands[String(option.value)] = expand

  console.log(expands)
  return saveExpands(name, expands)
}

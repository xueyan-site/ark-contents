import React, { Children, isValidElement } from 'react'
import { ContentsOption, ContentsProOption, ContentsOptionStruct } from './types'

function reactNodeToString(node: React.ReactNode) {
  const iterator = (text: string, node: React.ReactNode): string => {
    if (node) {
      if (typeof node === 'string') {
        return text + node
      }
      if (isValidElement(node)) {
        const nodes = Children.toArray(node.props.children)
        return nodes.reduce(iterator, text)
      }
    }
    return text
  }
  return Children.toArray(node).reduce(iterator, '')
}

export function parseContentsOptions<T>(
  options?: ContentsOption<T>[],
): ContentsOptionStruct<T> {
  const map: Map<T, ContentsProOption<T>> = new Map()
  const leafs: ContentsProOption<T>[] = []
  const iterator = (
    list: ContentsOption<T>[], 
    parents: ContentsProOption<T>[]
  ): ContentsProOption<T>[] => {
    const nodes: ContentsProOption<T>[] = []
    list.forEach(item => {
      if (!map.get(item.value)) {
        const node: ContentsProOption<T> = {
          ...item,
          parents,
          children: [],
          keywords: reactNodeToString(item.label) + item.value
        }
        map.set(node.value, node)
        nodes.push(node)
        if (item.children && item.children.length > 0) {
          node.children = iterator(item.children, [...parents, node])
        } else {
          leafs.push(node)
        }
      }
    })
    return nodes
  }
  const tree = iterator(options || [], [])
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

export function searchContentOptions<T>(
  value: T | undefined,
  keyword: string,
  contents: ContentsOptionStruct<T>
): ContentsOptionStruct<T> {
  const iterator = (list: ContentsProOption<T>[]): ContentsProOption<T>[] => {
    const nodes: ContentsProOption<T>[] = []
    list.forEach(item => {
      const node: ContentsProOption<T> = { ...item }
      if (
        item.value === value || 
        item.keywords.includes(keyword)
      ) {
        nodes.push(node)
      } else {
        const children = iterator(item.children)
        if (children.length > 0) {
          node.children = children
          nodes.push(node)
        }
      }
    })
    return nodes
  }
  return {
    ...contents,
    tree: iterator(contents.tree)
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
  return saveExpands(name, expands)
}

import { cloneDeep } from 'lodash/lang'

function mapIntoWithKeyPrefixInternal(children, result, prefix, func) {
  let escapedPrefix = ''
  // 如果prefix不为空，说明mapSingleChildIntoContext中判断func返回了数组，所以递归到了此方法
  if (prefix != null) {
    escapedPrefix = prefix + '/'
  }
  const traverseContext = getPooledTraverseContext(result, escapedPrefix, func)
  traverseAllChildren(children, mapSingleChildIntoContext, traverseContext)
  // console.log(traverseContext)
}

function mapSingleChildIntoContext(traverseContext, child, childKey) {
  const { result, func, keyPrefix } = traverseContext
  const mappedChildren = func.call(null, child)
  if (Array.isArray(mappedChildren)) {
    // 打平传入方法返回的数组
    mapIntoWithKeyPrefixInternal(mappedChildren, result, childKey, c => c)
  } else {
    // 所有数组打平完成后 在此结束
    // deep clone节点并修改为新的key值
    const newChild = cloneDeep(mappedChildren)
    newChild.key = keyPrefix + childKey
    result.push(newChild)
  }
}

function traverseAllChildrenImpl(
  children,
  nameSoFar,
  mapSingleChildIntoContext,
  traverseContext,
) {
  const type = typeof children
  let invokeCallBack = false
  switch (type) {
    case 'number':
    case 'string':
      invokeCallBack = true
      break
    case 'object':
      switch (children.$$typeof) {
        case 'TReact-element':
          invokeCallBack = true
      }
  }
  if (invokeCallBack) {
    mapSingleChildIntoContext(
      traverseContext,
      children,
      nameSoFar === '' ? '.0' : nameSoFar,
    )
    return 1
  }
  var nextNamePrefix = nameSoFar === '' ? '.' : nameSoFar + ':'

  // 打平传入的props.children的数组
  if (Array.isArray(children)) {
    for (let i = 0; i < children.length; i++) {
      const child = children[i]
      traverseAllChildrenImpl(
        child,
        nextNamePrefix + i,
        mapSingleChildIntoContext,
        traverseContext,
      )
    }
  }
}

function traverseAllChildren(
  children,
  mapSingleChildIntoContext,
  traverseContext,
) {
  if (children == null) {
    return 0
  }
  return traverseAllChildrenImpl(
    children,
    '',
    mapSingleChildIntoContext,
    traverseContext,
  )
}

function getPooledTraverseContext(mapResult, escapedPrefix, mapFunction) {
  return {
    result: mapResult,
    keyPrefix: escapedPrefix,
    func: mapFunction,
  }
}

function mapChidren(children, func) {
  if (children == null) {
    return children
  }
  const result = []
  // nameSoFar: null
  mapIntoWithKeyPrefixInternal(children, result, null, func)
  return result
}

export { mapChidren as map }

function mapIntoWithKeyPrefixInternal(children, result, func) {
  const traverseContext = getPooledTraverseContext(result, func)
  traverseAllChildren(children, mapSingleChildIntoContext, traverseContext)
  // console.log(traverseContext)
}

function mapSingleChildIntoContext(traverseContext, child) {
  const { result, func } = traverseContext
  const mappedChildren = func.call(null, child)
  if (!Array.isArray(mappedChildren)) {
    // 所有数组打平完成后 在此结束
    result.push(mappedChildren)
  } else {
    // 打平传入方法返回的数组
    mapIntoWithKeyPrefixInternal(mappedChildren, result, c => c)
  }
}

function traverseAllChildrenImpl(
  children,
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
    mapSingleChildIntoContext(traverseContext, children)
    return 1
  }
  // 打平传入的props.children的数组
  if (Array.isArray(children)) {
    for (let i = 0; i < children.length; i++) {
      const child = children[i]
      traverseAllChildrenImpl(child, mapSingleChildIntoContext, traverseContext)
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
    mapSingleChildIntoContext,
    traverseContext,
  )
}

function getPooledTraverseContext(mapResult, mapFunction) {
  return {
    result: mapResult,
    func: mapFunction,
  }
}

function mapChidren(children, func) {
  if (children == null) {
    return children
  }
  const result = []
  mapIntoWithKeyPrefixInternal(children, result, func)
  return result
}

export { mapChidren as map }

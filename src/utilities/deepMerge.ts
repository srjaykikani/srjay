function isObject(item: unknown): item is Record<string, unknown> {
  return typeof item === 'object' && item !== null && !Array.isArray(item)
}

export function deepMerge<T extends Record<string, unknown>, R extends Record<string, unknown>>(
  target: T,
  source: R,
): T & R {
  const output = { ...target } as T & R

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] })
        } else {
          ;(output as Record<string, unknown>)[key] = deepMerge(
            target[key] as Record<string, unknown>,
            source[key] as Record<string, unknown>,
          )
        }
      } else {
        Object.assign(output, { [key]: source[key] })
      }
    })
  }

  return output
}

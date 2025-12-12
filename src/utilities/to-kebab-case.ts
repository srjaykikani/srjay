export const toKebabCase = (value: string): string =>
  value
    ?.replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase()

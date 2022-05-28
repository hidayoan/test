export const getFullAddress = (item): string => {
  if (!item?.address) return ''

  return item.address?.includes(',')
    ? item.address
    : item.address + ', ' + item.city + ', ' + item.state + ' ' + item.zip_province + ', ' + item.country
}

export const exportDataToCSV = (fields: Array<string>, rows: Array<string | number>, filename: string): void => {
  let csvContent = 'data:text/csv;charset=utf-8,'
  csvContent += [fields.join(','), ...rows].join('\n').replace(/(^\[)|(\]$)/gm, '')

  const data = encodeURI(csvContent)
  const link = document.createElement('a')
  link.setAttribute('href', data)
  link.setAttribute('download', filename)
  link.click()
}

export const deepClone = (data) => {
  return JSON.parse(JSON.stringify(data))
}

/**
 * deplay
 * @param ms milisecond
 * @returns
 */
export const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const encodeString = (string: string, showCharacter = 4): string => {
  const lengthEncode = string.length - showCharacter
  return Array(lengthEncode)
    .fill(0)
    .map(() => '*')
    .concat(string.slice(-showCharacter))
    .join('')
}

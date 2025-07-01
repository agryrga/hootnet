export const parseId = (id, name = 'ID') => {
  const num = Number(id)
  if (!Number.isInteger(num) || num <= 0) {
    throw new Error(`Некорректный ${name}`)
  }
  return num
}

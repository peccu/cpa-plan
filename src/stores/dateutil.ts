export const format = (t: Date) =>
  t ? `${t.getFullYear()}-${t.getMonth() + 1}-${t.getDate()}` : ''

// app/refer/client-logic.ts
export const getOrigin = () => {
  return typeof window !== 'undefined' ? window.location.origin : ''
}

export const getLocalStorageItem = (key: string) => {
  return typeof localStorage !== 'undefined' ? localStorage.getItem(key) : null
}

export const setLocalStorageItem = (key: string, value: string) => {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(key, value)
  }
}
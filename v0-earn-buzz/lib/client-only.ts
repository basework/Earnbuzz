// lib/client-only.ts
export const getOrigin = (): string => {
  return typeof window !== "undefined" ? window.location.origin : ""
}
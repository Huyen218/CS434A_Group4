export function getAuth() {
  const auth = localStorage.getItem('auth')
  return auth ? JSON.parse(auth) : null
}
export function setAuth(data) {
  localStorage.setItem('auth', JSON.stringify(data))
  window.dispatchEvent(new Event('auth-change'))
}
export function clearAuth() {
  localStorage.removeItem('auth')
  window.dispatchEvent(new Event('auth-change'))
}
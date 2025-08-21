export const getToken = (token: 'accessToken' | 'refreshToken') => {
  return localStorage.getItem(token)
}

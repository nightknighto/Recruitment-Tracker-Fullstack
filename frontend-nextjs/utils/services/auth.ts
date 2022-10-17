export function authHeader() {
  const userToken = getStoredAuthToken();

  if (userToken) {
    return { Authorization: 'Bearer ' + userToken };
  } else {
    return {};
  }
}

export function getStoredAuthToken() {
  return localStorage.getItem('userToken') ? JSON.parse(localStorage.getItem('userToken')!) : undefined;
}

export function storeAuthToken(token: string) {
  localStorage.setItem('userToken', JSON.stringify(token));
}

export function clearStoredAuthToken() {
  localStorage.removeItem('userToken');
}
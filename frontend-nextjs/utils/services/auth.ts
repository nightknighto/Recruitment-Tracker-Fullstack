export function authHeader() {
  const userToken = getStoredAuthToken();

  if (userToken) {
    return { Authorization: 'Bearer ' + userToken };
  } else {
    return {};
  }
}

export function getStoredAuthToken() {
  return localStorage.getItem('user') ? (JSON.parse(localStorage.getItem('user')!) as userObject).userToken : null;
}

export function storeUserData(obj: userObject) {
  localStorage.setItem('user', JSON.stringify(obj));
}

export function clearUserData() {
  localStorage.removeItem('user');
}

export function getUserName() {
  return localStorage.getItem('user') ? (JSON.parse(localStorage.getItem('user')!) as userObject).name : null;
}

export function getUserRole() {
  return localStorage.getItem('user') ? (JSON.parse(localStorage.getItem('user')!) as userObject).role : null;
}

interface userObject {
  userToken: string;
  name: string;
  role: 'basic' | 'admin';
}
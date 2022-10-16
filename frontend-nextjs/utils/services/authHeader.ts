export default function authHeader() {
    const userToken = localStorage.getItem('userToken') ? JSON.parse(localStorage.getItem('userToken')!) : undefined;
  
    if (userToken) {
      return { Authorization: 'Bearer ' + userToken };
    } else {
      return {};
    }
  }
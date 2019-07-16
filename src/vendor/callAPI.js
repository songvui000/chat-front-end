import cookies from 'browser-cookies'
import { API_ROOT } from '../constant'
const config = () => {
  return {
    headers: {
      'access-token': cookies.get('access-token'),
      'client': cookies.get('client'),
      'uid': cookies.get('uid')
    }
  }
}


export const callAPIget = (url, data) => {
  let myHeader = config().headers
  myHeader['Content-Type'] = 'application/json'
  fetch(url, {
    ...myHeader,
    body: data
  })
}

export function callAPIpost (url, data = '') {
  url = `${API_ROOT}/${url}`
  let myHeader = config().headers
  myHeader['Content-Type'] = 'application/json'
  return fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: myHeader,
    body: data
  })
  .then(response => {
    return response
  })
  .then(response => {
    return response.json()
  })
}
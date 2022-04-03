import store from '@/store'
import axios from 'axios'

store.subscribe((mutation) => {
  if (mutation.type === 'SET_TOKEN') {
    const attribute = 'Authorization'
    axios.defaults.headers.common[attribute] = `Bearer ${mutation.payload}`
    if (mutation.payload) {
      localStorage.setItem('token', mutation.payload)
    } else {
      localStorage.removeItem('token')
    }
  }
})

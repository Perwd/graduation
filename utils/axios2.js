import axios from 'axios'


const request = axios.create({
  baseURL: 'www.uniav.com',
  timeout: 6000,
})
request.defaults.baseURL = 'https://www.uinav.com'

export default request

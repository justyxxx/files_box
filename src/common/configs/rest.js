import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://openproviderdrive.firebaseio.com/',
    withCredentials: false
})

export default instance

import axios from '@configs/rest'

export const apiGetNavigation = () => axios.get('/header.json')

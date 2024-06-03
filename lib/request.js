import axios from 'axios';

axios.interceptors.response.use(res => {
    return res.data
})

export const fetchRepoList = () => {
    return axios.get('https://api.github.com/repos/leeyw19837/vue-admin-template/branches')
}
import axios from "axios"

export const loginEu = (data) => {
    return axios.post(`${import.meta.env.VITE_BACKEND}/auth/eu/login`,data,{
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then(response => {
        return response.data
    }).catch(error => {
        return {error: error.response.data}
    })
}

export const loginAdm = (data) => {
    return axios.post(`${import.meta.env.VITE_BACKEND}/auth/admin/login`,data,{
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then(response => {
        return response.data
    }).catch(error => {
        return {error: error.response.data}
    })
}
import axios from "axios"

const env = import.meta.env

export const getEmployeesHrm = (pageNumber, id, token) => {
    return axios.post(`${env.VITE_BACKEND}/hrm/employees/${id}`,{
        pageNumber,
        limit: 15
    },{
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then(response => {
        return response.data;
    }).catch(error => {
        console.log(error);
        return {error: error}
    })
}
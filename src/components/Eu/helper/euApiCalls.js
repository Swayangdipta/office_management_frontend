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

export const addEmployeeHrm = (data,id,token,degnId) => {
    return axios.post(`${env.VITE_BACKEND}/hrm/employee/${id}/${degnId}`, data, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            }
            }).then(response => {
                return response.data;
            }).catch(error => {
                return error
            })
}

export const getDesignations = (id,token) => {
    return axios.post(`${env.VITE_BACKEND}/hrm/designations/${id}`,{},{
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

export const generatePay = (data,id,token) => {
    return axios.post(`${env.VITE_BACKEND}/hrm/paybill/gen/${id}`, data, {
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

export const getPayDetails = (data,id,token) => {
    return axios.post(`${env.VITE_BACKEND}/hrm/paybill/${id}`, data, {
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

export const getPaySlip = (data,id,token) => {
    return axios.post(`${env.VITE_BACKEND}/hrm/payslip/${id}`, data, {
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

export const postPayBill = (data,id,token) => {
    return axios.post(`${env.VITE_BACKEND}/hrm/paybill/post/${id}`, data, {
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
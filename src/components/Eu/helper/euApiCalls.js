import axios from "axios"

const env = import.meta.env

export const getEmployeesHrm = (pageNumber, id, token) => {
    return axios.post(`${env.VITE_BACKEND}/hrm/employees`,{
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
    return axios.post(`${env.VITE_BACKEND}/hrm/employee/cr/${degnId}`, data, {
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

export const editEmployeeHrm = (data,id,token,emp_id) => {
    return axios.put(`${env.VITE_BACKEND}/hrm/employee/${emp_id}`, data, {
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

export const deleteEmployeeHrm = (id,token,emp_id) => {    
    return axios.delete(`${env.VITE_BACKEND}/hrm/employee/${emp_id}`, {}, {
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
    return axios.post(`${env.VITE_BACKEND}/hrm/designations`,{},{
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
    return axios.post(`${env.VITE_BACKEND}/hrm/paybill/gen`, data, {
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
    return axios.post(`${env.VITE_BACKEND}/hrm/paybill`, data, {
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
    return axios.post(`${env.VITE_BACKEND}/hrm/payslip`, data, {
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
    return axios.post(`${env.VITE_BACKEND}/hrm/paybill/post`, data, {
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

export const postRemittances = (data,id,token) => {
    return axios.post(`${env.VITE_BACKEND}/hrm/remittance`, data, {
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

export const getEmployee = (id,token,emp_id) => {
    return axios.post(`${env.VITE_BACKEND}/hrm/employee/${emp_id}`, {}, {
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
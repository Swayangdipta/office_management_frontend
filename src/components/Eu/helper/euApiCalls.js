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

export const toggleActiveEmployeeHrm = (id,token,emp_id) => {
    return axios.put(`${env.VITE_BACKEND}/hrm/employee/status/${emp_id}`, {}, {
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

export const undoPayBill = (data,id,token) => {
    return axios.post(`${env.VITE_BACKEND}/hrm/paybill/undo`, data, {
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

export const getPreviewRemittance = (id,data,token) => {  
    return axios.post(`${env.VITE_BACKEND}/hrm/remittance/preview`, data, {
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    })
    .then(response => {
        return response.data; // Return the fetched data
    })
    .catch(error => {
        console.error(error); // Log the error for debugging
        return { error: error.message }; // Return the error message
    });
}

export const postRemittance = (data,id,token) => {
    return axios.post(`${env.VITE_BACKEND}/hrm/remittance`, data, {
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

export const undoRemittance = (data,id,token) => {
    return axios.post(`${env.VITE_BACKEND}/hrm/remittance/undo`, data, {
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

export const getEmployeeMasterReport = (id, token) => {
    return axios.post(`${env.VITE_BACKEND}/hrm/reports/employee`, {}, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then(response => {
        return response.data;
    }).catch(error => {
        return error;
    });
};

export const getPayGenerationReport = (id, token) => {
    return axios.post(`${env.VITE_BACKEND}/hrm/reports/paygeneration`, {}, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then(response => {
        return response.data;
    }).catch(error => {
        return error;
    });
};

export const getRemittancePostingsReport = (id, token) => {
    return axios.post(`${env.VITE_BACKEND}/hrm/reports/remittances`, {}, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then(response => {
        return response.data;
    }).catch(error => {
        return error;
    });
};

export const getPreviwPayGenHrm = (month, id, token) => {
    return axios.post(`${env.VITE_BACKEND}/hrm/pay-preview`,{
        month
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

export const postPayFinalization = (action,month, id, token) => {
    return axios.post(`${env.VITE_BACKEND}/hrm/pay-finalize`,{
        action,
        month
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

export const getAccountingHeads = (id, token) => {  
    return axios.post(`${env.VITE_BACKEND}/hrm/accounting-head`, {}, {
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    })
    .then(response => {
        return response.data; // Return the fetched data
    })
    .catch(error => {
        console.error(error); // Log the error for debugging
        return { error: error.message }; // Return the error message
    });
}

export const getBanks = (id, token) => {  
    return axios.post(`${env.VITE_BACKEND}/hrm/banks`, {}, {
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    })
    .then(response => {
        return response.data; // Return the fetched data
    })
    .catch(error => {
        console.error(error); // Log the error for debugging
        return { error: error.message }; // Return the error message
    });
}
export const getPreviewBill = (id,data,token) => {  
    return axios.post(`${env.VITE_BACKEND}/hrm/paybill/preview`, data, {
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    })
    .then(response => {
        return response.data; // Return the fetched data
    })
    .catch(error => {
        console.error(error); // Log the error for debugging
        return { error: error.message }; // Return the error message
    });
}
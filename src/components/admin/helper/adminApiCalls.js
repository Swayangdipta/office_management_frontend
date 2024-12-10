import axios from "axios";

const env = import.meta.env

export const getAssetCategoriesAdmin = (id,token) => {
    try {
        return axios.get(`${env.VITE_BACKEND}/admin/asset-categories/${id}`,{},{
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                }
        }).then(response => {
            return response.data;
        }).catch(error => {
            console.log(error);
            return error
        })        
      } catch (error) {
        console.error('Error fetching categories', error);
      }
}

export const createAssetCategoryAdmin = (id,token,data) => {
    try {
        return axios.post(`${env.VITE_BACKEND}/admin/asset-categories/${id}`,data,{
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                }
        }).then(response => {
            return response.data;
        }).catch(error => {
            console.log(error);
            return error
        })        
      } catch (error) {
        console.error('Error creating asset categories', error);
      }
}

export const deleteAssetCategoryAdmin = (id,token,categoryId) => {
    try {
        return axios.delete(`${env.VITE_BACKEND}/admin/asset-categories/${categoryId}/${id}`,{},{
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                }
        }).then(response => {
            return response.data;
        }).catch(error => {
            console.log(error);
            return error
        })        
      } catch (error) {
        console.error('Error creating asset categories', error);
      }
}

export const editAssetCategoryAdmin = (id,token,data,categoryId) => {
    try {
        return axios.put(`${env.VITE_BACKEND}/admin/asset-categories/${categoryId}/${id}`,data,{
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                }
        }).then(response => {
            return response.data;
        }).catch(error => {
            console.log(error);
            return error
        })        
      } catch (error) {
        console.error('Error creating asset categories', error);
      }
}

// Asset Types
export const getAssetTypesAdmin = (id,token) => {
    try {
        return axios.get(`${env.VITE_BACKEND}/admin/asset-types/${id}`,{},{
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                }
        }).then(response => {
            return response.data;
        }).catch(error => {
            console.log(error);
            return error
        })        
      } catch (error) {
        console.error('Error fetching types', error);
      }
}

export const createAssetTypeAdmin = (id,token,data) => {
    try {
        return axios.post(`${env.VITE_BACKEND}/admin/asset-types/${id}`,data,{
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                }
        }).then(response => {
            return response.data;
        }).catch(error => {
            console.log(error);
            return error
        })        
      } catch (error) {
        console.error('Error creating asset types', error);
      }
}

export const deleteAssetTypeAdmin = (id,token,categoryId) => {
    try {
        return axios.delete(`${env.VITE_BACKEND}/admin/asset-types/${categoryId}/${id}`,{},{
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                }
        }).then(response => {
            return response.data;
        }).catch(error => {
            console.log(error);
            return error
        })        
      } catch (error) {
        console.error('Error delete asset types', error);
      }
}

export const editAssetTypeAdmin = (id,token,data,categoryId) => {
    try {
        return axios.put(`${env.VITE_BACKEND}/admin/asset-types/${categoryId}/${id}`,data,{
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                }
        }).then(response => {
            return response.data;
        }).catch(error => {
            console.log(error);
            return error
        })        
      } catch (error) {
        console.error('Error creating asset categories', error);
      }
}

// Stock Types
export const getStockTypesAdmin = (id,token) => {
    try {
        return axios.get(`${env.VITE_BACKEND}/admin/stock-types/${id}`,{},{
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                }
        }).then(response => {
            return response.data;
        }).catch(error => {
            console.log(error);
            return error
        })        
      } catch (error) {
        console.error('Error fetching types', error);
      }
}

export const createStockTypeAdmin = (id,token,data) => {
    try {
        return axios.post(`${env.VITE_BACKEND}/admin/stock-types/${id}`,data,{
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                }
        }).then(response => {
            return response.data;
        }).catch(error => {
            console.log(error);
            return error
        })        
      } catch (error) {
        console.error('Error creating asset types', error);
      }
}

export const deleteStockTypeAdmin = (id,token,categoryId) => {
    try {
        return axios.delete(`${env.VITE_BACKEND}/admin/stock-types/${categoryId}/${id}`,{},{
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                }
        }).then(response => {
            return response.data;
        }).catch(error => {
            console.log(error);
            return error
        })        
      } catch (error) {
        console.error('Error delete asset types', error);
      }
}

export const editStockTypeAdmin = (id,token,data,categoryId) => {
    try {
        return axios.put(`${env.VITE_BACKEND}/admin/stock-types/${categoryId}/${id}`,data,{
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                }
        }).then(response => {
            return response.data;
        }).catch(error => {
            console.log(error);
            return error
        })        
      } catch (error) {
        console.error('Error creating asset categories', error);
      }
}

// Stock Types
export const getDesignations = (id,token) => {
    try {
        return axios.get(`${env.VITE_BACKEND}/admin/degn/${id}`,{},{
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                }
        }).then(response => {
            return response.data;
        }).catch(error => {
            console.log(error);
            return error
        })        
      } catch (error) {
        console.error('Error fetching types', error);
      }
}

export const createDesignation = (id,token,data) => {
    try {
        return axios.post(`${env.VITE_BACKEND}/admin/degn/${id}`,data,{
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                }
        }).then(response => {
            return response.data;
        }).catch(error => {
            console.log(error);
            return error
        })        
      } catch (error) {
        console.error('Error creating asset types', error);
      }
}

export const deleteDesignation = (id,token,categoryId) => {
    try {
        return axios.delete(`${env.VITE_BACKEND}/admin/degn/${categoryId}/${id}`,{},{
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                }
        }).then(response => {
            return response.data;
        }).catch(error => {
            console.log(error);
            return error
        })        
      } catch (error) {
        console.error('Error delete asset types', error);
      }
}

export const editDesignation = (id,token,data,categoryId) => {
    try {
        return axios.put(`${env.VITE_BACKEND}/admin/degn/${categoryId}/${id}`,data,{
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                }
        }).then(response => {
            return response.data;
        }).catch(error => {
            console.log(error);
            return error
        })        
      } catch (error) {
        console.error('Error creating asset categories', error);
      }
}

export const createAccountHead = async (userId, token, data) => {
    try {
        return axios.post(`${env.VITE_BACKEND}/admin/accounting-head/create/${userId}`, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        }).then(response => {
            return response.data;
        }).catch(error => {
            console.log(error);
            return error;
        });
    } catch (error) {
        console.error('Error creating account head', error);
    }
};

export const updateAccountHead = async (userId, token, accountHeadId, data) => {
    try {
        return axios.put(`${env.VITE_BACKEND}/admin/accounting-head/${accountHeadId}/${userId}`, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        }).then(response => {
            return response.data;
        }).catch(error => {
            console.log(error);
            return error;
        });
    } catch (error) {
        console.error('Error updating account head', error);
    }
};

export const getAccountHeads = async (userId, token) => {
    try {
        return axios.post(`${env.VITE_BACKEND}/admin/accounting-head/${userId}`,{}, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
            },
        }).then(response => {
            return response.data;
        }).catch(error => {
            console.log(error);
            return error;
        });
    } catch (error) {
        console.error('Error fetching account heads', error);
    }
};

export const deleteAccountHead = async (userId, token, accountHeadId) => {
    try {
        return axios.delete(`${env.VITE_BACKEND}/admin/accounting-head/${accountHeadId}/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
            },
        }).then(response => {
            return response.data;
        }).catch(error => {
            console.log(error);
            return error;
        });
    } catch (error) {
        console.error('Error deleting account head', error);
    }
};

export const getAssets = (id, token) => {
    return axios.get(`${env.VITE_BACKEND}/admin/reports/asset-details/${id}`, {}, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    })
    .then(response => {
        return response.data; // Return the fetched data
    })
    .catch(error => {
        console.error(error); // Log the error for debugging
        return { error: error.message }; // Return the error message
    });
};

export const getStocks = (id, token) => {
    return axios.get(`${env.VITE_BACKEND}/admin/reports/stock-details/${id}`, {}, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    })
    .then(response => {
        return response.data; // Return the fetched data
    })
    .catch(error => {
        console.error(error); // Log the error for debugging
        return { error: error.message }; // Return the error message
    });
}

export const getAccountingHeads = (id, token) => {  
    return axios.post(`${env.VITE_BACKEND}/admin/accounting-head/${id}`, {}, {
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

export const getEndUsers = (id,token) => {
    try {
        return axios.post(`${env.VITE_BACKEND}/admin/eu/${id}`,{},{
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                }
        }).then(response => {
            return response.data;
        }).catch(error => {
            console.log(error);
            return error
        })        
      } catch (error) {
        console.error('Error fetching types', error);
      }
}

export const createEndUsers = (id,token,data) => {
    try {
        return axios.post(`${env.VITE_BACKEND}/admin/eu/cr/${id}`,data,{
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                }
        }).then(response => {
            return response.data;
        }).catch(error => {
            console.log(error);
            return error
        })        
      } catch (error) {
        console.error('Error fetching types', error);
      }
}

// HRM Calls
export const getEmployeesAdm = (pageNumber, id, token) => {
    return axios.post(`${env.VITE_BACKEND}/admin/employees/${id}`,{
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

export const addEmployeeAdm = (data,id,token,degnId) => {
    return axios.post(`${env.VITE_BACKEND}/admin/employee/${id}/${degnId}`, data, {
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

export const editEmployeeAdm = (data,id,token,emp_id) => {
    return axios.put(`${env.VITE_BACKEND}/admin/employee/${emp_id}/${id}`, data, {
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

export const deleteEmployeeAdm = (id,token,emp_id) => {    
    return axios.delete(`${env.VITE_BACKEND}/admin/employee/${emp_id}/${id}`, {}, {
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

export const getDesignationsAdm = (id,token) => {
    return axios.post(`${env.VITE_BACKEND}/admin/designations/${id}`,{},{
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

export const generatePayAdm = (data,id,token) => {
    return axios.post(`${env.VITE_BACKEND}/admin/paybill/gen/${id}`, data, {
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

export const getPayDetailsAdm = (data,id,token) => {
    return axios.post(`${env.VITE_BACKEND}/admin/paybill/${id}`, data, {
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

export const getPaySlipAdm = (data,id,token) => {
    return axios.post(`${env.VITE_BACKEND}/admin/payslip/${id}`, data, {
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

export const postPayBillAdm = (data,id,token) => {
    return axios.post(`${env.VITE_BACKEND}/admin/paybill/post/${id}`, data, {
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

export const postRemittancesAdm = (data,id,token) => {
    return axios.post(`${env.VITE_BACKEND}/admin/remittance/${id}`, data, {
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

export const getEmployeeAdm = (id,token,emp_id) => {
    return axios.post(`${env.VITE_BACKEND}/admin/employee/${emp_id}/${id}`, {}, {
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

export const getTotals = (id,token) => {
    return axios.post(`${env.VITE_BACKEND}/admin/totals/${id}`, {}, {
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
import axios from "axios";

const env = import.meta.env

export const getParties = (userId,token) => {
    try {
        return axios.post(`${env.VITE_BACKEND}/am/party-master/all`,{},{
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
        console.error('Error fetching parties', error);
      }
}

export const postParty = (userId,token,data) => {
    try {
        return axios.post(`${env.VITE_BACKEND}/am/party-master/create`,data,{
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
        console.error('Error creating party', error);
      }
}

export const updateParty = (userId,token,data,partyId) => {
    try {
        return axios.put(`${env.VITE_BACKEND}/am/party-master/${partyId}`,data,{
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
        console.error('Error updating party', error);
      }
}

export const deleteParty = (userId,token,partyId) => {
    try {
        return axios.delete(`${env.VITE_BACKEND}/am/party-master/${partyId}`,{},{
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
        console.error('Error deleting party', error);
      }
}

export const createVoucher = (userId,token,data) => {
    try {
        return axios.post(`${env.VITE_BACKEND}/am/voucher/create`,data,{
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
        console.error('Error deleting party', error);
      }
}

export const getAllVouchers = (userId,token) => {
    try {
        return axios.post(`${env.VITE_BACKEND}/am/voucher`,{},{
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
        console.error('Error getting vouchers', error);
      }
}

export const updateVoucher = (userId,token,voucherId,data) => {
    try {
        return axios.put(`${env.VITE_BACKEND}/am/voucher/${voucherId}`,data,{
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
        console.error('Error updating voucher', error);
      }
}

export const deleteVoucher = (userId,token,voucherId) => {
    try {
        return axios.put(`${env.VITE_BACKEND}/am/voucher/${voucherId}`,{},{
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
        console.error('Error deleting voucher', error);
      }
}

export const getAllAccountHeadAM = (userId,token) => {
    try {
        return axios.post(`${env.VITE_BACKEND}/am/voucher/ah`,{},{
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
        console.error('Error deleting party', error);
      }
}

export const getBankTransactions = (userId,token) => {
    try {
        return axios.post(`${env.VITE_BACKEND}/am/bank-reconciliation/statement`,{},{
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
        console.error('Error deleting party', error);
      }
}

export const reconcileTransaction = (userId,token,transactionId) => {
    try {
        return axios.post(`${env.VITE_BACKEND}/am/bank-reconciliation/reconcile/${transactionId}`,{},{
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
        console.error('Error deleting party', error);
      }
}

export const createBankTransaction = (userId,token,data) => {
    try {
        return axios.post(`${env.VITE_BACKEND}/am/bank-reconciliation/create`,data,{
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
        console.error('Error deleting party', error);
      }
}
export const closeMonth = (userId,token) => {
    try {
        return axios.post(`${env.VITE_BACKEND}/am/process/close-month`,{},{
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
        console.error('Error deleting party', error);
      }
}

export const closeYear = (userId,token) => {
    try {
        return axios.post(`${env.VITE_BACKEND}/am/process/close-year`,{},{
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
        console.error('Error deleting party', error);
      }
}

const apiCall = async (url, token, params = {}) => {
    try {
      const response = await axios.post(`${env.VITE_BACKEND}${url}`,params, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
      return { error: true, message: error.message };
    }
  };

  // Accounting Module Reports
  export const getTrialBalanceReport = (token, params) => apiCall('/am/reports/trial-balance', token, params);
  export const getProfitLossReport = (token, params) => apiCall('/am/reports/profit-loss', token, params);
  export const getBalanceSheetReport = (token, params) => apiCall('/am/reports/balance-sheet', token, params);
  export const getLedgersReport = (token, params) => apiCall('/am/reports/ledgers', token, params);
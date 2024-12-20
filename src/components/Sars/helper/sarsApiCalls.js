import axios from "axios"

const env = import.meta.env

export const getAssetTypesSars = (id, token) => {
    return axios.get(`${env.VITE_BACKEND}/sars/asset-type`,{},{
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

export const createAssetDetail = (id, token, data) => {
    return axios.post(`${env.VITE_BACKEND}/sars/asset-details`,data,{
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

export const getAssetsSars = (id, token) => {
    return axios.get(`${env.VITE_BACKEND}/sars/asset-details`,{},{
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

export const updateAssetDetail = (id, token, data, assetId) => {
    return axios.put(`${env.VITE_BACKEND}/sars/asset-details/${assetId}`,data,{
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

export const deleteAssetDetail = (id, token, assetId) => {
    return axios.delete(`${env.VITE_BACKEND}/sars/asset-details/${assetId}`,{},{
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

export const getStockTypesSars = (id, token) => {
    return axios.get(`${env.VITE_BACKEND}/sars/stock-type`,{},{
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

export const createStockDetail = (id, token, data) => {
    return axios.post(`${env.VITE_BACKEND}/sars/stock-details`,data,{
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

export const getStocksSars = (id, token) => {
    return axios.get(`${env.VITE_BACKEND}/sars/stock-details`,{},{
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

export const updateStockDetail = (id, token, data, assetId) => {
    return axios.put(`${env.VITE_BACKEND}/sars/stock-details/${assetId}`,data,{
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

export const deleteStockDetail = (id, token, assetId) => {
    return axios.delete(`${env.VITE_BACKEND}/sars/stock-details/${assetId}`,{},{
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

export const getAssetCategoriesSars = (id, token) => {
    return axios.get(`${env.VITE_BACKEND}/sars/reports/asset-categories`, {}, {
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

export const getAssetDetailsSars = (id, token) => {
    return axios.get(`${env.VITE_BACKEND}/sars/reports/asset-details`, {}, {
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

export const getStockDetailsSars = (id, token) => {
    return axios.get(`${env.VITE_BACKEND}/sars/reports/stock-details`, {}, {
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

export const getStockTypeesSars = (id, token) => {
    return axios.get(`${env.VITE_BACKEND}/sars/reports/stock-types`, {}, {
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

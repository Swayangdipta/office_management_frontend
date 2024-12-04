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
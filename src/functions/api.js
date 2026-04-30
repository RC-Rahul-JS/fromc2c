import axios from 'axios';
import Cookies from 'js-cookie'; // Ensure you have js-cookie installed
import { useLoader } from '../context/LoaderContext';

const apiClient = axios.create({
  // baseURL: 'http://127.0.0.1:5000',
  // baseURL: 'https://0f8d020f325d.ngrok-free.app', 
  // baseURL: 'https://api.care2connect.in'
  baseURL: 'https://25c8-2405-201-3001-983c-8a9-c4bd-d89c-5de9.ngrok-free.app'
});
 // or sessionStorage.getItem('token')

const useApi = () => {
  const { showLoader, hideLoader } = useLoader();
// POST request
 const postapi = async (apiroute, data) => {
showLoader();

  try {
    const token = Cookies.get('token'); // or sessionStorage.getItem('token')
    const response = await apiClient.post(apiroute, data, {
      headers: {
        "ngrok-skip-browser-warning": true,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token || ''}`,
      },
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.log(error)
    const message = error.response?.data?.error || error.message || 'An error occurred';
    throw message
   }finally {
    hideLoader();
  }
};

 const getapi = async (apiroute) => {
  // showLoader();
  try {
    const token = Cookies.get('token');
    const response = await apiClient.get(apiroute, {
      headers: {
        "ngrok-skip-browser-warning": true,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token || ''}`,
      }
    });
    return { success: true, data: response.data };
  } catch (error) {
    const message = error.response?.data?.error || error.message || 'Failed to fetch data';
    throw message
  }finally {
    // hideLoader();
  }
};

 const uploadImage = async (img) => {
showLoader();
  try {
    const formData = new FormData();
    formData.append("file", img);
    const token = Cookies.get('token'); // or sessionStorage.getItem('token')
    const response = await apiClient.post('/upload',formData, {
      headers: {
        "ngrok-skip-browser-warning": true,
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token || ''}`,
      },
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.log(error)
    const message = error.response?.data?.error || error.message || 'An error occurred';
    throw message
   }finally {
    hideLoader();
  }
};
  return { postapi,getapi,uploadImage};
};

export default useApi;



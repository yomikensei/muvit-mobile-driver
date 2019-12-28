import Axios from 'axios';
import apiConfig from './config';
import { loadState } from '../../localStorage';

const api = async payload => {
  const result = await loadState();
  const token = (!!result && result.token) || '';
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return Axios.request({
    baseURL: apiConfig.url,
    headers,
    ...payload,
  });
};

export default api;

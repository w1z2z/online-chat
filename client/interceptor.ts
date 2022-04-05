import axios, {AxiosResponse} from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:5001'
})

api.interceptors.response.use((res: AxiosResponse) => {
  return res;
}, async (error: { response: { status: number; }; config: { headers: { Authorization: string; }; }; }) => {
  if (error.response.status == 401) {
    let newAccessToken = '';
    try {
      const response = await axios.get(`http://localhost:5001/authorization/refresh`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('refreshToken') || ''}`
        }
      })
      const tokens: any = response.data
      if (response.data[0] == 403) {
        localStorage.clear()
        return
      } else {
        localStorage.setItem('accessToken', tokens[0] || '');
        localStorage.setItem('refreshToken', tokens[1] || '');
        newAccessToken = tokens[0]
        error.config.headers.Authorization = `Bearer ${newAccessToken}`
        return api(error.config);
      }
    } catch (e) {
      localStorage.clear()
      return
    }
  }
  return error;
})

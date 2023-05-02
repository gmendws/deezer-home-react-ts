import axios from "axios";

const api = axios.create({
    baseURL: 'http://18.230.25.218:3000',
});

export default api
import axios, { AxiosError, AxiosResponse } from "axios";
import { request } from "http";
import { toast } from "react-toastify";
import { AboutDescription } from "../models/about";
import { ShortURL, ShortURLDto } from "../models/urls";
import { User, UserFormValues } from "../models/user";
import { store } from "../stores/store";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api'

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config;
})
type MyErrorResponse = {
    errors: { data: string }[]
}
axios.interceptors.response.use(async response => {
    await sleep(200);
    return response;
}, (error: AxiosError<MyErrorResponse>) => {
    const { data, status } = error.response!;
    switch (status) {
        case 400:
            if (data.errors) {
                const modalStateErrors = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modalStateErrors.push(data.errors[key])
                    }
                }
                throw modalStateErrors.flat();
            }
            break;
        case 401:
            toast.error('unauthorised');
            break;
        case 404:
            toast.error('not found');
            break;
        case 500:
            toast.error('server error');
            break;

    }
    return Promise.reject(error);
})

const responsBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responsBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responsBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responsBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responsBody)
}

const Account = {
    current: () => requests.get<User>('/User'),
    login: (user: UserFormValues) => requests.post<User>('/User/login', user),
    register: (user: UserFormValues) => requests.post<User>('/User/register', user)
}

const Url = {
    list: () => requests.get<ShortURL[]>('/ShortURL'),
    details: (id: number) => requests.get<ShortURL>(`/ShortURL/${id}`),
    create: (job: ShortURLDto) => requests.post<void>('/ShortURL', job),
    delete: (id: number) => requests.del<void>(`/ShortURL/${id}`)
}

const About = {
    get: () => requests.get<AboutDescription>('/About'),
    update: (aboutDescription: AboutDescription) => requests.put<void>(`/about/${aboutDescription.id}`, aboutDescription)
}

const agent = {
    Account,
    Url,
    About
}

export default agent;
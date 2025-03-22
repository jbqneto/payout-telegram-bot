import axios, { Axios } from "axios";

export abstract class ApiService {
    protected readonly client: Axios;

    public constructor(baseUrl: string) {
        this.client = axios.create({
            baseURL: baseUrl + '/api'
        });
    }
}
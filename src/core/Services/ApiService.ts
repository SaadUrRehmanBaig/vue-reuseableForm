import { AxiosResponse, AxiosRequestConfig } from "axios";
import axios, { AxiosInstance } from "axios";

class ApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'http://localhost:1032/api'
    });
  }

  public post(resource: string, data: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.axiosInstance.post(resource, data);
  }
}

export default new ApiService();
import axios from "axios";

const URL = import.meta.env.VITE_VERCEL_SERVER;

const axiosInstance = axios.create({
  baseURL: URL,
});

// interface Entity {
//   id: number;
// }

class HttpService<TInput, TOutput> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = (id?: number): Promise<TOutput[]> => {
    const url = id ? `${this.endpoint}?id=${id}` : this.endpoint;
    return axiosInstance.get<TOutput[]>(url).then((res) => res.data);
  };

  delete = (id: number) => {
    return axiosInstance.delete(this.endpoint + "/" + id);
  };

  create = (entity: TInput): Promise<TOutput> => {
    return axiosInstance
      .post(this.endpoint, entity, {
        maxContentLength: 50 * 1024 * 1024,
      })
      .then((res) => res.data);
  };

  update = (id: number, body: string) => {
    return axiosInstance
      .patch(this.endpoint + "?id=" + id, body, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => res.data);
  };
}

export default HttpService;

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

  getAll = (id?: number, dataQuery?: string): Promise<TOutput[]> => {
    // Create an object with query parameters
    const queryParams = { id, dataQuery };

    const params = new URLSearchParams(
      Object.entries(queryParams)
        .filter(([_, value]) => value !== undefined)
        .map(([key, value]) => [key, String(value)])
    );

    const url = params.toString()
      ? `${this.endpoint}?${params.toString()}`
      : this.endpoint;

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

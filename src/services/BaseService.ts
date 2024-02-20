import axiosInstance from "@/lib/axios";

export type PaginatedResponse<T> = {
  rows: T[];
  total: number;
  page: number;
  per_page: number;
};
export class BaseService<T> {
  protected readonly axiosInstance = axiosInstance;
  constructor(private readonly serviceName: string) {}

  public async get(id: string): Promise<T> {
    const response = await this.axiosInstance.get<T>(`${this.serviceName}/${id}`);
    return response.data;
  }

  public async getAll(page = 0, perPage = 10): Promise<PaginatedResponse<T>> {
    const response = await this.axiosInstance.get<PaginatedResponse<T>>(
      this.serviceName,
      {
        params: {
          page,
          per_page: perPage,
        },
      },
    );
    return response.data;
  }

  public async create(data: Partial<T>): Promise<T> {
    const response = await this.axiosInstance.post<T>(this.serviceName, data);
    return response.data;
  }

  public async update(id: string, data: Partial<T>): Promise<T> {
    const response = await this.axiosInstance.put<T>(
      `${this.serviceName}/${id}`,
      data,
    );
    return response.data;
  }

  public async delete(id: string): Promise<void> {
    await this.axiosInstance.delete(`${this.serviceName}/${id}`);
  }
}

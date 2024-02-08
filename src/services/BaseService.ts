import axiosInstance from "@/lib/axios";

export class BaseService<T> {
  constructor(private readonly serviceName: string) {}

  public async get(id: string): Promise<T> {
    const response = await axiosInstance.get<T>(`${this.serviceName}/${id}`);
    return response.data;
  }

  public async getAll(): Promise<T[]> {
    const response = await axiosInstance.get<T[]>(this.serviceName);
    return response.data;
  }

  public async create(data: Partial<T>): Promise<T> {
    const response = await axiosInstance.post<T>(this.serviceName, data);
    return response.data;
  }

  public async update(id: string, data: Partial<T>): Promise<T> {
    const response = await axiosInstance.put<T>(
      `${this.serviceName}/${id}`,
      data,
    );
    return response.data;
  }

  public async delete(id: string): Promise<void> {
    await axiosInstance.delete(`${this.serviceName}/${id}`);
  }
}

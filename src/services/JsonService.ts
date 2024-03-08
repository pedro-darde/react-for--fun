import { JsonList } from "@/types/JsonList";
import { BaseService } from "./BaseService";

export class JsonService<T> extends BaseService<JsonList> {

  constructor(private readonly type: string) {
    super('json')
  }

  async getJson() {
    const { data } = await this.axiosInstance.get<JsonList[]>(`json/${this.type}`)
    return data;
  }
}
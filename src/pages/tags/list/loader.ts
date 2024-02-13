import { TagService } from "@/services/TagService";

export async function loader() {
  const tags = await TagService.getAll();
  return {
    tags,
  };
}

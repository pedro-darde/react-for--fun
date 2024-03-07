import { DataTable } from "@/components/datatable/DataTable";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import ConfirmDialog from "@/components/dialog/ConfirmDialog";
import { Tag } from "@/types/Tag";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

import CreateTagComponent from "@/components/tags/CreateTag";
import { TagService } from "@/services/TagService";
export default function ListTagsPage() {
  const [tags, setTags] = useState<{
    rows: Tag[];
    total: number;
    per_page: number;
    page: number;
  }>({
    rows: [],
    total: 0,
    per_page: 0,
    page: 0,
  });

  const removeTag = (id: string) => {
    TagService.delete(id);
    fetchTags();
  };
  const [modalCreateTag, setModalCreateTag] = useState(false);

  const fetchTags = async (page = 0, perPage = 10) => {
    const response = await TagService.getAll(page, perPage);
    setTags(response);
  };
  useEffect(() => {
    fetchTags();
  }, []);

  const columns: ColumnDef<Tag>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "active",
      header: "Active",
      cell({ row: { original } }) {
        return <p>{original.active ? "Yes" : "No"}</p>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <div className="flex gap-2">
            <Button variant="outline">
              <Pencil1Icon width={20} height={20} />
            </Button>
            <ConfirmDialog
              title="Remover"
              message="Are you shure?  By accpeting this the tag will be removed from the system."
              onCancel={() => console.log("cancelou")}
              onConfirm={() => removeTag(row.original.id!)}
              trigger={
                <Button variant="outline">
                  <TrashIcon color="tomato" width={20} height={20} />
                </Button>
              }
            />
          </div>
        );
      },
    },
  ];

  const createTag = (data: {
    name: string;
    description: string;
    active: boolean;
  }) => {
    TagService.create(data);
    setModalCreateTag(false);
    toast.success("Tag created successfully");
    fetchTags();
  };

  return (
    <div className="container  m-5  py-10">
      <div className="flex justify-between">
        <h1 className="mb-5 text-3xl font-bold">Tags</h1>
        <Button variant="default" onClick={() => setModalCreateTag(true)}>
          Create Tag +{" "}
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={tags}
        handleNextPage={(page, perPage) => {
          console.log(page, perPage);
          fetchTags(page, perPage);
        }}
      />
      <Dialog
        open={modalCreateTag}
        onOpenChange={(value) => setModalCreateTag(value)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create tag</DialogTitle>
            <DialogDescription>Create a new tag.</DialogDescription>
            <CreateTagComponent onSubmit={createTag} />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

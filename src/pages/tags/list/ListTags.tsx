import { DataTable } from "@/components/datatable/DataTable";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { useLoaderData } from "react-router-dom";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import ConfirmDialog from "@/components/dialog/ConfirmDialog";
export default function ListTagsPage() {
  const { tags } = useLoaderData();

  const removeTag = (id: string) => {};

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
              message="Are you shure ? \n By accpeting this the tag will be removed from the system?"
              onCancel={() => console.log("cancelou")}
              onConfirm={() => console.log("confirmou")}
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
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between">
        <h1 className="mb-5 text-3xl font-bold">Tags</h1>
        <Button variant="default">Create Tag + </Button>
      </div>
      <DataTable columns={columns} data={tags} />
    </div>
  );
}

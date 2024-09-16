import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export type ColumnType = {
    year: string,
    totalJobs: number,
    averageSalary:number
  }

  export const columns: ColumnDef<ColumnType>[] = [
    {
      accessorKey: "year",
      header: ({ column }) => {
        return (
          <p
           className="flex gap-2  text-yellow-400 font-bold cursor-pointer items-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
          Year
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </p>
        )
      },
    },
    {
      accessorKey: "totalJobs",
      header: ({ column }) => {
        return (
          <p
           className="flex gap-2 text-teal-400 font-bold cursor-pointer items-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
          Total Jobs
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </p>
        )
      },
    },
    {
      accessorKey: "averageSalary",
      header: ({ column }) => {
        return (
          <p
           className="flex gap-2 text-pink-400 font-bold cursor-pointer items-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Average Salary
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </p>
        )
      },
    },
  ]
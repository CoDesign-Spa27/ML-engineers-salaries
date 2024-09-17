import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";  
interface JobData {
  job_title: string;
  count: number;
}

interface JobByYearProps {
  data: JobData[];
}

const ITEMS_PER_PAGE = 5;

export function JobByYear({ data }: JobByYearProps) {
  const [currentPage, setCurrentPage] = useState(1);
 
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
 
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
 
  const currentData = data.slice(startIndex, endIndex);

 
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="rounded-md border p-4">
      <Table>
        <TableHeader>
          <TableRow >
            <TableHead
            className="text-yellow-400"
            >Job Title</TableHead>
            <TableHead
            className="text-green-400"
            >No. of Jobs</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentData.length > 0 ? (
            currentData.map((job, index) => (
              <TableRow key={index}
               
              >
                <TableCell 
               className="py-4"
                >{job.job_title}</TableCell>
                <TableCell
               className="py-4"
                
                >{job.count}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={2} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex justify-center gap-5 items-center mt-4">
        <Button
         variant={"secondary"}
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
        variant={"secondary"}
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default JobByYear;

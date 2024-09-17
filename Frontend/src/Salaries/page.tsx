import { useState, useEffect } from "react";
import { MainTable } from "./MainTable";
import { columns } from "./columns";
import { processSalaryData, ProcessedData, JobsByYear } from "../utils";
import { salaryData } from "@/data";
import JobByYear from "./JobsByYear";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const MainPage = () => {
  const [processedData, setProcessedData] = useState<ProcessedData[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [aggregatedJobs, setAggregatedJobs] = useState<JobsByYear[]>([]);
  const [showPopover, setShowPopover] = useState(false);

  useEffect(() => {
    const data: ProcessedData[] = processSalaryData(salaryData);
    setProcessedData(data);
  }, []);

  const handleRowClick = (year: number) => {
    setSelectedYear(year);
    const aggregatedData = JobsByYear(salaryData, year);
    setAggregatedJobs(aggregatedData);
    setShowPopover(true);
  };

  const popoverAnimation = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative flex flex-col items-center bg-neutral-950 text-gray-100 justify-center w-full h-full py-20">
      <div className="w-full max-w-5xl px-5 relative">
        <p className="text-center uppercase text-2xl sm:text-4xl py-3 px-5 font-black text-neutral-50">
          ML Engineers Salaries and Job Title.
        </p>
        <p className=" capitalize text-md pb-6 text-center ">
          Click on the year to see Job Details
        </p>
        <MainTable
        //@ts-ignore
          columns={columns}
          data={processedData}
          onRowClick={handleRowClick}
        />
        {selectedYear && showPopover && (
          <motion.div
            className="absolute top-0 left-0 right-0 mx-auto bg-neutral-900 text-white p-6 rounded-lg shadow-lg max-w-3xl"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={popoverAnimation}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl uppercase font-black mb-4">
              Job Titles for {selectedYear}
            </h2>
            <JobByYear data={aggregatedJobs} />
            <button
              onClick={() => setShowPopover(false)}
              className="mt-4 py-1 flex items-center gap-2 px-4 bg-pink-500 rounded-lg text-white hover:bg-pink-600"
            >
              Close
              <X className="size-4" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MainPage;
